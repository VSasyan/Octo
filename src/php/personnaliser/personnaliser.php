	<article id="action">
		<?php

			if ($type == 'creer') {

		?>

				<div id="creer">
					<div id="ajax" class="form"></div>
				</div>

		<?php

			} elseif ($type == 'perso') {

				// On test si l'idC est passsée en paramètres :

				if (isset($_GET['idC'])) {
					// Dans ce cas on affiche la page :

		?>

					<div id="perso">
						<div id="ajax" class="form"></div>
						<div id="ajax" class="eve"></div>
					</div>

		<?php

				} else {
					// Sinon on affiche la fenetre de choix de la carte :

		?>

					<div id="listeCartes">
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