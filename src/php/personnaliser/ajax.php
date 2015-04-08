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
		<p>
			<span>Description :</span>
			<textarea id="description"  type="text" placeholder="Description de la Carte créée..."></textarea>
		<p>
		<p>
			<span>Emprise historique :</span>
			de <input id="annee_debut"  type="number" placeholder="Année de début" value="-9999" />
			à <input id="annee_fin"  type="number" placeholder="Année de fin" value="9999" />
		<p>
		<p>
			<span>Durée de l'animation :</span>
			<input value="120" id="duree"  type="text" placeholder="Durée en secondes" title="Durée de l'animation en seconde"/>
		<p>
		</p>
			<button id="verifierPortail">Valider</button>
		</p>
		<div id="resultat"></div>

<?php

	}

?>



