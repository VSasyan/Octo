
<div id="menu">                      
	<ul>
		<?php
			if (isset($_SESSION['user']["role"])){
				echo '<li><a href="index.php?page=viewer&type=mescartes">Mes cartes</a></li><!--';
			} else {
				echo '<li><a href="index.php?page=viewer">Les cartes</a></li><!--';	
			}
		?>
		<?php
			if (isset($_SESSION['user']["role"])){
				echo '--><li><a href="index.php?page=personnaliser&type=creer">Créer une carte</a></li><!--';
			} else {
				echo '--><li><a href="index.php?page=unregistered">Créer une carte</a></li><!--';
			}
		?>
		
		--><li><a href="index.php?page=personnaliser&type=editer">Editer une carte</a></li><!--
		--><li><a href="index.php?page=personnaliser&type=perso">Personnaliser une carte</a></li><!--
		<?php
			if (isset($_SESSION['user']["role"]) && $_SESSION['user']["role"] > 1){
				echo '--><li><a href="index.php?page=edit">Gérer les portails</a></li><!--';
			}
		?>
		--><li><a href="index.php?deconnect">Déconnexion</a></li>
		</ul>        
</div>