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

			} elseif ($type == 'perso') {

				// On test si l'idC est passsée en paramètres :

				if (isset($_GET['idC'])) {
					// Dans ce cas on affiche la page :

		?>

					<div id="perso">
						<h2>Personnaliser la carte<span id="titre"></span></h2>
						<div id="ajax"></div>
					</div>

		<?php

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