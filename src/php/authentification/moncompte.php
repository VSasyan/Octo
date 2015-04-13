 <?php  

  session_start();

include('doctype.php');
include('entete.php');
?>
</head>
<body> 
<div id="wrap"> 
<?php 
	include('menu.php');
	echo "<div id='contenu'>";
	echo "<fieldset><p>Bonjour ".$_SESSION['user']["login"]." !</p><p> Vous êtes connecté</p></fieldset><p></p>";
?>
 
<input type="hidden" value="json_encode()" id="session" />
</div>
</div>
</body>
</html>