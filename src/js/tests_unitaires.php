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
	<script type="text/javascript" src="tests_unitaires.js"></script>
    <?php
    	if ($page != 'index') {
    ?>
    		<script type="text/javascript" src="<?php echo $page; ?>.js"></script>
			<script type="text/javascript">
				var dir = '../';
				var page = "<?php echo $page; ?>";
			</script>
	<?php
    	}
    ?>
</head>

<body>
<?php
	if ($page != 'index') {
?>
		<div id="resume">
			<h2 id="titre"><?php echo $titres[$page]; ?></h2>
			<p>Résultat des tests unitaires : <span id="statut"></span></p>
			<p id="etat"></p>
		</div>

		<div id="tests">
			<h3>Tests :</h3>
		</div>

		<div id="erreurs">
			<h3>Erreurs :</h3>
		</div>
<?php
	}
?>

	<div>
		<h3>Liste des tests unitaires possibles :</h3>
		<ul>
			<li><a href="tests_unitaires.php?page=recuperer_article_JSON">recuperer_article_JSON</a></li>
			<li><a href="tests_unitaires.php?page=recuperer_portail_HTML">recuperer_portail_HTML</a></li>
		</ul>
	</div>

</body>

</html>