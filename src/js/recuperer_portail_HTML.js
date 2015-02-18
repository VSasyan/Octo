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
	wiki = 'http://fr.wikipedia.org/wiki/Catégorie:'+portail+'/Articles_liés';
	retour = traiterURL(encodeURIComponent(wiki.replace(/ /g, '_')), 2);
	console.log(retour);

 	console.log('Temps d\'execution : ' + (new Date().getTime() - startTime) + ' ms');
	return JSON.stringify(retour);
}

function traiterURL(wiki, sens) {
	/***
	Recupere les url de la page et des suivantes ou précédentes selon le "sens" :
		- sens == -1 : uniquement prec
		- sens == 0 : aucun
		- sens == 1 : uniquement suiv
		- sens == 2 : dans les deux sens
	***/
	proxy = 'proxy.php?url=';
	remote_url = proxy + wiki + '&full_headers=0&full_status=0';
	// Envoie de la requete AJAX :
	var remote = $.ajax({
		type: 'GET',
		url: remote_url,
		async: false,
	}).responseText;
	data = JSON.parse(remote);
 	articles = [];
 	errors = [];

 	// Recuperation des liens Articles :
 	if (data.status.http_code == 200) {
		$(data.contents).find('#mw-pages table li a').each(function() {
			articles.push({
				url : 'http://fr.wikipedia.org' + $(this).attr('href'),
				titre : $(this).html()
			});
		});

	 	// On relance sur les précédents ?
	 	if (sens == 2 || sens == -1) {
			tps = /(\/w\/index\.php\?title=Cat.*gorie:.*\/Articles_li%C3%A9s&amp;pageuntil=.*#mw-pages)/.exec($(data.contents).find('#mw-pages').html());
			if (tps) {
				prec = 'http://fr.wikipedia.org' + encodeURIComponent(tps[1].replace(/ /g, '_'));
	 			retour = traiterURL(prec, -1);
				articles = articles.concat(retour.a);
				errors = errors.concat(retour.e);
			}
		}

	 	// On relance sur les suivants ?
	 	if (sens == 2 || sens == 1) {
	 		console.log($(data.contents).find('#mw-pages').html());
	 		tps = /(\/w\/index\.php\?title=Cat.*gorie:.*\/Articles_li%C3%A9s&amp;pagefrom=.*#mw-pages)/.exec($(data.contents).find('#mw-pages').html());
	 			console.log(tps);
	 		if (tps) {
	 			suiv = 'http://fr.wikipedia.org' + encodeURIComponent(tps[1].replace(/ /g, '_'));
	 			//suiv = 'http://fr.wikipedia.org/w/index.php?title=Cat%C3%A9gorie:Portail:Premi%C3%A8re_Guerre_mondiale/Articles_li%C3%A9s&pagefrom=284e+r%C3%A9giment+d%27infanterie+territoriale#mw-pages';
	 			retour = traiterURL(suiv, 1);
				articles = articles.concat(retour.a);
				errors = errors.concat(retour.e);
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