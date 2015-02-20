 function boucler_portail_HTML(portail) {
	var startTime = new Date().getTime();
	/***
		Entrée :
			portail = titre du portail dont il faut récuperer les Articles Liés

		Sortie : le tableau suivant au format JSON
			{
				a : [{url, titre}] (tableau (url, titre) des articles liés trouvés),
				e : [[{url, sens, http_code}]] (tableau des erreurs gérées rencontrées)
			}
	***/

	// Generation de l'url : (on attaque directement la page "Articles Liés")
	var retour = recuperer_portail_HTML(portail, 2, '');

 	console.log('Temps d\'execution : ' + (new Date().getTime() - startTime) + ' ms');
 	console.log(retour);
	return JSON.stringify({a:retour.a, e:retour.e});
}

var i=0;

function recuperer_portail_HTML(portail, sens, page) {
	/***
		Entrée :
			portail = titre du portail dont il faut récuperer les Articles Liés
			sens = sens de déplacement (voir ci-dessous, par défaut = 0)
			page : page de la liste des articles où il faut commencer (par défaut = '')

		Sortie :
			{
				a : [{url, titre}] (tableau (url, titre) des articles liés trouvés),
				e : [[{url, sens, http_code}]] (tableau des erreurs gérées rencontrées),
				suiv : 'page' pour la page de la liste suivante si existante
				prec : 'page' pour la page de la liste précédente si existante
			}

		Recupere les url de la page et des suivantes ou précédentes selon le "sens" :
			- sens == -1 : uniquement prec
			- sens == 0 : aucun
			- sens == 1 : uniquement suiv
			- sens == 2 : dans les deux sens
	***/
	sens = sens || 0;
	page = page || '';

	proxy = 'proxy.php?url=';
	url = 'http://fr.wikipedia.org/w/index.php?title=Catégorie:' + portail + '/Articles_liés' + page;
	remote_url = proxy + encodeURIComponent(url) + '&full_headers=0&full_status=0';
	
	// Envoie de la requete AJAX :
	var remote = $.ajax({
		type: 'GET',
		url: remote_url,
		async: false,
	}).responseText;
	var data = JSON.parse(remote);
 	var articles = [];
 	var errors = [];
 	var suiv = '';
 	var prec = '';

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
				prec = '&pageuntil=' + decodeURIComponent(tps[1].replace(/\+/g, '_'));
	 			var retour = recuperer_portail_HTML(portail, -1, prec);
				var articles = $.merge(articles, retour.a);
				var errors = $.merge(errors, retour.e);
			}
		}

	 	// On relance sur les suivants ?
	 	if (sens == 2 || sens == 1) {
	 		tps = /pagefrom=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
	 		if (tps) {
				suiv = '&pagefrom=' + decodeURIComponent(tps[1].replace(/\+/g, '_'));
	 			var retour = recuperer_portail_HTML(portail, 1, suiv);
				var articles = $.merge(articles, retour.a);
				var errors = $.merge(errors, retour.e);
	 		}
	 	}
 	} else {
 		errors.push({
 			url : url,
 			sens : sens,
 			http_code : data.status.http_code
 		});
 	}

 	var retour = {a:articles, e:errors, s:suiv, p:prec};
	return retour;
}