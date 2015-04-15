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
		
		var lien = "script.php?u=add";
		var donnees_post = "json=" + encodeURIComponent(JSON.stringify(json));
		console.log(json,donnees_post);
		$.post(lien, donnees_post, function( data ) {
			console.log( data );
			var user = $("#user").val(); 
			
		});
	}
}

$(document).ready(function () {
	$('#inscription #submit').click(function () {valider();});
});