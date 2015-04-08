<?php

	if (isset($_GET['fct'])) {$fct = $_GET['fct'];} else {$fct = '';}


	if ($fct == 'erreur_portail') { // erreur_portail&portail='+encodeURIComponent(nom)

		if (isset($_GET['portail'])) {
			$nom = '« ' . $_GET['portail'] . ' » ';
		} else {
			$nom = '';
		}
?>

		<div class="action">
			<h2>Portail <?php echo $nom; ?>non trouvé !</h2>
			<p>Impossible de créer la carte... Vérifiez l'orthogrpahe.</p>
		</div>

<?php

	} elseif ($fct == 'formulaire_portail') {

?>

		<p>
			<span>Choisissez un portail :</span>
			<input value="" id="portail"  type="text" pattern="Portail:.*" placeholder="Entrez le nom du portail avec le préfixe"/>
		</p>
		<p>
			<span>Titre de la carte :</span>
			<input value="" id="titre"  type="text" placeholder="Entrez le titre de la carte à créer"/>
		<p>
		</p>
			<button id="verifierPortail">Valider</button>
		</p>
		<div id="resultat"></div>

<?php

	}

?>



