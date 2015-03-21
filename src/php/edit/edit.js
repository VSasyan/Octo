var nb_traite;
var portails;
var errors;
var dir = '../../';

$(document).ready(function() {
	// On recupère la liste des portails :
	recupererPortails();

	$('#verifierPortail').click(function() {verifierPortail()});
});

function verifierPortail() {
	// On vérifie que le portail est dans la liste :
	var portail = false;
	var nom = $('#portail').val();
	$.each(portails, function(i,elm) {if (elm.nom == nom) {portail = elm;}});
	if (portail === false) {
		// On charge la création d'un nouveau portail :
		$('#ajax').html(html_chargement);
		$.ajax({
			url: 'ajax.php?fct=ajouter_portail'
		}).done(function(data) {
			$('#ajax').html(data);
			$('#nom').val(nom);
			$('#ajouterPortail').click(ajouterPortail);
		});
	} else {
		// On charge l'edition de portail :
		$('#ajax').html(html_chargement);
		$.ajax({
			url: 'ajax.php?fct=editer_portail'
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
	var lien = "../script.php?p=add";
	var nom = $('#nom').val();
	var url = $('#url').val();
	// Si adresse non précisée on récupère le tire :
	if (url == '') {url = 'http://fr.wikipedia.org/wiki/' + encodeURIComponent(nom.replace(/ /g, '_'));}
	var url_verif = '../../js/proxy.php?url=' + encodeURIComponent(url.replace(/ /g, '_')) + '&full_headers=0&full_status=0';
	// On vérifie que le portail est correct :
	$.ajax({
		url : url_verif,
		type: 'GET',
	}).done(function (data) {
		if (data.status.http_code == 200) {
			// La page existe : on ajoute :
			$('#resultat').html('<p>Le portail existe. Ajout du portail...</p>' + html_chargement);
			var data = 'nom='+encodeURIComponent(nom)+'&url='+encodeURIComponent(url);
			// Requete :
			$.post(lien, data, function(data) {
				$('#resultat').html('Portail ajouté avec succès !');
				recupererPortails();
			});
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
	$('#resultat').append('<p id="recup_urls">Recherche des URL...</p>');
	portail['articles'] = boucler_portail_HTML(portail.nom, 2);
	$('#recup_urls').html('Recherche des URL terminée. '+portail.articles.nb_a+' URL trouvées.');


	$('#resultat').append('<p id="recup_articles">Récupération des articles...</p>');
	// Recuperation et envoie des articles 50 par 50 :
	var nb_max = 50; // 500 pour les robots
	var nb_traite = 0;
	console.log(portail.articles);
	for (i=0; i<portail.articles.nb_a; i+=nb_max) {
		var titres = [];
		for (var j=0; (j<nb_max) & (j+i < portail.articles.nb_a); j++) {
			// On ajoute le titre :
			titres.push(portail.articles.a[i+j].titre);
		}
		// On recupère les info :
		var info_article = recuperer_article_JSON(titres, 1, portail.id);
		// On envoie au serveur :
		var url = '../script.php?a=add';
		var data = "json=" + JSON.stringify(info_article);
		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			success: function (data) {
				nb_traite += j;
				$('#recup_articles').html(nb_traite+' articles récupérés sur '+portail.articles.nb_a);
			},
			async:false
		});
	}

	// Fini !
	$('#resultat').append('<p id="recup_finie">Récupération terminée !</p>');
}

function recupererPortails() {
	// On recupere les portails existants :
	$('#loading').html('Chargement de la liste des portails...'+html_chargement);
	tps = [];
	$.ajax({
		url: '../script.php?p=list'
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