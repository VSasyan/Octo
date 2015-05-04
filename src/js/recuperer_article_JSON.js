function recuperer_article_JSON(titres, distanceOrigine, portail_id, debug, test_unitaire) {
	/***
		Entrée :
			titres = tableau des pages à récupérer
			distanceOrigine = distance entre le portail/la page d'origne et cette page
			portail_id : Id du portail/de la page d'origine
			debug : log des info (false par defaut)
			test_unitaire : lancer l'operation en mode test unitaire (false par défaut)
		Sortie :
			sortie = PAS au format JSON (PAS en string)
				un tableau de type 
					{
						id,
						titre,
						nb_langue,
						nb_visite,
						longueur,
						lien,
						debut_annee,
						debut_mois,
						debut_jour,
						fin_annee,
						fin_mois,
						fin_jour,
						data_maj,
						lon,
						lat,
						type_infobox,
						portail_id
					}
	***/
	var debug = debug || false;
	var test_unitaire = test_unitaire || false;

	// 1) Generation de l'url :
	proxy = dir+'js/proxy.php?url=';
	pages = titres.join('|');
	wiki = 'http://fr.wikipedia.org/w/api.php?action=query&titles='+pages+'&lllimit=500&format=json&prop=categories|coordinates|info|langlinks|links|revisions&inprop=url&rvprop=content&rvsection=0&continue=';


	// 2) envoie de la requete AJAX :
	var continuer = 3; // On se laisse 3 tentatives
	while (continuer > 0) {
		if (test_unitaire === false) {
			remote_url = proxy + encodeURIComponent(wiki.replace(/ /g, '_')) + '&full_headers=0&full_status=0';
		} else {
			remote_url = 'codes_tests_unitaires/index.php?page=' + test_unitaire;
		}

		var remote = $.ajax({
			type: 'GET',
			url: remote_url,
			async: false,
		}).responseText;
		retour = JSON.parse(remote);
		if (retour.status.http_code == 200) {continuer = 0;}
		else {continuer--;}
	}

	// 3) On traite le retour :
	var data = [];
	$.each(retour.contents.query.pages, function(i, page) {
		if (!(typeof page['pageid'] === 'undefined')) {
			var coor = getCoor(page.coordinates);
			var infobox = getInfobox(page.revisions);
			var date = getDate(page.revisions, debug);
			if (debug === true) {console.log(page.revisions);}

			var pages = {
				id: page.pageid,
				titre: page.title,
				lon: coor.lon,
				lat: coor.lat,
				nb_langue: getLength(page.langlinks)+1,
				longueur: page['length'],
				lien: page.fullurl,
				date_maj: page.touched.replace('T', ' ').replace('Z', ''),
				debut_annee: parseInt(date.debut_annee),
				debut_mois: moisEnChiffre(date.debut_mois),
				debut_jour: parseInt(date.debut_jour),
				fin_annee: parseInt(date.fin_annee),
				fin_mois: moisEnChiffre(date.fin_mois),
				fin_jour: parseInt(date.fin_jour),
				type_infobox: infobox,
				distance_Portail: distanceOrigine,
				portail_id : portail_id
			};

			data.push(pages);
		}
	});

	// 4) Retour :
	return data;
}

function getCoor(coor) {
	if (typeof coor != 'undefined') {
		return {lat:coor[0].lat, lon:coor[0].lon};
	} else {return {lat:0, lon:0};}
}

function getLength(elm) {
	if (typeof elm != 'undefined') {
		return elm.length;
	} else {return 0;}
}

function getInfobox(rev) {
	var rev = rev || [{'*':''}];
	var infobox = /Infobox ([A-Za-z ]*)/.exec(rev[0]['*']);
	if (infobox) {return infobox[1];} else {return '';}
}

function getDate(rev, debug) {
	var rev = rev || [{'*':''}];
	var txt = rev[0]['*'].replace(/source[rs]?\|date/g, '').replace(/lier\|date/g, '').replace(/1er/g, '1');
	if (debug === true) {console.log(txt);}
	var txt = /\|[\s]*date[^=]*= *(.*)[^.]/.exec(txt);
	if (txt) {
		// Il y a une date dans l'infobox :
		txt = txt[1].replace(/\[|\]|,|}|{|/g, '').replace(/ ?\| ?/g, '|').replace(/\(.*\)/, '').replace(/s[0-9]+/, '')
					.replace(/an av\. J\.-C\.\|/g,'-');
		if (!(/Wikidata/.test(txt))) { // On ne peut pas gérer les Wikidata
			var date = parserDateInfobox(txt, debug);
			if (!(date === false)) {
				// Il y a une date trouvée dans l'infobox : on la renvoie
				return date;
			}
		}
	} else {
		// Pas d'infobox : on recupère le premier chiffre du text :
		var date = parserDateText(rev[0]['*']);
		if (!(date === false)) {
			// Il y a une date trouvée dans le texte : on la renvoie
			return date;
		}
	}
	date = {debut_annee:10000, debut_mois:0, debut_jour:0, fin_annee:10000, fin_mois:0, fin_jour:0};
	//console.log(txt, rev[0]['*']); /!\ Loupe les dates dans le corp de text. Il faut réfléchir à comment les récupérer.
	return date;
}

function moisEnChiffre(mois) {
	if (typeof mois != undefined) {
		var mois = (mois + '').toLowerCase();
		var liste_mois = {
			'0' : 0,
			'janvier' : 1,
			'fevrier' : 2,
			'février' : 2,
			'mars' : 3,
			'avril' : 4,
			'mai' : 5,
			'juin' : 6,
			'juillet' : 7,
			'août' : 8,
			'aout' : 8,
			'septembre' : 9,
			'octobre' : 10,
			'novembre' : 11,
			'décembre' : 12,
			'decembre' : 12
		};
		var retour = liste_mois[mois] || 0;
	} else {retour = 0;}
	return retour;
}

