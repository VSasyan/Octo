<?php

	if (isset($_GET['page'])) {
		$page = $_GET['page'];
	} else {
		$retour = array(
			"status" => array('http_code' => 404),
			"contents" => '{}'
		);
	}

	// On recuperer le text du fichier page :
	$txt = '';
	$tabfich = file($page);
	for($i = 0; $i < count($tabfich); $i++) {
		$txt .= $tabfich[$i];
	}

	// On passe les .json en objet :
	if (strstr($page, '.json')) {$txt = json_decode($txt);}

	// Puis on genère un retour :
	$retour = array(
		"status" => array('http_code' => 200),
		"contents" => $txt
	);
	echo json_encode($retour);

?>