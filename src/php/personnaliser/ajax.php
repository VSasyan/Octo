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
		<h3>Informations sur la carte</h3>
		<div class="centrer">
			<p class="portail">
				<span>Choisissez un portail :</span>
				<input value="" id="portail"  type="text" pattern="Portail:.*" placeholder="Entrez le nom du portail avec le préfixe"/>
			</p>
			<p>
				<span>Titre de la carte :</span>
				<input value="" id="titre"  type="text" placeholder="Entrez le titre de la carte à créer"/>
			</p>
			<p>
				<span>Description :</span>
				<textarea id="description"  type="text" placeholder="Description de la Carte créée..."></textarea>
			</p>
			<p>
				<span>Emprise historique :</span>
				de <input id="debut_annee"  type="number" placeholder="Année de début" value="-9999" />
				à <input id="fin_annee"  type="number" placeholder="Année de fin" value="9999" />
			</p>
			<p>
				<span>Durée de l'animation :</span>
				<input value="120" id="duree"  type="text" placeholder="Durée en secondes" title="Durée de l'animation en seconde"/>
			</p>
			<p>
				<span>Echelle de temps globale :</span>
				<select id="echelle_temps_bas">
					<option value="4">Jour</option>
					<option value="5">Semaine</option>
					<option value="6">Mois</option>
					<option value="7" selected="selected">Année</option>
					<option value="8">Décénnie</option>
					<option value="9">Siècle</option>
					<option value="10">Millénaire</option>
				</select>
			</p>
			<p>
				<span>Echelle de temps précise :</span>
				<select id="echelle_temps_haut">
					<option value="4" disabled="disabled">Jour</option>
					<option value="5" disabled="disabled">Semaine</option>
					<option value="6" disabled="disabled">Mois</option>
					<option value="7" disabled="disabled">Année</option>
					<option value="8" disabled="disabled">Décénnie</option>
					<option value="9" selected="selected">Siècle</option>
					<option value="10">Millénaire</option>
				</select>
			</p>
			<p class="verifierPortail">
				<button id="verifierPortail">Valider</button>
			</p>
			<div id="resultat"></div>
		</div>

<?php

	} elseif ($fct == 'formulaire_portail_unregistered') {

?>
		
		<h3>Informations sur la carte</h3>
		<div class="centrer">
			<p class="portail">
				<span>Choisissez un portail :</span>
				<input value="" id="portail"  type="text" pattern="Portail:.*" placeholder="Entrez le nom du portail avec le préfixe"/>
			</p>
			<p>
				<span>Titre de la carte :</span>
				<input value="" id="titre"  type="text" placeholder="Entrez le titre de la carte à créer"/>
			</p>
			<p>
				<span>Emprise historique :</span>
				de <input id="debut_annee"  type="number" placeholder="Année de début" value="-9999" />
				à <input id="fin_annee"  type="number" placeholder="Année de fin" value="9999" />
			</p>
			<p>
				<span>Durée de l'animation :</span>
				<input value="120" id="duree"  type="text" placeholder="Durée en secondes" title="Durée de l'animation en seconde"/>
			</p>
			<p class="verifierPortail">
				<button id="verifierPortail">Valider</button>
			</p>
			<div id="resultat"></div>
		</div>

<?php

	} elseif ($fct == 'viewer_unregistered') {

?>

		<article id="action" class="loading viewer">
			<div id="liste"></div>
			<div id="timemap">
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
			<div id="top">
				<div id="lecteur">
					<span id="edition" title="Retour à l'édition"><i class="fa fa-arrow-left"></i></span>
					<div id="licence">
						<a href="#viewSource" title="Voir les sources"><i class="fa fa-cog"></i></a>
					</div>
					<div id="anim">
						<span id="animate" title="Animation"><i class="fa fa-play"></i></span>
					</div>
				</div>
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