function parserDateText(txt, debug) {
	if (info = /([\wûÛéÉ]*) \[\[(-?[0-9]{1,4})\]\]/.exec(txt)) {
		date = {debut_annee:info[2], debut_mois:info[1], debut_jour:0, fin_annee:info[2], fin_mois:info[1], fin_jour:0};
		return date;
	}
	return false;
}

function parserDateInfobox(txt, debug) {
	var date = false;
	if (debug === true) {console.log(txt);}
	// On test si c'est avant JC :
	if (info = /av\. J\.-C\./.test(txt)) {var coeff = -1;} else {var coeff = 1;}
console.log(coeff);
	if (info = /ate\|([1-3]?[0-9])\|([\wûÛéÉ]*)\|([0-9]+)[^0-9]*([1-3]?[0-9])\|([\wûÛéÉ]*)\|([0-9]+)/.exec(txt)) {
		date = {debut_annee:info[3], debut_mois:info[2], debut_jour:info[1], fin_annee:info[6], fin_mois:info[5], fin_jour:info[4]};
		if (debug === true) {console.log(date);}
	} else if (info = /ate\|([1-3]?[0-9])\|([\wûÛéÉ]*)\|([0-9]+).*([1-3]?[0-9])\|([\wûÛéÉ]*)\|([0-9]+)/.exec(txt)) {
		date = {debut_annee:info[3], debut_mois:info[2], debut_jour:info[1], fin_annee:info[6], fin_mois:info[5], fin_jour:info[4]};
		if (debug === true) {console.log(date);}
		// 5 septembre|5 - date|12|septembre|1914
	} else if (info = /[Dd]ate\|([1-3]?[0-9])\|([\wûÛéÉ]*)\|? .*([1-3]?[0-9])\|([\wûÛéÉ]*)\|(-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[5], debut_mois:info[2], debut_jour:info[1], fin_annee:info[5], fin_mois:info[4], fin_jour:info[3]};
		if (debug === true) {console.log(date);}
		// du date|1|juillet| au date|18|novembre|1916 
	} else if (info = /([1-3]?[0-9]) ([\wûÛéÉ]*) [auet-]{1,2} ([1-3]?[0-9]) ([\wûÛéÉ]*) (-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[5], debut_mois:info[2], debut_jour:info[1], fin_annee:info[5], fin_mois:info[4], fin_jour:info[3]};
		if (debug === true) {console.log(date);}
		// 22 janvier - 1 mai 1759
	} else if (info = /[^0-9]*([1-3]?[0-9]) ([\wûÛéÉ]*).*ate\|([1-3]?[0-9])\|([^|]+)\|([0-9]+)/.exec(txt)) {
		date = {debut_annee:info[5], debut_mois:info[2], debut_jour:info[1], fin_annee:info[5], fin_mois:info[4], fin_jour:info[3]};
		if (debug === true) {console.log(date);}
	} else if (info = /([1-3]?[0-9])-([1-3]?[0-9]) [Dd]ate\|\|([\wûÛéÉ]*)\|(-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[4], debut_mois:info[3], debut_jour:info[1], fin_annee:info[4], fin_mois:info[3], fin_jour:info[2]};
		if (debug === true) {console.log(date);}
		// 1-9 date||juillet|1755
	} else if (info = /([1-3]?[0-9]) [auet-]{1,2} ([1-3]?[0-9]) ([\wûÛéÉ]*) (-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[4], debut_mois:info[3], debut_jour:info[1], fin_annee:info[4], fin_mois:info[3], fin_jour:info[2]};
		if (debug === true) {console.log(date);}
		// 3 au 8 octobre 1951
	} else if (info = /ate\|([1-3]?[0-9])\|([\wûÛéÉ]*)\|(-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[3], debut_mois:info[2], debut_jour:info[1], fin_annee:info[3], fin_mois:info[2], fin_jour:info[1]};
		if (debug === true) {console.log(date);}
		// Date|19|janvier|1974
	} else if (info = /([1-3]?[0-9])-([1-3]?[0-9]) ([\wûÛéÉ]*) (-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[4], debut_mois:info[3], debut_jour:info[1], fin_annee:info[4], fin_mois:info[3], fin_jour:info[2]};
		if (debug === true) {console.log(date);}
		// 24 août|24-27 août 410 
	} else if (info = /([1-3]?[0-9]) ([\wûÛéÉ]*) (-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[3], debut_mois:info[2], debut_jour:info[1], fin_annee:info[3], fin_mois:info[2], fin_jour:info[1]};
		if (debug === true) {console.log(date);}
	} else if (info = /([\wûÛéÉ]*) (-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[2], debut_mois:info[1], debut_jour:0, fin_annee:info[2], fin_mois:info[1], fin_jour:0};
		if (debug === true) {console.log(date);}
	} else if (info = /([0-9]{1,4})-([0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[1], debut_mois:0, debut_jour:0, fin_annee:info[2], fin_mois:0, fin_jour:0};
		if (debug === true) {console.log(date);}
	} else if (info = /(-?[0-9]{1,4})/.exec(txt)) {
		date = {debut_annee:info[1], debut_mois:0, debut_jour:0, fin_annee:info[1], fin_mois:0, fin_jour:0};
		if (debug === true) {console.log(date);}
	}
	if (!(date === false) && (coeff == -1)) {
		date.debut_annee = Math.abs(date.debut_annee) * coeff;
		date.fin_annee = Math.abs(date.fin_annee) * coeff;
	}
	return date;
}