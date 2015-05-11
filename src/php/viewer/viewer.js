var cartes;
var carte;
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
			var carteChoisie = cartes[i[1]];
			if (carteChoisie.auteur == 'automatique') {
				// Creation de la carte :
				carte = new Carte('');
				$('#loading').html('Chargement de la carte...'+html_chargement);
				$('#action').removeClass('liste').addClass('loading');
				carte.recupererArticles(carteChoisie);
				carte.filtrerArticles();
				// Articles recuperés : on les convertis :
				carte.conversionArticles();
				// On defini l'échelle :
				carte.definirEchelle();
				// On affiche la carte :
				carte.voirCarte(false);
			} else {
				carte = new Carte('');
				if (carte.ouvrirCarteServeur(carteChoisie.id)) {
					carte.voirCarte(false);
				} else {
					// On affiche la carte :
					$('#ajax').html('Erreur à l\'ouverture de la carte !');
				}
			}
		}

	});
	// Ok la liste est affichée :
	$('#action').removeClass('loading').addClass('liste');
}