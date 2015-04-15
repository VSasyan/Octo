<div id="menu">
	<ul>
		<?php
			$HTML = '';
			if (isset($_SESSION['user']["role"])) {
				// L'utilisateur est connecté :
				$HTML .= '<li><a href="index.php?page=viewer&type=mescartes">Mes cartes</a></li>';
				$HTML .= '<li><a href="index.php?page=personnaliser&type=creer">Créer une carte</a></li>';
				$HTML .= '<li><a href="index.php?page=personnaliser&type=editer">Editer une carte</a></li>';
				$HTML .= '<li><a href="index.php?page=personnaliser&type=perso">Personnaliser une carte</a></li>';
				if (isset($_SESSION['user']["role"]) && $_SESSION['user']["role"] > 1) {
					// L'utilisateur est un editeur :
					$HTML .= '<li><a href="index.php?page=edit">Gérer les portails</a></li>';
				}
				$HTML .= '<li><a href="index.php?deconnect">Déconnexion</a></li>';
			} else {
				// Utilisateur non connecté :
				$HTML .= '<li><a href="index.php?page=viewer">Les cartes</a></li>';
				$HTML .= '<li><a href="index.php?page=unregistered">Créer une carte</a></li>';
				$HTML .= '<li><a href="index.php?page=auth">Se connecter</a></li>';
				$HTML .= '<li><a href="index.php?page=signin">S\'inscrire</a></li>';
			}
			echo $HTML;
		?>
		</ul>
</div>