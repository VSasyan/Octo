function recuperer_article_JSON(titres, distanceOrigine, portail_id) {
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
<<<<<<< HEAD
	wiki = 'http://fr.wikipedia.org/w/api.php?action=query&titles='+pages+'&format=json&prop=categories|coordinates|info|langlinks|links|revisions&lllimit=5000&inprop=url&rvprop=content&rvsection=0&continue=';
=======
	wiki = 'http://fr.wikipedia.org/w/api.php?action=query&titles='+pages+'&lllimit=5000&format=json&prop=categories|coordinates|info|langlinks|links|revisions&inprop=url&rvprop=content&rvsection=0&continue=';
>>>>>>> origin/master

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
		var date = getDate(page.revisions);

		var pages = {
			id: page.pageid,
			titre: page.title,
			long: coor.lon,
			lat: coor.lat,
			nb_langue: getLength(page.langlinks),
			nb_visite: 0,
			longueur: page['length'],
			lien: page.fullurl,
			//date_maj: ,
			debut_annee: date.debut_annee,
			debut_mois: date.debut_mois,
			debut_jour: date.debut_jour,
			fin_annee: date.fin_annee,
			fin_mois: date.fin_mois,
			fin_jour: date.fin_jour,
			importance: 0,
			distance_Portail: distanceOrigine+1,
			portail_id : portail_id
		};

		data.push(pages);
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
	if (typeof elm != 'undefined') {
		return elm.length;
	} else {return 0;}
}

