<?php
	session_start();
	$data['login'] = $_SESSION['user']["login"];
	$data['idU'] = $_SESSION['user']["idU"];
	$data['role'] = $_SESSION['user']["role"];
	$data['roleType'] = $_SESSION['user']["roleType"];
	echo json_encode($data);
?>