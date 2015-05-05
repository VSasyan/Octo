function recuperer_portail_HTML(portail, page, test_unitaire) {
	/***
		Entrée :
			portail : titre du portail dont il faut récupérer les Articles Liés
			page : page de la liste des articles où il faut commencer (par défaut = '')

		Sortie : PAS au format JSON (PAS en string)
			{
				a : [{url, titre}] (tableau (url, titre) des articles liés trouvés),
				e : [{url, http_code}] (tableau des erreurs gérées rencontrées),
				suiv : 'page' pour la page de la liste suivante si existante,
				prec : 'page' pour la page de la liste précédente si existante
			}
	***/
	var page = page || '';
	var test_unitaire = test_unitaire || false;

	proxy = dir+'js/proxy.php?url=';
	url = 'http://fr.wikipedia.org/w/index.php?title=Catégorie:' + portail.replace(/ /g, '_') + '/Articles_liés' + page;
	if (test_unitaire === false) {
		remote_url = proxy + encodeURIComponent(url) + '&full_headers=0&full_status=0';
	} else {
		remote_url = 'codes_tests_unitaires/index.php?page=' + test_unitaire;
	}
	
	// Envoi de la requete AJAX :
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

 	if (data.status.http_code == 200) {
 		// Récupération des liens Articles :
		var regLiens = new RegExp('href="([^"]*)" title="([^"]*)"', 'g');
		var html = $(data.contents).find('#mw-pages .mw-category').html();
		var liens = html.match(regLiens);

 		for (i = 0; i < liens.length; i++) {
 			var tps = /href="([^"]*)" title="([^"]*)"/.exec(liens[i]);
 			if (tps) {
 				articles.push({
 					url : tps[1],
 					titre : tps[2]
 				});
 			}
 		}

		// On récupère le lien vers les précédents :
		tps = /pageuntil=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
		if (tps) {prec = '&pageuntil=' + decodeURIComponent(tps[1]).replace(/\+/g, '_');}

		// On récupère le lien vers les suivants :
		tps = /pagefrom=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
		if (tps) {suiv = '&pagefrom=' + decodeURIComponent(tps[1]).replace(/\+/g, '_');}
 	} else {
 		errors.push({
 			url : url,
 			http_code : data.status.http_code
 		});
 	}

 	var retour = {a:articles, e:errors, suiv:suiv, prec:prec};
	return retour;
}

function recuperer_nb_liens_portail_HTML(portail) {
	proxy = dir+'js/proxy.php?url=';
	url = 'http://fr.wikipedia.org/w/index.php?title=Catégorie:' + portail + '/Articles_liés';
	remote_url = proxy + encodeURIComponent(url) + '&full_headers=0&full_status=0';
	
	// Envoi de la requête AJAX :
	var remote = $.ajax({
		type: 'GET',
		url: remote_url,
		async: false,
	}).responseText;
	var data = JSON.parse(remote);

	if (data.status.http_code == 200) {
		tps = /Cette catégorie contient[ les]* (.*) pages/.exec($(data.contents).find('#mw-pages').html());
		if (tps) {
			return tps[1].replace(/&nbsp;/g, '');
		}
	}
	return -1;
}