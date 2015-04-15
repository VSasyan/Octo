var portails;
var dir = '../';

$(document).ready(function() {
	// On recupère la liste des portails :
	recupererPortails();
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
		})
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
		var info = JSON.parse(data);
		console.log(info);
	});
}