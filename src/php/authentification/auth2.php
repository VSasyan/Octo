<?php
	// En cas de déconnexion, on détruit la session
	if (isset($_GET['deconnect'])) {
		session_destroy();
		$_SESSION = array(); 
	}
?>

	<!-- Formulaire d'identification --> 
	<div id="authentification">
		<fieldset> <legend>Identification</legend>
			<div><label>Login : <input type="text" id="login" value="" /></label></div>
			<div><label>Mot de passe : <input type="password" id="mdp" value="" /></label></div>
			<div><button id="submit">Se connecter</button>     </div> 
		</fieldset> 
		<p> Pas encore inscrit ? <a href='register.json.php'> Inscrivez-vous !</a></p>
	</div>
		   
  <div id='contenu'><p> Créer des cartes thématiques et personnalisez-les !  </p>
  <p> <a href='a.php'>Créer une carte en tant qu'anonyme</a></p>
  <img src="viewer.png" alt="exemple" /></div>