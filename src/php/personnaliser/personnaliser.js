var portails;
var dir = '../';
var carte;
var session;
var themes;

$(document).ready(function() {
	// On recupère les thèmes puis :
	recupererThemes(function() {
		session = recupererSession();
		var type = $.url('type', 'creer');
		if (type == 'perso') {
			// On tente de recuperer l'idC :
			var idC = $.url('idC');
			if (idC) {
				$('#ajax').html('Chargement de la Carte...' + html_chargement);
				carte = new Carte('ajax');
				if (carte.ouvrirCarteServeur(idC)) {
					// On charge les evenements pour que l'utilisateur personnalise la carte :
					carte.afficherEvenements();
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
		carte = new Carte('ajax');
		carte.afficherFormulaire(true, true);
	});
}

/**
	Charge les cartes déjà crées par l'utilisateur
	Entrée : type : type des modifications à effectuer sur la carte (déprécié, = 'perso')
	Sortie : null
**/
function chargerCartes(type) {
	// On recupere les cartes existants :
	$('#ajax').html('Chargement de vos Cartes...' + html_chargement);
	var url = 'script.php?c=list';
	var myData = {idUser: session.idU};
	$.post(url, myData, function(data) {
		var reponse = JSON.p(data, []);
		var HTML = '<ul id="cartes">';
		$.each(reponse, function(i, elm) {
			HTML += '<li><a href="index.php?page=personnaliser&type='+type+'&idC='+elm.id+'">'+elm.titre+'</a><span class="deleteCarte" data-idc="'+elm.id+'" title="Supprimer la carte"><i class="fa fa-times"></i></span></li>'; // A modifier quand defini
		});
		HTML += '<li id="new"><a href="index.php?page=personnaliser&type=creer">Nouvelle carte...</a></li>';
		HTML += '</ul>';
		$('#ajax').html(HTML);

		// Ajout de la fonction de suppression de la carte :
		$('span.deleteCarte').click(function() {
			var reponse = {valide:false, message:'Retour invalide !'};
			$.ajax({
				type : 'POST',
				url: 'script.php?c=del',
				data : {idC: $(this).data('idc')},
				async : false
			}).done(function(data) {
				reponse = JSON.p(data,reponse);
			});
			if (reponse.valide) {
				$(this).html('Carte supprimée avec succès.');
			} else {$(this).html(retour.message);}
		});
	});
}