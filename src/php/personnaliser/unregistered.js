var portails;
var info;
var para;
var themes;
var dir = '../';

$(document).ready(function() {
	// On recupère la liste des themes puis des portails :
	recupererThemes(function() {recupererPortails();});
});

function recupererPortails() {
	// On recupere les portails existants :
	$('#ajax').html('Chargement des Portails...' + html_chargement);
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
		$.ajax({
			url : 'personnaliser/ajax.php?fct=formulaire_portail_unregistered'
		}).done(function (data) {
			// Ajout du formulaire :
			$('#ajax').html(data);
			// Ajout fonction de listage des portails :
			$('#portail').autocomplete({
				source : portails,
				min : 3
			});
			// Ajout de la fonction d'envoi du formulaire :
			$('#verifierPortail').click(function() {verifierPortail()});
		});
	});
}

function verifierPortail() {
	$('#resultat').html('<p>Vérifications en cours...</p>');
	// On vérifie que le portail est dans la liste :
	var portail = false;
	var nom = $('#portail').val();
	$.each(portails, function(i,elm) {if (elm.nom.toLowerCase() == nom.toLowerCase()) {portail = elm;}});
	if (portail === false) {
		// On charge le message d'erreur :
		$('#ajax').html(html_chargement);
		$.ajax({
			url: 'personnaliser/ajax.php?fct=erreur_portail&portail='+encodeURIComponent(nom)
		}).done(function(data) {
			$('#ajax').html(data);
			$('#nom').val(nom);
		});
	} else {
		// On ajoute la carte :
		recupererEvenements(portail);
	}
}

function recupererEvenements(portail) {
	var eve = false;
	var url = 'script.php?a=list';
	var data = 'idPortail=' + portail.id;
	$.post(url, data, function(data) {
		info = JSON.parse(data);
		para = {
			debut_annee : $('#debut_annee').val(),
			fin_annee : $('#fin_annee').val()
		};
		selectionEvenements();
	});
}

function selectionEvenements() {
	// On commence par filtrer selon les para :
	var tps = [];
	$.each(info.tabArticles, function(i, article) {
		if (article.lat != 0 & article.lon != 0 & article.debut_annee != 10000) { // on doit avoir des coordonnées est une date valide
			if (article.debut_annee >= para.debut_annee && article.fin_annee <= para.fin_annee) { // l'article doit parler d'un evenemen entre les deux dates
				// On concerve l'article :
				tps.push(article);
			}
		}
	});
	info.tabArticles = tps;

	// On affiche le formulaire de selection d'evenements :
	var HTML = '';
	HTML += '<p>Décocher les événements à supprimer :</p>';
	HTML += '<div class="table">';
	HTML += '<div class="row title">';
		HTML += '<div class="keep"></div>';
		HTML += '<div class="titre">Titre de l\'évènement</div>';
		HTML += '<div class="dates">Date</div>';
		HTML += '<div class="position">Position</div>';
	HTML += '</div>';
	$.each(info.tabArticles, function(i,article) {
		HTML += '<div class="row">';
			HTML += '<div class="keep"><input type="checkbox" checked="checked" class="checkbox" id="_' + article.id + '"/></div>';
			HTML += '<div class="titre"><a href="' + article.url + '" title="' + article.titre + '">' + truncString(article.titre, 40) + '</a></div>';
			HTML += '<div class="dates">' + dateToStr(article) + '</div>';
			HTML += '<div class="position">(' + Math.round(article.lat) + ',&nbsp;' + Math.round(article.lon) + ')</div>';
		HTML += '</div>';
	});
	HTML += '</div>';
	HTML += '<button id="validerChangements">Valider les changements</button>';
	HTML += '<button id="choixStyles">Choisir les Styles</button>';
	$('#ajax').html(HTML);

	// On agrandit la page :
	$('div#wrap').css({width: "700px"});
	$('article#action').css({width: "700px"});

	// On ajoute les fonctions js :
	$('#validerChangements').click(function() {validerChangements();});
	$('#choixStyles').click(function() {
		// On convertit tous les articles en evènements :
		info.tabEvenements = conversionArticles(info.tabArticles);
		choixStyles();
	});
}

