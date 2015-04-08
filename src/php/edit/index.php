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
	<script type="text/javascript" src="edit.js"></script>
	<script type="text/javascript" src="../../js/recuperer_article_JSON.js"></script>
	<script type="text/javascript" src="../../js/recuperer_portail_HTML.js"></script>

	<link rel="stylesheet" type="text/css" href="edit.css" />

</head>

<body>
	
<?php include('edit.php'); ?>

</body>
</html>