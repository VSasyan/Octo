function boucler_portail_HTML(portail, sens) {
	var startTime = new Date().getTime();
	/***
		Entrée :
			portail = titre du portail dont il faut récuperer les Articles Liés

		Sortie : PAS au format JSON (PAS en string)
			{
				a : [{url, titre}] (tableau (url, titre) des articles liés trouvés),
				nb_a : nombre de liens d'articles récupérés
				nb_t : nombre total de liens d'articles présents d'après wikipedia
				e : [{url, http_code}] (tableau des erreurs gérées rencontrées),
				t : temps nécessaire en secondes // En fait non car trop compliqué pour les TU
			}

		Recupere les url de la page et des suivantes ou précédentes selon le "sens" :
			- sens == -1 : uniquement prec
			- sens == 0 : aucun
			- sens == 1 : uniquement suiv
			- sens == 2 : dans les deux sens
	***/
 	var portail = portail.replace(/ /g, '_');

	// Generation de l'url : (on attaque directement la page "Articles Liés")
	var initialisation = recuperer_portail_HTML(portail);
	var articles =initialisation.a;
	var errors = initialisation.e;

	// On relance sur les précédents ?
	if ((sens == 2 || sens == -1) & initialisation.prec != '') {
		var prec = initialisation.prec;
		while (prec != '') {
			var tps = recuperer_portail_HTML(portail, prec);
			var articles = $.merge(articles, tps.a);
			var errors = $.merge(errors, tps.e);
			prec = tps.prec;
		}
	}

	// On relance sur les suivants ?
	if ((sens == 2 || sens == 1) & initialisation.suiv != '') {
		var suiv = initialisation.suiv;
		while (suiv != '') {
			var tps = recuperer_portail_HTML(portail, suiv);
			var articles = $.merge(articles, tps.a);
			var errors = $.merge(errors, tps.e);
			suiv = tps.suiv;
		}
	}

	// Recuperation du nombre total d'articles :
	nb_total = recuperer_nb_liens_portail_HTML(portail);

	var retour = {
		a : articles,
		nb_a : articles.length,
		nb_t : nb_total,
		e : errors,
		//t : (new Date().getTime() - startTime)/1000
	};

	return retour;
}

function recuperer_portail_HTML(portail, page) {
	/***
		Entrée :
			portail = titre du portail dont il faut récuperer les Articles Liés
			sens = sens de déplacement (voir ci-dessous, par défaut = 0)
			page : page de la liste des articles où il faut commencer (par défaut = '')

		Sortie : PAS au format JSON (PAS en string)
			{
				a : [{url, titre}] (tableau (url, titre) des articles liés trouvés),
				e : [{url, http_code}] (tableau des erreurs gérées rencontrées),
				suiv : 'page' pour la page de la liste suivante si existante,
				prec : 'page' pour la page de la liste précédente si existante,
				t : temps nécessaire en ms // En fait non car trop compliqué pour les TU
			}
	***/
	var startTime = new Date().getTime();
	page = page || '';

	proxy = dir+'js/proxy.php?url=';
	url = 'http://fr.wikipedia.org/w/index.php?title=Catégorie:' + portail.replace(/ /g, '_') + '/Articles_liés' + page;
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

 	if (data.status.http_code == 200) {
 		// Recuperation des liens Articles :
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

		// On recupere le lien vers les precedents :
		tps = /pageuntil=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
		if (tps) {prec = '&pageuntil=' + decodeURIComponent(tps[1]).replace(/\+/g, '_');}

		// On recupere le lien vers les suivants :
		tps = /pagefrom=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
		if (tps) {suiv = '&pagefrom=' + decodeURIComponent(tps[1]).replace(/\+/g, '_');}
 	} else {
 		errors.push({
 			url : url,
 			http_code : data.status.http_code
 		});
 	}

 	var retour = {a:articles, e:errors, suiv:suiv, prec:prec};//, t:(new Date().getTime() - startTime)};
	return retour;
}

function recuperer_nb_liens_portail_HTML(portail) {
	proxy = dir+'js/proxy.php?url=';
	url = 'http://fr.wikipedia.org/w/index.php?title=Catégorie:' + portail + '/Articles_liés';
	remote_url = proxy + encodeURIComponent(url) + '&full_headers=0&full_status=0';
	
	// Envoie de la requete AJAX :
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