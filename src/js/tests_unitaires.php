<?php

	$titres = [
		'index' => 'Page pour les tests unitaires',
		'recuperer_article_JSON' => 'Tests unitaires pour la fonction de récupération des articles via JSON',
		'recuperer_portail_HTML' => 'Tests unitaires pour la fonction de récupération des portails via HTML'
	];

	if (isset($_GET['page'])) {$page = $_GET['page'];} else {$page = 'index';}
	if (!isset($titres[$page])) {$page = 'index';}

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <title><?php echo $titres[$page]; ?></title>

    <link rel="stylesheet" href="tests_unitaires.css">
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="utilitaires.js"></script>
	<script type="text/javascript" src="tests_unitaires.js"></script>
	<script type="text/javascript" src="recuperer_article_JSON.js"></script>
	<script type="text/javascript" src="recuperer_portail_HTML.js"></script>
</head>

<body>
	<h2 id="titre">Tests unitaires des fonctions javascripts principales</h2>
	<div id="resume">
		<p>Résultat des tests unitaires : <span id="statut"></span></p>
		<p id="etat"></p>
	</div>

	<div id="tests">
		<h3>Tests :</h3>
	</div>

	<div id="erreurs">
		<h3>Erreurs :</h3>
	</div>

</body>

</html>