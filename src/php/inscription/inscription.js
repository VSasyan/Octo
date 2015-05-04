var valider = function(event){ 
	var login = $("#loginCice").val(); 
	var mdp = $("#mdp").val();
	var form_OK = true;

	if (login == ""){
		form_OK = false; 
		$("#loginCice").addClass("erreur");
	} else { 
		$("#loginCice").removeClass("erreur");
	} 

	if (mdp == ""){
		form_OK = false; 
		$("#mdp").addClass("erreur");
	} else { 
		$("#mdp").removeClass("erreur");
	}

	if (mdp != $('#mdp2').val()) {
		form_OK = false; 
		$("#mdp2").addClass("erreur");
		$('#statut').html("<p>Les mots de passe ne correspondent pas !</p>");
	} else { 
		$("#mdp2").removeClass("erreur");
	} 

	// Au final, on empeche l'envoi du formulaire si form_OK est faux 
	if(form_OK){
		$('#statut').html("<p>Chargement en cours...</p>"+html_chargement);
		var mdp = ''+CryptoJS.SHA1(mdp);
		var json = {login: login, mdp: mdp};
		
		var lien = "script.php?u=add";
		var donnees_post = "json=" + encodeURIComponent(JSON.stringify(json));

		$.post(lien, donnees_post, function( data ) {
			console.log( data );
			var retour = JSON.parse(data);
			if (retour.valide == true) {
				$('#statut').html("<p>Inscription réussie !</p>");
				setTimeout(window.location.assign('index.php?page=auth'), 500);
			} else {
				$('#statut').html("<p>Erreur lors de l'inscription !</p>");
			}
		});
	}
}

$(document).ready(function () {
	$('#inscription').on('submit', function (e) {
		e.preventDefault();
		valider();
	});

	$('#mdp, #mdp2').keyup(function() {
		if ($('#mdp').val() != $('#mdp2').val()) {
			$("#mdp2").addClass("erreur");
		} else { 
			$("#mdp2").removeClass("erreur");
		} 
	});
});