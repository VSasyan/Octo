var nb_traite;
var portails;
var errors;
var dir = '../';

$(document).ready(function() {
	// On recupère la liste des portails :
	recupererPortails();

	$('#verifierPortail').click(function() {verifierPortail()});
});

function verifierPortail() {
	// On vérifie que le portail est dans la liste :
	var portail = false;
	var nom = $('#portail').val();
	$.each(portails, function(i,elm) {if (elm.nom.toLowerCase() == nom.toLowerCase()) {portail = elm;}});
	if (portail === false) {
		// On charge la création d'un nouveau portail :
		$('#ajax').html(html_chargement);
		$.ajax({
			url: 'edit/ajax.php?fct=ajouter_portail'
		}).done(function(data) {
			$('#ajax').html(data);
			$('#nom').val(nom);
			$('#ajouterPortail').click(ajouterPortail);
		});
	} else {
		// On charge l'edition de portail :
		$('#ajax').html(html_chargement);
		$.ajax({
			url: 'edit/ajax.php?fct=editer_portail'
		}).done(function(data) {
			$('#ajax').html(data);
			$('#nom').html(portail.nom);
			$('#url').html(portail.lien);
			$('#majArticlesPortail').click(function() {majArticlesPortail(portail);});
			$('#supprimerPortail').click(function() {supprimerPortail(portail);});
		});
	}
}

function ajouterPortail() {
	$('#resultat').html('<p>Vérification du portail...</p>' + html_chargement);
	var lien = "script.php?p=add";
	var nom = $('#nom').val();
	var url = $('#url').val();
	// Si adresse non précisée on récupère le tire :
	if (url == '') {url = 'http://fr.wikipedia.org/wiki/' + encodeURIComponent(nom.replace(/ /g, '_'));}
	var url_verif = dir + 'js/proxy.php?url=' + encodeURIComponent(url.replace(/ /g, '_')) + '&full_headers=0&full_status=0';
	// On vérifie que le portail est correct :
	$.ajax({
		url : url_verif,
		type: 'GET',
	}).done(function (data) {
		if (data.status.http_code == 200) {
			// La page existe : on ajoute :
			var titre = /<title>(.*) — Wikipédia<\/title>/.exec(data.contents);
			if (titre) {
				// On recuperer le titre officiel
				var nom = titre[1];
				var url = 'http://fr.wikipedia.org/wiki/' + encodeURIComponent(nom.replace(/ /g, '_'));
				// On ajoute le portail :
				$('#resultat').html('<p>Le portail existe. Ajout du portail...</p>' + html_chargement);
				var data = 'nom='+encodeURIComponent(nom)+'&url='+encodeURIComponent(url);
				// Requete :
				$.post(lien, data, function(data) {
					$('#resultat').html('Portail ajouté avec succès !');
					recupererPortails();
				});
			} else {
				$('#resultat').html('erreur lors de l\'ajout du portail...');
			}
		} else {
			// Page non trouvée : on ajoute pas !
			$('#resultat').html('portail non trouvé !');
		}
	});
}

function majArticlesPortail(portail) {
	var startTime = new Date().getTime();
	/***
		Entrée :
			portail = {
				id : id du portail,
				nom : nom du portail,
				url : url du portail
			}
	***/

	// Recuperation des url :
	$('#resultat').html('<p id="recup_urls">Recherche des URL...</p>');
 	var nomPortail = portail.nom.replace(/ /g, '_');
	// Nombre de liens :
	nb_articles = recuperer_nb_liens_portail_HTML(nomPortail);
	$('#recup_urls').append(' <span id="recup">0</span>/' + nb_articles + ' URL vers des articles récupérés...');

	// On est parti pour boucler : Initialisation
	var initialisation = recuperer_portail_HTML(nomPortail);
	var articles = initialisation.a;
	var errors = initialisation.e;
	$('#recup').html(articles.length);

	// On relance sur les précédents !
	var prec = initialisation.prec;
	while (prec != '') {
		var tps = recuperer_portail_HTML(nomPortail, prec);
		var articles = $.merge(articles, tps.a);
		var errors = $.merge(errors, tps.e);
		$('#recup').html(articles.length);
		prec = tps.prec;
	}

	// On relance sur les suivants !
	var suiv = initialisation.suiv;
	while (suiv != '') {
		var tps = recuperer_portail_HTML(nomPortail, suiv);
		var articles = $.merge(articles, tps.a);
		var errors = $.merge(errors, tps.e);
		$('#recup').html(articles.length);
		suiv = tps.suiv;
	}

	portail['articles'] = {
		a : articles,
		nb_a : articles.length,
		nb_t : nb_articles,
		e : errors
	};

	// Bouclage :
	//portail['articles'] = boucler_portail_HTML(portail.nom, 2);
	var tps_urls = Math.trunc(((new Date().getTime()) - startTime)/1000);
	$('#recup_urls').html('Recherche des URL terminée. ' + portail.articles.nb_a + '/' + nb_articles + ' URL récupérées. (effectué en ' + tps_urls + ' s)');
	$('#nb_articles').remove();

	// Recuperation et envoie des articles 50 par 50 :
	$('#resultat').append('<p id="recup_articles">Récupération des articles... <span id="articles">0</span>/' + portail.articles.nb_a + ' articles récupérés.</p>');
	var nb_max = 50; // 500 pour les robots
	var nb_traite = 0;
	for (i=0; i<portail.articles.nb_a; i+=nb_max) {
		var titres = [];
		for (var j=0; (j<nb_max) & (j+i < portail.articles.nb_a); j++) {
			// On ajoute le titre :
			titres.push(portail.articles.a[i+j].titre);
		}
		// On recupère les info :
		var info_article = recuperer_article_JSON(titres, 1, portail.id);
		// On envoie au serveur :
		var url = 'script.php?a=add';
		var data = "json=" + JSON.stringify(info_article);
		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			success: function (retour) {
				var retour = JSON.parse(retour);
				if (retour.valide === true) {
					nb_traite += j;
					$('#articles').html(nb_traite);
				} else {
					// Erreur !
					console.log("Erreur avec les articles suivants : " + info_article);
				}
			},
			async:false
		});
	}

	var tps = Math.trunc(((new Date().getTime()) - startTime)/1000);
	$('#recup_articles').append(' (effectué en ' +(tps - tps_urls) + ' s)');

	// Fini !
	$('#resultat').append('<p id="recup_finie">Récupération terminée ! (effectué en ' + tps + ' s)</p>');
}

function recupererPortails() {
	// On recupere les portails existants :
	$('#loading').html('Chargement de la liste des portails...'+html_chargement);
	tps = [];
	$.ajax({
		url: 'script.php?p=list'
	}).done(function(data) {
		var o = JSON.parse(data);
		$.each(o, function(i, elm) {
			tps.push({id:elm.id, nom:elm.nom, value:elm.nom, lien:elm.lien});
			// La l'utilisateur peut ajouter valider son portail :
			$('#form').html(data);
		});
		// Ok c'est fini, on les passe dans la variable globales :
		portails = tps;
		// On affiche le formulaire pour le portail :
		$('#action').removeClass('loading');
		// Ajout fonction de listage des portails :
		$('#portail').autocomplete({
			source : portails,
			min : 3
		});	
		if ($('#portail').val() != '') {verifierPortail();}
	});
}