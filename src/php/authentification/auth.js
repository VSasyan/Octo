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

	if (mdp == "") {
		form_OK = false; 
		$("#mdp").addClass("erreur");
	} else {
		$("#mdp").removeClass("erreur");
	}  

	// Au final, on empeche l'envoi du formulaire si form_OK est faux 
	if (form_OK){
		var mdp = ''+CryptoJS.SHA1(mdp);
		$('#statut').html("<p>Chargement en cours...</p>"+html_chargement);
		var json = {login: login, mdp: mdp};
		
		var lien = "script.php?u=login";
		var donnees_post = "json=" + encodeURIComponent(JSON.stringify(json));
		$.post(lien, donnees_post, function( data ) {
			var reponse = JSON.parse(data);
			if (reponse.valide === true) {
				// On a recup les données, on les envoie à setSession :
				$.ajax({
					url : 'authentification/setSession.php?json=' + encodeURIComponent(data)
				}).done(function(data) {
					var reponse = JSON.parse(data);
					console.log(reponse);
					if (reponse.valide === true) {
						$('#statut').html("<p>Connexion réussie, redirection...</p>"+html_chargement);
					
						// Connexion et initialisation de la session réussis
						setTimeout(window.location.assign('index.php?page=moncompte'), 500);
					} else {
						// Erreur
						$('#statut').html("<p>Erreur de connexion !</p>");
					}
				});				
			} else {
				$('#statut').html("<p>Erreur de connexion !</p><p>Vérifiez votre login et votre mot de passe !</p>");
				$("#mdp").val('').focus();
			}
		});
	}
}

$(document).ready(function () {
	$('#authentification').on('submit',function (e) {
		e.preventDefault();
		valider();
	});
});