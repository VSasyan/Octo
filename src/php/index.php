<?php
	session_start();

	// En cas de déconnexion, on détruit la session
	if (isset($_GET['deconnect'])) {
		session_destroy();
		$_SESSION = array(); 
	}

	// Page possibles :
	$pages = array(
		"moncompte" => array("authentification/moncompte.php", "Mon compte", false),
		"personnaliser" => array("personnaliser/personnaliser.php", "Créer une carte", array('creer' => 'Créer une carte', 'editer' => 'Editer une carte','perso' => 'Personnaliser une carte')),
		"unregistered" => array("personnaliser/unregistered.php", "Créer une carte", false),
		"edit" => array("edit/edit.php", "Gestion des portails", false),
		"viewer" => array("viewer/viewer.php", "Viewer", false),
		"auth" => array("authentification/auth.php", "Authentification", false),
		"signin" => array("inscription/inscription.php", "Inscription", false),
	);

	// Gestion de la page demandée :
	if (isset($_GET['page']) && isset($pages[$_GET['page']])) {
		$page = $_GET['page'];
		// On doit définir un type ???
		if ($pages[$page][2] != false) {
			if (isset($_GET['type']) && isset($pages[$page][2][$_GET['type']])) {$type = $_GET['type'];} else {$type = 'creer';}
			$titre = $pages[$page][2][$type];
		} else {
			$titre = $pages[$page][1];
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
		$titre = $pages[$page][1];
	}

	include('authentification/doctype.php');
?>

<body id='<?php echo $page; ?>'>

<?php
	include('authentification/entete.php');
	include('authentification/menu.php');
?>

	<div id="wrap">
<?php 	include($pages[$page][0]); ?>
	</div>
	
</body>
</html>