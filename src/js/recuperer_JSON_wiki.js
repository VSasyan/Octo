function recuperer_JSON_wiki(titres, distanceOrigine, portail_id) {
	/***
		Entrée :
			titres = tableau des pages à récupérer
			distanceOrigine = distance entre le portail/la page d'origne et cette page
			portail_id : Id du portail/de la page d'origine
		Sortie :
			sortie = string JSON à envoyer au serveur php soit :
				un tableau de type {{id, titre, nb_long, nb_visites, longueur, lien, data_evenement, long, lat}, portail_id};
	***/

	// 1) Generation de l'url :
	proxy = 'proxy.php?url=';
	console.log(titres);
	pages = titres.join('|');
	wiki = 'http://fr.wikipedia.org/w/api.php?action=query&titles='+pages+'&format=json&prop=categories|coordinates|info|langlinks|links|revisions&inprop=url&rvprop=content&rvsection=0&continue=';

	// 2) envoie de la requete AJAX :
	remote_url = proxy + encodeURIComponent(wiki.replace(/ /g, '_')) + '&full_headers=0&full_status=0';

	var remote = $.ajax({
		type: 'GET',
		url: remote_url,
		async: false,
	}).responseText;
	retour = JSON.parse(remote);

	// 3) On traite le retour :
	var data = [];
	$.each(retour.contents.query.pages, function(i, page) {
		var coor = getCoor(page.coordinates);
		tps = {
			page: {
				id: page.pageid,
				titre: page.title,
				nb_langue: getLength(page.langlinks),
				nb_visite: 0,
				longueur: page['length'],
				lien: page.fullurl,
				data_evenement: getDate(page.revisions),
				long: coor.lon,
				lat: coor.lat,
				distance_Portail: distanceOrigine+1,
				importance: 0
			},
			portail_id : portail_id
		};
		console.log(getDate(page.revisions));
		data.push(tps);
	});

	// 4) Convertion en string et retour :
	return JSON.stringify(data);
}

function getCoor(coor) {
	if (typeof coor != 'undefined') {
		return {lat:coor[0].lat, lon:coor[0].lon};
	} else {return {lat:0, lon:0};}
}

function getLength(elm) {
	if (typeof coor != 'undefined') {
		return elm.length;
	} else {return 0;}
}

function getDate(rev) {
	console.log(rev[0]['*']);
	if (typeof rev != 'undefined') {
		var date = /Date\|([0-9]{1,2})\|([^|]+)\|([0-9]+).*([0-9]{1,2})\|([^|]+)\|([0-9]+)/.exec(rev[0]['*']);
		if (date != null) {
			// Il y a deux date (début/fin)
			return JSON.stringify([date[1]+' '+date[2]+' '+date[3], date[4]+' '+date[5]+' '+date[6]]);
		} else {
			// Une seule date ?
		var date = /Date\|([0-9]{1,2})\|([^|])+\|([0-9]+)/.exec(rev[0]['*']);
			if (date != null) {
				// Une seule date
				return JSON.stringify([date[1]+' '+date[2]+' '+date[3]]);
			} else {
				// Aucune date
				return '[10000]';
			}
		}
	} else {return '[10000]';}
}