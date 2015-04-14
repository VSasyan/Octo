<?php
	session_start();

	// En cas de déconnexion, on détruit la session
	if (isset($_GET['deconnect'])) {
		session_destroy();
		$_SESSION = array(); 
	}

	// Page possibles :
	$pages = array(
		"moncompte" => array("authentification/moncompte2.php", "Mon compte - Cicérow", false),
		"personnaliser" => array("personnaliser/personnaliser.php", "Créer une carte - Cicérow", array('creer' => 'Créer une carte', 'editer' => 'Editer une carte','perso' => 'Personnaliser une carte')),
		"unregistered" => array("personnaliser/unregistered.php", "Créer une carte - Cicérow", false),
		"edit" => array("edit/edit.php", "Gestion des portails - Cicérow", false),
		"viewer" => array("viewer/viewer.php", "Viewer - Cicérow", false),
		"auth" => array("authentification/auth2.php", "Athentification - Cicérow", false),
	);

	// Gestion de la page demandée :
	if (isset($_GET['page']) && isset($pages[$_GET['page']])) {
		$page = $_GET['page'];
		// On doit définir un type ???
		if ($pages[$page][2] != false) {
			if (isset($_GET['type']) && isset($pages[$page][2][$_GET['type']])) {$type = $_GET['type'];} else {$type = 'creer';}
		}
	} else {
		// On redirige vers mon compte ou auth (si pas loggé)
		if (isset($_SESSION['user']["role"])) {
			$logue = true;
			$page = 'moncompte';
		} else {
			$logue = false;
			$page = 'auth';
		}
	}

	include('authentification/doctype.php');
?>

<body>

<?php
	include('authentification/entete.php');
	include('authentification/menu.php');
?>

	<div id="wrap">
<?php 	include($pages[$page][0]); ?>
	</div>
	
</body>
</html>