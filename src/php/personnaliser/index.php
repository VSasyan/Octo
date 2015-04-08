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

	<?php include('personnaliser.php'); ?>

</body>
</html>