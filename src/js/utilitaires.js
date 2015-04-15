var html_chargement = '<div class="center"><img src="../image/load.gif" alt="Chargement en cours..." title="Chargement en cours..."/></div>';

function getMediane(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2) {return values[half];}
    else {return (values[half-1] + values[half]) / 2.0;}
}

Array.prototype.shuffle = function () {
	return this[Math.floor(Math.random() * this.length)]
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function RandR(min, max) {
	return Math.random() * (max - min) + min;
}

function recupererSession() {
	// On demande à getSession.php les paramètres de session
	var data = $.ajax({
		url : '../authentification/getSession.php',
		async : false
	}).responseText;

	var session = JSON.p(data, {});
	return session;
}

function truncString(str, n) {
	if (str.length > n) {
		return str.substr(0,n-3) + '...';
	} else {return str;}
}

function chargerThemes(themes) {
	TimeMap.themes = {};
	$.each(themes, function(i, theme) {
		TimeMap.themes[theme.nom] = {
			icon: theme.icon,
			eventIconImage: theme.eventIconImage,
			iconSize: theme.iconSize,
			color: theme.color
		};
	});
}

function recupererThemes(fct) {
	var fct = fct || function() {};
	// On recupere les themes disponibles :
	$('#ajax').html('Chargement des Thèmes...' + html_chargement);
	tps = [];
	$.ajax({
		url: 'viewer/themes.php'
	}).done(function(data) {
		themes = JSON.parse(data);
	});
	// On execute la fonction passée en para :
	fct();
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

	// On charge les themes :
	chargerThemes(themes.themes);

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
	
	// On scroll jusqu'à la timeline :
	$('html, body').animate({
				scrollTop: $('#timeline').offset().top
	}, 'fast');
}

function adapterHauteur() {
	var taille = $(window).height() - $('#anim').height() - $('#timelinecontainer').height();
	$('#mapcontainer').height(taille + 'px');
}

// parser JSON fiable :
JSON.p = function (str, def) {
	try {
		var jsonObject = JSON.parse(str);
	} catch(e) {
		var jsonObject = def;
	}
	return jsonObject;
}

// Fonctions $.OO :
$.url = function(name, def){
	var def = def || null;
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {return results[1];} else {return def;}
}