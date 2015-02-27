<<<<<<< HEAD
 
 function boucler_portail_HTML(portail, sens) {
=======
 function boucler_portail_HTML(portail) {
>>>>>>> origin/master
	var startTime = new Date().getTime();
	/***
		Entrée :
			portail = titre du portail dont il faut récuperer les Articles Liés

<<<<<<< HEAD
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
=======
		Sortie : le tableau suivant au format JSON
			{
				a : [{url, titre}] (tableau (url, titre) des articles liés trouvés),
				e : [[{url, sens, http_code}]] (tableau des erreurs gérées rencontrées)
			}
>>>>>>> origin/master
	***/
 	var articles = [];
 	var errors = [];

	// Generation de l'url : (on attaque directement la page "Articles Liés")
<<<<<<< HEAD
	var initialisation = recuperer_portail_HTML(portail);

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
=======
	var retour = recuperer_portail_HTML(portail, 2, '');

 	console.log('Temps d\'execution : ' + (new Date().getTime() - startTime) + ' ms');
 	console.log(retour);
	return JSON.stringify({a:retour.a, e:retour.e});
}

var i=0;

function recuperer_portail_HTML(portail, sens, page) {
>>>>>>> origin/master
	/***
		Entrée :
			portail = titre du portail dont il faut récuperer les Articles Liés
			sens = sens de déplacement (voir ci-dessous, par défaut = 0)
			page : page de la liste des articles où il faut commencer (par défaut = '')

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/master
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
<<<<<<< HEAD
				url : 'http://fr.wikipedia.org' + decodeURIComponent($(this).attr('href').replace(/\+/g, '_')),
=======
				url : 'http://fr.wikipedia.org' + $(this).attr('href'),
>>>>>>> origin/master
				titre : $(this).attr('title')
			});
		});

<<<<<<< HEAD
		// On recupere le lien vers les precedents :
		tps = /pageuntil=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
		if (tps) {prec = '&pageuntil=' + decodeURIComponent(tps[1]).replace(/\+/g, '_');}

		// On recupere le lien vers les suivants :
		tps = /pagefrom=(.*)#mw-pages/.exec($(data.contents).find('#mw-pages').html());
		if (tps) {suiv = '&pagefrom=' + decodeURIComponent(tps[1]).replace(/\+/g, '_');}
 	} else {
 		errors.push({
 			url : url,
=======
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
>>>>>>> origin/master
 			http_code : data.status.http_code
 		});
 	}

<<<<<<< HEAD
 	var retour = {a:articles, e:errors, suiv:suiv, prec:prec};//, t:(new Date().getTime() - startTime)};
=======
 	var retour = {a:articles, e:errors, s:suiv, p:prec};
>>>>>>> origin/master
	return retour;
}

function recuperer_nb_liens_portail_HTML(portail) {
	proxy = 'proxy.php?url=';
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
		tps = /Cette catégorie contient (.*) pages/.exec($(data.contents).find('#mw-pages').html());
		if (tps) {
			return tps[1].replace(/&nbsp;/g, '');
		}
	}
	return -1;
}