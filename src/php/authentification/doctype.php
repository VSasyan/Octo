<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8" />
		<meta name="author" content="Adélaïde LORIEUX, Simon FABRY, Manon GIRARD, Valentin SASYAN" />
		<meta name="description" content="Cicérow" />
		<!-- <link rel="stylesheet" type="text/css" href="normalize.css" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="style.css" /> -->
		<title><?php echo $pages[$page][1]; ?></title>

		<!-- Tous les scripts utiles : -->
		<script type="text/javascript" src="../js/jquery.js"></script>
		<script type="text/javascript" src="../js/lib/jquery-ui.js"></script>
		<script type="text/javascript" src="../js/lib/sha1.js"></script>
		<link rel="stylesheet" type="text/css" href="../js/lib/jquery-ui.css" />
		<script type="text/javascript" src="../js/utilitaires.js"></script>

<?php	if ($page == '') { ?>
	    	<script type="text/javascript" src="authentification/auth.js"></script>
<?php	} elseif ($page == 'personnaliser') { ?>
			<script type="text/javascript" src="personnaliser/personnaliser.js"></script>
			<link rel="stylesheet" type="text/css" href="personnaliser/personnaliser.css" />
<?php	} elseif ($page == 'edit') { ?>
			<script type="text/javascript" src="edit/edit.js"></script>
			<link rel="stylesheet" type="text/css" href="edit/edit.css" />
			<script type="text/javascript" src="../js/recuperer_article_JSON.js"></script>
			<script type="text/javascript" src="../js/recuperer_portail_HTML.js"></script>
<?php	} elseif ($page == 'viewer') { ?>
		<script type="text/javascript" src="viewer/viewer.js"></script>
			<link rel="stylesheet" type="text/css" href="viewer/viewer.css" />
			<script type="text/javascript" src="../js/lib/mxn/mxn.js?(google)"></script>
			<script type="text/javascript" src="../js/lib/timeline-1.2.js"></script>
			<script type="text/javascript" src="../js/lib/time_line_date-time.js"></script>
			<script type="text/javascript" src="../js/timemap/timemap.js"></script>
			<script type="text/javascript" src="../js/timemap/timemap_themes.js"></script>
			<script type="text/javascript" src="../js/timemap/param.js"></script>
			<script type="text/javascript" src="../js/timemap/loaders/xml.js"></script>
			<script type="text/javascript" src="../js/timemap/loaders/kml.js"></script>
			<script type="text/javascript" src="../js/conversionArticles.js"></script>
<?php	} ?>
	</head>