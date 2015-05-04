	<!-- Formulaire d'identification --> 
	<form id="authentification">
		<fieldset> <legend>Identification</legend>
			<p><label>Login : <input type="text" id="loginCice" value="" autofocus="autofocus" placeholder="Login" /></label></p>
			<p><label>Mot de passe : <input type="password" id="mdp" value=""  placeholder="Mot de passe" /></label></p>
			<p><button id="submit">Se connecter</button></p>
			<div id="statut"></div>
		</fieldset> 
		<p> Pas encore inscrit ? <a href='index?page=signin'> Inscrivez-vous !</a></p>
	</form>

	<div id='contenu'>
		<p>Créer des cartes thématiques et personnalisez-les !</p>
		<p><a href='index.php?page=unregistered'>Créer une carte en tant qu'anonyme</a></p>
		<img src="viewer.png" alt="exemple" />
	</div>