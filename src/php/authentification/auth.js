var valider = function(event){ 
	var login = $("#login").val(); 
	var mdp = ''+CryptoJS.SHA1($("#mdp").val());
	var form_OK = true; 
	console.log( login );
	if (login == ""){
		form_OK = false; 
		$("#login").addClass("erreur");
	}
	else{ 
		$("#login").removeClass("erreur");
	} 

	if(mdp == ""){
		form_OK = false; 
		$("#mdp").addClass("erreur");
	}
	else{ 
		$("#mdp").removeClass("erreur");
	}  

	console.log( form_OK );
	// Au final, on empeche l'envoi du formulaire si form_OK est faux 
	if(form_OK){
		console.log("test");
		var json = {login: login, mdp: mdp};
		
		var lien = "script.php?u=login";
		var donnees_post = "json=" + encodeURIComponent(JSON.stringify(json));
		$.post(lien, donnees_post, function( data ) {
			// On a recup les données, on les envoie à setSession :
			$.ajax({
				url : 'authentification/setSession.php?json=' + encodeURIComponent(data)
			}).done(function(data) {
				var reponse = JSON.parse(data);
				if (reponse.valide === true) {
					// Connexion et initialisation de la session réussis
					window.location.assign('index.php?page=moncompte');
				} else {
					// Erreur
				}
			});
		});
	}
}

$(document).ready(function () {
	$('#authentification #submit').click(function () {valider();});
});