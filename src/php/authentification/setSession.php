<?php
	session_start();
	if (isset($_GET['json'])) {
		$_SESSION = array(); 
		$data = json_decode($_GET['json']);
		$_SESSION['user']["login"]) = $data['login'];
		$_SESSION['user']["idU"]) = $data['idU'];
		$_SESSION['user']["role"]) = $data['role'];
		$_SESSION['user']["roleType"]) = $data['roleType'];
		echo '{"valide":true}';
	} else {
		echo '{"valide":false}';
	}

?>