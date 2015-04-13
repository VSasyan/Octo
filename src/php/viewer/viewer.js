var cartes;
var dir = '../';
var tm;

$(document).ready(function() {
	// On recupère la liste des portails :
	recupererCartes();

	// On ajoute les fonctions :
	$('#animate').click(function () {
		var duration = parseInt($('#duration').val());
		tm.animate(duration);
	});
});

function afficherCarte(eve, echelle) {
	// On passe en mode carte :
	$('#action').removeClass('loading').addClass('tm');

	// On change la hauteur de la carte pour l'adapter à l'ecran :
	adapterHauteur();
	$(window).resize(function () {adapterHauteur();});

	// On met à jour les sources :
	var HTML = '';
	HTML += '<p>Les données utilisées proviennes de Wikipédia. ';
	HTML += 'Elles ne sont pas modifiées par Cicérow et sont réutilisables sous ';
	HTML += '<a href="http://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Citation_et_r%C3%A9utilisation_du_contenu_de_Wikip%C3%A9dia">Licence Creative Attribution (CC BY-SA 3.0)</a>.</p>';
	HTML += '<p>Voici la liste des articles utilisés ('+eve.length+' articles) :</p>';
	HTML += '<ul>';
	$.each(eve, function(i,ev) {
		HTML += '<li><a href="'+ev.options.url+'">'+ev.title+'</a></li>';
	});
	HTML += '';
	HTML += '</ul>';
	$('#htmlSource').html(HTML);

	// On lance la time map :
	tm = TimeMap.init({
		mapId: "map",			   // Id of map div element (required)
		timelineId: "timeline",	 // Id of timeline div element (required) 
		options: {
			eventIconPath: "../js/images/"
		},
		datasets: [
			{
				id: "cicerow",
				title: "JSON",
				type: "basic",
				options: {
					//items: evenements
					items: eve
				}
			}
		],
		bandInfo: [
			{
			   width:		  "85%", 
			   intervalUnit:   echelle.haut, 
			   intervalPixels: 210
			},
			{
			   width:		  "15%", 
			   intervalUnit:   echelle.bas, 
			   intervalPixels: 150,
			   showEventText:  false,
			   trackHeight:	0.2,
			   trackGap:	   0.2
			}
		]
	});
}

function recupererCartes() {
	$('#action').addClass('loading');
	// On recupere les cartes existantes :
	$('#loading').html('Chargement de la liste des cartes...'+html_chargement);
	tps = [];
	$.ajax({
		url: 'script.php?p=list' // Pour le moment les portails...
	}).done(function(data) {
		var o = JSON.parse(data);
		$.each(o, function(i, elm) {tps.push({id:elm.id, nom:elm.nom, auteur:'system'});});
		// Ok c'est fini, on les passe dans la variable globales :
		cartes = tps;
		// On affiche la liste :
		$('#liste').html('<h2>Liste des cartes :</h2><ul id="cartes"></ul>');
		$.each(cartes, function(i, carte) {
			$('#cartes').append('<li id="_'+i+'"><span class="nom">'+carte.nom+'</span> <span class="auteur">('+carte.auteur+')</span></li>');
		});
		// Ajout de la fonction de click :
		$('#cartes li').click(function() {
			// On recuperer l'id du portail :
			var i = /_([0-9]*)/.exec($(this).attr('id'));
			if (i) {
				var carte = cartes[i[1]];
				if (carte.auteur == 'system') {
					$('#loading').html('Chargement de la carte...'+html_chargement);
					$('#action').removeClass('liste').addClass('loading');
					// La carte est une carte auto, on doit recuperer les articles et les transformer :
					var eve = false;
					var url = 'script.php?a=list';
					var data = 'idPortail=' + carte.id;
					$.post(url, data, function(data) {
						var info = JSON.parse(data);
						// On converti les elements :
						var eve = conversionArticles(info.tabArticles);
						// On defini l'echelle :
						var echelle = definirEchelle(eve);
						// On affiche la carte :
						afficherCarte(eve, echelle);
					});
				} else {
					// La carte est deja faites, on récupère les evènements :
					var eve = false;
					// On affiche la carte :
					afficherCarte(eve);
				}
			}

		});
		// Ok la liste est affichée :
		$('#action').removeClass('loading').addClass('liste');
	});
}

function definirEchelle(eve) {
	// On recupere les dates :
	var debut = new Date();
	Timeline.DateTime.setIso8601Date(debut,'9999-01-01');
	// On recupere les dates :
	var fin = new Date();
	Timeline.DateTime.setIso8601Date(debut,'-9999-01-01');
	// On test tout :
	$.each(eve, function (i, ev) {
		var tps = new Date();
		Timeline.DateTime.setIso8601Date(tps, ev.start);
		if (debut > tps) {debut = tps;}
		var tps = new Date();
		Timeline.DateTime.setIso8601Date(tps, ev.end);
		if (fin < tps) {fin = tps;}
	});

	var tps = (fin - debut) / 1000; // duree en secondes

	/*
		Timeline.DateTime.MILLISECOND    = 0;
		Timeline.DateTime.SECOND         = 1;
		Timeline.DateTime.MINUTE         = 2;
		Timeline.DateTime.HOUR           = 3;
		Timeline.DateTime.DAY            = 4;
		Timeline.DateTime.WEEK           = 5;
		Timeline.DateTime.MONTH          = 6;
		Timeline.DateTime.YEAR           = 7;
		Timeline.DateTime.DECADE         = 8;
		Timeline.DateTime.CENTURY        = 9;
		Timeline.DateTime.MILLENNIUM     = 10;
	*/

	if (tps / (86400 * 365.25) > 1000) {
		// Plus long qu'un millénaire : siècles :
		bas = 8; // normalement 9, mais bug alors en attendant...
	} else if (tps / (86400 * 365.25) > 100) {
		// Plus long qu'un siècle : decade :
		bas = 8;
	} else if (tps / (86400 * 365.25) > 10) {
		// Plus long que 10 ans : année :
		bas = 7;
	} else if (tps / (86400 * 365.25) > 1) {
		// Plus long que 1 an : mois :
		bas = 6;
	} else {
		// Plus long que 1 mois : semaines :
		bas = 5;
	}

	var echelle = {
		haut : bas-1,
		bas : bas
	}

	return echelle;
}

function adapterHauteur() {
	var taille = $(window).height() - $('#anim').height() - $('#timelinecontainer').height();
	$('#mapcontainer').height(taille + 'px');
}