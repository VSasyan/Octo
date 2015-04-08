<?php
	
	$Titres = [
		'creer' => 'Créer une carte',
		'editer' => 'Editer une carte',
		'perso' => 'Personnaliser une carte'
	];
	if (isset($_GET['type']) && isset($Titres[$_GET['type']])) {$type = $_GET['type'];} else {$type = 'creer';}

?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title><?php echo $Titres[$type]; ?></title>
	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/lib/jquery-ui.js"></script>
	<script type="text/javascript" src="../../js/lib/sha1.js"></script>
	<link rel="stylesheet" type="text/css" href="../../js/lib/jquery-ui.css" />
	<script type="text/javascript" src="../../js/utilitaires.js"></script>
	<script type="text/javascript" src="personnaliser.js"></script>

	<link rel="stylesheet" type="text/css" href="personnaliser.css" />

</head>

<body>
	<article id="action">
		<?php

			if ($type == 'creer') {

		?>

				<div id="creer">
					<h2>Créer une carte</h2>
						<div id="ajax">
						</div>
				</div>

		<?php

			} elseif ($type == 'editer' || $type == 'perso') {

				// On test si l'idC est passsée en paramètres :

				if (isset($_GET['idC'])) {
					// Dans ce cas on affiche la page :

					if ($page == 'editer') {

		?>

						<div id="editer">
							<h2>Editer <span id="titre"></span></h2>
							<div id="ajax"></div>
						</div>

		<?php

					} else {

		?>

						<div id="perso">
							<h2>Personnaliser <span id="titre"></span></h2>
							<div id="ajax"></div>
						</div>

		<?php

					}

				} else {
					// Sinon on affiche la fenetre de choix de la carte :

		?>

						<div id="listeCartes">
							<h2>Choississez une carte</h2>
							<div id="ajax">
								<ul id="cartes"></ul>
							</div>
						</div>

		<?php

				}

		?>

		<?php

			}

		?>
	</article>
</body>
</html>