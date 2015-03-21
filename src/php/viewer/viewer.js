var cartes;
var dir = '../../';
var tm;

$(document).ready(function() {
	// On recupère la liste des portails :
	recupererCartes();

	// On ajoute les fonctions :
	$('#animate').click(function () {
		var duration = parseInt($('#duration').val());
		console.log(duration);
		tm.animate(duration);
	});
});

function afficherCarte(eve) {
	// On passe en mode carte :
	$('#action').removeClass('loading').addClass('tm');

	// On lance la time map :
	tm = TimeMap.init({
		mapId: "map",			   // Id of map div element (required)
		timelineId: "timeline",	 // Id of timeline div element (required) 
		options: {
			eventIconPath: "../../js/images/"
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
			   intervalUnit:   Timeline.DateTime.DECADE, 
			   intervalPixels: 210
			},
			{
			   width:		  "15%", 
			   intervalUnit:   Timeline.DateTime.CENTURY, 
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
		url: '../script.php?p=list' // Pour le moment les portails...
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
					var url = '../script.php?a=list';
					var data = 'idPortail=' + carte.id;
					$.post(url, data, function(data) {
						var info = JSON.parse(data);
						// On converti les elements :
						var eve = convertionArticles(info.tabArticles);
						// On affiche la carte :
						afficherCarte(eve);
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