function getDate(rev) {
	console.log(rev[0]['*']);
	var txt = /date[^=]*= *(.*)[^.]/.exec(rev[0]['*']); //[\s]*\| *[a-zA-Z]+ *=
	if (txt) {
<<<<<<< HEAD
		txt = txt[1].replace(/\[|\]|,/g, '');
		if (/Date\|([0-9]{1,2})\|([^|]+)\|([0-9]+)[^0-9]*([0-9]{1,2})\|([^|]+)\|([0-9]+)/.test(txt)) {
			var info = /Date\|([0-9]{1,2})\|([^|]+)\|([0-9]+)[^0-9]*([0-9]{1,2})\|([^|]+)\|([0-9]+)/.exec(txt);
=======
		txt = txt[1].replace(/\[|\]|,|}|{/g, '');
		console.log(txt);
		if (/ate\|([0-9]{1,2})\|([^|]+)\|([0-9]+).*([0-9]{1,2})\|([^|]+)\|([0-9]+)/.test(txt)) {
			var info = /ate\|([0-9]{1,2})\|([^|]+)\|([0-9]+)[^0-9]*([0-9]{1,2})\|([^|]+)\|([0-9]+)/.exec(txt);
>>>>>>> origin/master
			date = {debut_annee:info[3], debut_mois:info[2], debut_jour:info[1], fin_annee:info[6], fin_mois:info[5], fin_jour:info[4]};
			return date;
			// 5 septembre|5 - date|12|septembre|1914
		} else if (/[^0-9]*([0-9]{1,2}) ([A-Za-z]+).*ate\|([0-9]{1,2})\|([^|]+)\|([0-9]+)/.test(txt)) {
			var info = /[^0-9]*([0-9]{1,2}) ([A-Za-z]+).*ate\|([0-9]{1,2})\|([^|]+)\|([0-9]+)/.exec(txt);
			date = {debut_annee:info[5], debut_mois:info[2], debut_jour:info[1], fin_annee:info[5], fin_mois:info[4], fin_jour:info[3]};
			return date;
		} else if (/([0-9]{1,2}) ([A-Za-z]*) (-?[0-9]{1,4})/.test(txt)) {
			var info = /([0-9]{1,2}) ([A-Za-z]*) (-?[0-9]{1,4})/.exec(txt);
			date = {debut_annee:info[3], debut_mois:info[2], debut_jour:info[1], fin_annee:info[3], fin_mois:info[2], fin_jour:info[1]};
			return date;
		} else if (/([A-Za-z]*) (-?[0-9]{1,4})/.test(txt)) {
			var info = /([A-Za-z]*) (-?[0-9]{1,4})/.exec(txt);
			date = {debut_annee:info[2], debut_mois:info[1], debut_jour:0, fin_annee:info[2], fin_mois:info[1], fin_jour:0};
			return date;
		} else if (/av\. J\.-C\./.test(txt)) {
			var info = /([0-9]{1,4})/.exec(txt);
			if (info) { // /!\ arrive parfois d'avoir que des lettres (ex : fin du VI siècle apres/avant JC, cas à ajouter !)
				date = {debut_annee:-1*info[1], debut_mois:0, debut_jour:0, fin_annee:-1*info[1], fin_mois:0, fin_jour:0};
				return date;
			}
		} else if (/(-?[0-9]{1,4})/.test(txt)) {
			var info = /(-?[0-9]{1,4})/.exec(txt);
			date = {debut_annee:info[1], debut_mois:0, debut_jour:0, fin_annee:info[1], fin_mois:0, fin_jour:0};
			return date;
		}
	}
	date = {debut_annee:10000, debut_mois:0, debut_jour:0, fin_annee:10000, fin_mois:0, fin_jour:0};
	//console.log(txt, rev[0]['*']); /!\ Loupe les dates dans le corp de text. Il faut réfléchir à comment les récupérer.
	return date;
}

/*

Tests :
il y a différents formats de date sur Wikipedia
donc différentes manières de récupérer la date
Voici les dates types trouvéées pour tester.

pages = [
	["Bataille_de_la_Porte_Colline", "av JC, mois", " |guerre=[[Deuxième Guerre civile Marius-Sylla]] |date= Novembre, [[-82|82 {{av JC}}]] |lieu=[[Rome]] ([[Italie]])"],
	["Bataille de Verdun (1916)", "ap JC, mois, jour, deux dates", "| guerre=[[Première Guerre mondiale]] | date={{Date|21|février|1916}}  – {{Date|19|décembre|1916}} (9 mois, 3 semaines et 6 jours) | lieu=[[Verdun (Meuse)|Verdun]]"],
	["Bataille_de_Dyrrachium_(48_av._J.-C.)", "av JC, mois, jour", "| guerre=[[Guerre civile de César]]| date=[[10 juillet]] [[-48|48 {{av JC}}]]| lieu=[[Durrës|Dyrrachium]] (de nos jours [[Durrës]], [[Albanie]])"],
	["Siège_d'Alésia", "av JC", "| légende      = ''[[Vercingétorix]] jette ses armes aux pieds de [[Jules César|César]]'' (tableau de [[Lionel Royer]], [[1899]]) | date         = [[52 av. J.-C.]] | lieu         = [[Historiographie du débat sur la localisation d'Alésia|Alésia]]"],
	["Bataille_de_Ctésiphon_(363)", "ap JC", "|guerre=[[Guerres perso-romaines]]|date=[[363|363 ap. J.-C.]]|lieu=[[Ctesiphon]], [[Mesopotamie]]"],
	["Bataille_d%27Aricie", "siècle en chiffre romain", "| l\u00e9gende      = \n | date         = fin du {{VIe si\u00e8cle av. J.-C.}}\n | lieu         = [[Ariccia|Aricie]] ([[Latium]]), pr\u00e8s de Rome\n "],
	["Bataille_d%27Hulluch", "du X au Y mois année", "| guerre = [[Première Guerre mondiale]] date = du [[27 avril|27]] au {{date|29|avril|1916}} | lieu = [[Hulluch]], [[France]]"],
	["Bataille_de_Messines_(1914)", "X mois1 - Y mois2 année", "|guerre = [[Première Guerre mondiale]] |date = [[12 octobre]] - {{date|2|novembre|1914}} |lieu = [[Messines]] ([[Belgique]]) "],



];

// Code à ajouter au window.onload :
	$.each(pages, function (i, elm) {
		tps = [{'*':''}];
		tps[0]['*'] = elm[2];
		elm.push(getDate(tps));
		console.log(elm[3]);
	});

*/