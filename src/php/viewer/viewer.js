var cartes;
var dir = '../';
var tm;
var session;

$(document).ready(function() {
	// On récupère la liste des thèmes puis des cartes :
	recupererThemes(function() {recupererCartes();});

	// On ajoute les fonctions :
	$('#animate').click(function () {
		var duration = parseInt($('#duration').val());
		tm.animate(duration);
	});
});

function recupererCartes() {
	$('#action').addClass('loading');
	// On récupère les cartes existantes :
	$('#loading').html('Chargement de la liste des cartes...'+html_chargement);
	tps = [];
	// En 1er les portails (cartes auto)
	$.ajax({
		url: 'script.php?p=list', // Pour le moment les portails...
		async : false
	}).done(function(data) {
		var o = JSON.parse(data);
		$.each(o, function(i, elm) {tps.push({id:elm.id, nom:elm.nom, auteur:'automatique'});});
	});
	// Puis les cartes de l'utilisateur :
	session = recupererSession();
	if (session) {
		var url = 'script.php?c=list';
		var myData = {idUser: session.idU};
		$.ajax({
			type : 'POST',
			url: url,
			data : myData,
			async : false,
			success : function(data) {
				var reponse = JSON.p(data, []);
				$.each(reponse, function(i, elm) {
					tps.push({id:elm.id, nom:elm.titre, auteur:session.login});
				});
			}
		});
	}
	console.log(tps);

	// Ok c'est fini, on les passe dans la variable globale :
	cartes = tps;
	// On affiche la liste :
	$('#liste').html('<h3>Choisissez une carte</h3><ul id="cartes"></ul>');
	$.each(cartes, function(i, carte) {
		$('#cartes').append('<li id="_'+i+'"><span class="nom">'+carte.nom+'</span> <span class="auteur">('+carte.auteur+')</span></li>');
	});
	// Ajout de la fonction de click :
	$('#cartes li').click(function() {
		// On récupère l'id du portail :
		var i = /_([0-9]*)/.exec($(this).attr('id'));
		if (i) {
			var carte = cartes[i[1]];
			if (carte.auteur == 'automatique') {
				$('#loading').html('Chargement de la carte...'+html_chargement);
				$('#action').removeClass('liste').addClass('loading');
				// La carte est une carte auto, on doit récupérer les articles et les transformer :
				var eve = false;
				var url = 'script.php?a=list';
				var data = 'idPortail=' + carte.id;
				$.post(url, data, function(data) {
					var info = JSON.parse(data);
					// On convertit les éléments :
					var eve = conversionArticles(info.tabArticles);
					// On definit l'échelle :
					var echelle = definirEchelle(eve);
					// On affiche la carte :
					afficherCarte(eve, echelle);
				});
			} else {
				// La carte est déjà faite, on récupère les événements :
				var eve = false;
				// On affiche la carte :
				afficherCarte(eve);
			}
		}

	});
	// Ok la liste est affichée :
	$('#action').removeClass('loading').addClass('liste');
}