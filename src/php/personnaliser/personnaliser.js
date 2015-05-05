var portails;
var dir = '../';
var carte;
var session;
var themes;

$(document).ready(function() {
	// On recupère les thèmes puis :
	recupererThemes(function() {
		session = recupererSession();console.log(session);
		var type = $.url('type', 'creer');
		if (type == 'perso') {
			// On tente de recuperer l'idC :
			var idC = $.url('idC');
			if (idC) {
				$('#ajax').html('Chargement de la Carte...' + html_chargement);
				carte = new Carte();
				if (carte.ouvrirCarteServeur(idC)) {
					// On charge les evenements pour que l'utilisateur personnalise la carte :
					carte.afficherEvenements('ajax');
				} else {
					$('#ajax').html('Erreur lors du chargement !');
				}
			} else {
				// On est en mode listeCartes : on recupere la liste des cartes et on l'affiche :
				chargerCartes(type);
			}
		} else { // type == 'creer'
			// On recupère la liste des portails :
			recupererPortails();
		}
	});

	// ajout de fonctions à la page :
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
			url : 'personnaliser/ajax.php?fct=formulaire_portail'
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
		// On crée la carte :
		carte = new Carte(
			portail,
			$('#debut_annee').val(),
			$('#fin_annee').val(),
			$('#titre').val(),
			$('#description').val(),
			$('#duree').val(),
			true
		);
		carte = new Carte();
		var dataCarte = {
			debut_annee : $('#debut_annee').val(),
			fin_annee : $('#fin_annee').val(),
			titre : $('#titre').val(),
			description : $('#description').val(),
			duree : $('#duree').val(),
			echelle_temps_bas : $('#echelle_temps_bas').val(),
			echelle_temps_haut : $('#echelle_temps_haut').val(),
		};
		console.log(dataCarte);
		carte.initialiserCarte(dataCarte);
		if (carte.ajouterCarteServeur(portail)) {

		}
	}
}

function chargerCartes(type) {
	// On recupere les cartes existants :
	$('#ajax').html('Chargement de vos Cartes...' + html_chargement);
	var url = 'script.php?c=list';
	var myData = {idUser: session.idU};
	$.post(url, myData, function(data) {
		var reponse = JSON.p(data, []);
		var HTML = '<ul id="cartes">';
		$.each(reponse, function(i, elm) {
			HTML += '<li><a href="index.php?page=personnaliser&type='+type+'&idC='+elm.id+'">'+elm.titre+'</li>'; // A modifier quand defini
		});
		HTML += '<li id="new"><a href="index.php?type=creer">Nouvelle carte...</a></li>';
		HTML += '</ul>';
		$('#ajax').html(HTML);console.log(HTML);
	});
}