function validerChangements() {
	var tps = [];
	$.each(info.tabArticles, function (i, article) {
		if ($('#_' + article.id).prop('checked')) {
			tps.push(article);
		}
	});
	info.tabArticles = tps;
	// On affiche les évènements restants :
	selectionEvenements();
}

function choixStyles() {
	// Choix des themes :
	var HTML_themes = '';
	HTML_themes += '<select>';
	$.each(themes.themes, function (i, theme) {
		HTML_themes += '<option value="' + theme.nom + '">' + theme.nom + '</option>';
	});
	HTML_themes += '</select>';


	// On affiche le formulaire de selection de styles :
	var HTML = '';
	HTML += '<p>Choississez le thèmes des évènements :</p>';
	HTML += '<div class="table">';
	HTML += '<div class="row title">';
		HTML += '<div class="keep"></div>';
		HTML += '<div class="titre">Titre de l\'évènement</div>';
		//HTML += '<div class="dates">Date</div>';
		HTML += '<div class="position">Position</div>';
		HTML += '<div class="theme">Thème</div>';
	HTML += '</div>';
	$.each(info.tabEvenements, function(i,eve) {
		HTML += '<div class="row" id="_' + eve.options.idp + '">';
			HTML += '<div class="keep"><input type="checkbox" checked="checked" class="checkbox"/></div>';
			HTML += '<div class="titre"><a href="' + eve.options.url + '" title="' + eve.title + '">' + truncString(eve.title, 40) + '</a></div>';
			//HTML += '<div class="dates">' + dateToInput(eve) + '</div>';
			HTML += '<div class="position">(' + Math.round(eve.point.lat) + ',&nbsp;' + Math.round(eve.point.lon) + ')</div>';
			HTML += '<div class="theme">' + HTML_themes + '</div>';
		HTML += '</div>';
	});
	HTML += '</div>';
	HTML += '<button id="validerStyles">Valider les changements</button>';
	HTML += '<button id="razStyles">Annuler les changements</button>';
	HTML += '<button id="voirCarte">Voir la carte</button>';
	$('#ajax').html(HTML);

	// On affiche les thèmes :
	razStyles();

	// On ajoute les fonctions js :
	$('#validerStyles').click(function() {validerStyles();});
	$('#razStyles').click(function() {razStyles();});
	$('#voirCarte').click(function() {voirCarte();});
}

function razStyles() {
	$.each(info.tabEvenements, function (i, eve) {
		$('#_' + eve.options.idp + ' select option[value=' + eve.options.theme + ']').attr('selected', 'selected');
	});
}

function validerStyles() {
	// On met à jour les thèmes :
	$.each(info.tabEvenements, function (i, eve) {
		eve.options.theme = $('#_' + eve.options.idp + ' select option:selected').val();
	});
	//choixStyles();
}

function voirCarte() {
	// On charge la carte :
	$('#wrap').html('Chargement de la Carte...' + html_chargement);
	$.ajax({
		url : 'personnaliser/ajax.php?fct=viewer_unregistered'
	}).done(function (data) {
		// Ajout du formulaire :
		$('#wrap').html(data);
		// On charge les themes :
		chargerThemes(themes.themes);
		// On agrandit la page :
		$('div#wrap').css({width: "100%"});
		$('article#action').css({width: "100%"});
		// On defini l'echelle :
		var echelle = definirEchelle(info.tabEvenements);
		// On affiche la timeline :
		afficherCarte(info.tabEvenements, echelle);
		// On ajoute la fonction d'animation :
		$('#animate').click(function () {
			var duration = parseInt($('#duration').val());
			tm.animate(duration);
		});
		// On scroll jusqu'à la timeline :
		$('html, body').animate({
					scrollTop: $('#timeline').offset().top
		}, 'fast');
	});
	
}

function dateToStr(article) {
	if (article.debut_jour != article.fin_jour || article.debut_mois != article.fin_mois || article.debut_annee != article.fin_annee) {
		return printNonNul(article.debut_jour) + printNonNul(article.debut_mois) + article.debut_annee + '&nbsp;-&nbsp;' + printNonNul(article.fin_jour) + printNonNul(article.fin_mois) + article.fin_annee;
	} else {
		return printNonNul(article.debut_jour) + printNonNul(article.debut_mois) + article.debut_annee;
	}
}

function printNonNul(n) {
	if (n != 0) {return n+'/';} else {return '';}
}