  <?php  

  session_start();

include('doctype.php');

include('entete.php');
?>
	</head>
	<body> 
<div id="wrap"> 


<?php
	// En cas de déconnexion, on détruit la session
	if (isset($_GET['deconnect'])) {
		session_destroy();
		$_SESSION = array(); 
	}
?>
<h3>Cartographie informatique et chronologie d'événements reliés obtenus via Wikipédia</h3>
			<!-- Formulaire d'identification --> 
            <div id="authentification">
				<fieldset> <legend>Identification</legend>
                   <div><label>Login : <input type="text" id="login" value="" /></label></div>
                   <div><label>Mot de passe : <input type="password" id="mdp" value="" /></label></div>
                   <div><button id="submit">Se connecter</button>     </div> 
				</fieldset> 
			</div>
<?php 
				   echo "<p> Pas encore inscrit ? <a href='register.json.php'> Inscrivez-vous !</a></p>";
          
?>     
	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/lib/jquery-ui.js"></script>
	<script type="text/javascript" src="../../js/lib/sha1.js"></script>
	<link rel="stylesheet" type="text/css" href="../../js/lib/jquery-ui.css" />
	<script type="text/javascript" src="../../js/utilitaires.js"></script>
	     <script type="text/javascript" src="auth.js"></script>  
</div></div>
      
</body>
</html>