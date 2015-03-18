<?php
	
	$Titres = [
		'portail' => 'Ajouter un portail',
		'article' => 'Mettre à jour un portail'
	];
	if (isset($_GET['type']) && isset($Titres[$_GET['type']])) {$type = $_GET['type'];} else {$type = 'portail';}

?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title><?php echo $Titres[$type]; ?></title>
	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/lib/jquery-ui.js"></script>
	<link rel="stylesheet" type="text/css" href="../../js/lib/jquery-ui.css" />
	<script type="text/javascript" src="../../js/utilitaires.js"></script>
	<script type="text/javascript" src="gui.js"></script>
	<script type="text/javascript" src="../../js/recuperer_article_JSON.js"></script>
	<script type="text/javascript" src="../../js/recuperer_portail_HTML.js"></script>

	<link rel="stylesheet" type="text/css" href="gui.css" />

</head>

<body>
	<article id="action" class="loading">
		<div>
			<h2>Selection du portail</h2>
			<p>
				<span>Choisissez un portail :</span>
				<input value="" id="portail"  type="text" pattern="Portail:.*" placeholder="Entrez le nom du portail avec le préfixe"/>
				<button id="verifierPortail">Valider</button>
			</p>
		</div>
		<div id="loading" class="center">
			<img src="../../image/load.gif" alt="Chargement en cours..." title="Chargement en cours...">
		</div>
		<div id="ajax"></div>
	</article>
</body>
</html>