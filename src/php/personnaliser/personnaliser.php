
	<nav>
		<ul>
			<li><a href="index.php?page=personnaliser&type=creer">Créer une carte</a></li>
			<li><a href="index.php?page=personnaliser&type=editer">Editer une carte</a></li>
			<li><a href="index.php?page=personnaliser&type=perso">Personnaliser une carte</a></li>
		</ul>
	</nav>
	
	<article id="action">
		<?php

			if ($type == 'creer') {

		?>

				<div id="creer">
					<h2>Créer une carte</h2>
						<div id="ajax">
						</div>
				</div>

		<?php

			} elseif ($type == 'editer' || $type == 'perso') {

				// On test si l'idC est passsée en paramètres :

				if (isset($_GET['idC'])) {
					// Dans ce cas on affiche la page :

					if ($page == 'editer') {

		?>

						<div id="editer">
							<h2>Editer <span id="titre"></span></h2>
							<div id="ajax"></div>
						</div>

		<?php

					} else {

		?>

						<div id="perso">
							<h2>Personnaliser <span id="titre"></span></h2>
							<div id="ajax"></div>
						</div>

		<?php

					}

				} else {
					// Sinon on affiche la fenetre de choix de la carte :

		?>

						<div id="listeCartes">
							<h2>Choississez une carte</h2>
							<div id="ajax">
								<ul id="cartes"></ul>
							</div>
						</div>

		<?php

				}

		?>

		<?php

			}

		?>
	</article>