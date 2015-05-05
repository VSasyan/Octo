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
			de <input id="debut_annee"  type="number" placeholder="Année de début" value="-9999" />
			à <input id="fin_annee"  type="number" placeholder="Année de fin" value="9999" />
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

	} elseif ($fct == 'formulaire_portail_unregistered') {

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
			<span>Emprise historique :</span>
			de <input id="debut_annee"  type="number" placeholder="Année de début" value="-9999" />
			à <input id="fin_annee"  type="number" placeholder="Année de fin" value="9999" />
		<p>
		</p>
			<button id="verifierPortail">Valider</button>
		</p>
		<div id="resultat"></div>

<?php

	} elseif ($fct == 'viewer_unregistered') {

?>

		<article id="action" class="loading viewer">
			<div id="liste"></div>
			<div id="timemap">
				<div id="top">
					<div id="licence"><a href="#viewSource">Source</a></div>
					<div id="anim" class="center">
						<input type="number" id="duration" value="30000"/>
						<button id="animate">Animation !!!</button>
						<button id="edition">Retour à l'édition</button>
					</div>
				</div>
				<div id="timelinecontainer">
					<div id="timeline"></div>
				</div>
				<div id="mapcontainer">
					<div id="map"></div>
				</div>
			</div>
			<div id="loading" class="center">
				<img src="../image/load.gif" alt="Chargement en cours..." title="Chargement en cours...">
			</div>
		</article>

		<div id="viewSource">
			<a href="#" id="fermer">&times;</a>
			<div id="htmlSource"></div>
		</div>
		<div id="cover"></div>

<?php

	} elseif ($fct == 'unregistered') {

		include('unregistered.php');

	}

?>



