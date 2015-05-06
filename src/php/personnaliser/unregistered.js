var themes;
var dir = '../';
var carte;
var session = false;

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
			$('#form').html(data);
		});
		// Ok c'est fini, on les passe dans la variable globales :
		portails = tps;
		// On affiche le formulaire pour le portail :
		carte = new Carte('ajax');
		carte.afficherFormulaire(true, false);
	});
}