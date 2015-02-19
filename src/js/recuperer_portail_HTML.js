 function recuperer_portail_HTML(portail) {
	var startTime = new Date().getTime(); 
	/***
		Entrée :
			titres = tableau des pages à récupérer
			distanceOrigine = distance entre le portail/la page d'origne et cette page
			portail_id : Id du portail/de la page d'origine
		Sortie :
			sortie = string JSON à envoyer au serveur php soit :
				un tableau de type {{id, titre, nb_long, nb_visites, longueur, lien, data_evenement, long, lat}, portail_id};
	***/

	// Generation de l'url : (on attaque directement la page "Articles Liés")
	var wiki = 'http://fr.wikipedia.org/wiki/Catégorie:'+portail+'/Articles_liés';
	var retour = traiterURL(portail, wiki, 2);

 	console.log('Temps d\'execution : ' + (new Date().getTime() - startTime) + ' ms');
 	console.log(retour);
	return JSON.stringify(retour);
}

var i=0;

function traiterURL(portail, wiki, sens) {
	/***
	Recupere les url de la page et des suivantes ou précédentes selon le "sens" :
		- sens == -1 : uniquement prec
		- sens == 0 : aucun
		- sens == 1 : uniquement suiv
		- sens == 2 : dans les deux sens
	***/
	proxy = 'proxy.php?url=';
	remote_url = proxy + encodeURIComponent(wiki.replace(/ /g, '_')) + '&full_headers=0&full_status=0';
	// Envoie de la requete AJAX :
	var remote = $.ajax({
		type: 'GET',
		url: remote_url,
		async: false,
	}).responseText;
	var data = JSON.parse(remote);
 	var articles = [];
 	var errors = [];

 	// Recuperation des liens Articles :
 	if (data.status.http_code == 200) {
		$(data.contents).find('#mw-pages li a').each(function() {
			articles.push({
				url : 'http://fr.wikipedia.org' + $(this).attr('href'),
				titre : $(this).attr('title')
			});
		});

	 	// On relance sur les précédents ?
	 	if (sens == 2 || sens == -1) {
			tps = /pageuntil=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
			if (tps) {
				var prec = 'http://fr.wikipedia.org/w/index.php?title=Catégorie:' + portail + '/Articles_liés&pageuntil=' + decodeURIComponent(tps[1].replace(/\+/g, '_'));
	 			var retour = traiterURL(portail, prec, -1);
				var articles = $.merge(articles, retour.a);
				var errors = $.merge(errors, retour.e);
			}
		}

	 	// On relance sur les suivants ?
	 	if (sens == 2 || sens == 1) {
	 		tps = /pagefrom=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
	 		if (tps) {
				var suiv = 'http://fr.wikipedia.org/w/index.php?title=Catégorie:' + portail + '/Articles_liés&pagefrom=' + decodeURIComponent(tps[1].replace(/\+/g, '_'));
	 			var retour = traiterURL(portail, suiv, 1);
				var articles = $.merge(articles, retour.a);
				var errors = $.merge(errors, retour.e);
	 		}
	 	}
 	} else {
 		errors.push({
 			url : wiki,
 			sens : sens,
 			http_code : data.status.http_code
 		});
 	}

 	var retour = {a:articles, e:errors};
	return retour;
}