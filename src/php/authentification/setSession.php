<?php
	session_start();
	if (isset($_GET['json'])) {
		$_SESSION = array(); 
		$tps = json_decode($_GET['json'], true);
		$user = array(
			"login" => $tps['login'],
			"idU" => $tps['idU'],
			"role" => $tps['role'],
			"roleType" => $tps['roleType']
		);
		
		$_SESSION['user'] = $user;
		echo '{"valide":true}';
	} else {
		echo '{"valide":false}';
	}

?>