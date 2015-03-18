<?php

	if (isset($_GET['fct'])) {$fct = $_GET['fct'];} else {$fct = '';}


	if ($fct == 'ajouter_portail') {

?>

	<div class="action">
		<h2>Portail non trouvé, l'ajouter ?</h2>
		<p><span>Nom du Portail :</span> <input id="nom" value="" pattern="Portail:.*" type="text" placeholder="Entrez le nom du portail avec le préfixe"/></p>
		<p><span>Lien du Portail :</span> <input id="url" value="" required="required" type="url" placeholder="Entrez l'url complète du portail (facultatif)"/></p>
		<button id="ajouterPortail">Ajouter le portail</button>
		<div id="resultat"></div>
	</div>

<?php

	} elseif ($fct == 'editer_portail') {

?>

		<div class="action">
			<h2>Gérer le portail</h2>
			<div id="recap">
				<p id="title">Informations sur le portail :</p>
				<p id="nom"></p>
				<p id="url"></p>
			</div>
			<button id="majArticlesPortail">Mise à jour des articles associés</button>
			<button id="supprimerPortail">Supprimer le portail</button>
			<div id="resultat"></div>
		</div>

<?php

	}

?>