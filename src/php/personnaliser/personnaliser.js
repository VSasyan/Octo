
var nb_traite;
var portails;
var errors;
var dir = '../../';

$(document).ready(function() {
	var type = $.url('type', 'creer');
	if (type == 'perso' || type == 'editer') {
		// On tente de recuperer l'idC :
		var idC = $.url('idC');
		if (idC) {
			if (type == 'editer') {
				// On charge les evenements pour que l'utilisateur les edite :
				chargerEvenements();
				editerEvenements();
			} else if (type == 'perso') {
				// On charge les eveneemtns pour que l'utilisateur les personnalise :
				chargerEvenements();
				persoEvenements();
			}
		} else {
			// On est en mode listeCartes : on recupere la liste des cartes et on l'affiche :
			chargerCartes();
			// ajax...
		}
	} else { // type == 'creer'
		// On recupère la liste des portails :
		recupererPortails();
	}
});

function recupererPortails() {
	// On recupere les portails existants :
	$('#ajax').html('Chargement des Portails...' + html_chargement);
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
		$.ajax({
			url : 'ajax.php?fct=formulaire_portail'
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
			url: 'ajax.php?fct=erreur_portail&portail='+encodeURIComponent(nom)
		}).done(function(data) {
			$('#ajax').html(data);
			$('#nom').val(nom);
		});
	} else {
		// On ajoute la carte :
		ajouterCarte(portail);
	}
}

function ajouterCarte(portail) {
	$('#resultat').html('<p>Ajout du portail...</p>');
	var session = recupererSession();
	console.log(session);
	console.log(session.idU);
	console.log(!(typeof(session.idU) === 'undefined'));
	// verification de la session utilisateur :
	if (!(typeof(session.idU) === 'undefined')) {
		// Creation des données à envoyer :
		var json = {
			idU: session.idU,
			idP : portail.id,
			titre : $('#titre').val(),
			description : $('#description').val(),
			debut_annee : $('#debut_annee').val(),
			fin_annee : $('#fin_annee').val(),
			duree : $('#duree').val()
		}
		console.log(JSON.stringify(json));
		// Initialisation de la requete :
		$('#ajax').html(html_chargement);
		var lien = "../script.php?c=add";
		var data = 'json=' + encodeURIComponent(JSON.stringify(json));
		// Requete :
		$.post(lien, data, function(data) {
			var retour = JSON.parse(data);
			if (retour.valide) {
				$('#resultat').html('<p>Carte n°' + retour.idC + ' créée avec succès !</p>');
			}
		});
	} else {
		$('#resultat').html('<p>Utilisateur invalide !</p>');
	}
}

function chargerEvenements() {
	
}

function editerEvenements() {
	
}

function persoEvenements() {
	
}

function chargerCartes() {
	// On recupere les cartes existants :
	$('#ajax').html('Chargement de vos Cartes...' + html_chargement);
	tps = [];
	$.ajax({
		url: '../script.php?c=list'
	}).done(function(data) {
		var o = JSON.p(data, []);
		var HTML = '<ul id="cartes">';
		$.each(o, function(i, elm) {
			HTML += '<li></li>'; // A modifier quand defini
		});
		HTML += '<li id="new"><a href="index.php?type=creer">Nouvelle carte...</a></li>';
		HTML += '</ul>';
		$('#ajax').html(HTML);
	});
}