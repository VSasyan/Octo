function conversionArticles(articles) {
	// On recupere le max pour la longueur des articles et le nombre de langues !
	var m_longueur = 0;
	var m_nb_langue = 0;
	$.each(articles, function(i, article) {
		m_longueur = Math.max(m_longueur, article.longueur);
		m_nb_langue = Math.max(m_nb_langue, article.nb_langue);
	});

	// Ok, maintenant on transforme chaque articles en evenement :
	var temps = [];
	var importances = [];
	$.each(articles, function(i, article) {
		temp = articlesEnEvenement(article, m_longueur, m_nb_langue);
		if (!(temp === false)) {
			importances.push(tps.importance);
			temps.push(temp);
		}
	});

	// Puis on applique le style :
	var mediane = getMediane(importances);
	var eves = [];
	$.each(temps, function(i, temp) {eves.push(definirStyle(temp, mediane));});
	//console.log(eves);
	// On retourne eve :
	return eves;
}

function definirStyle(temp, mediane) {
	// Definition du style d'après l'infobox :
	var style = 'defaut';
	var taille = '';
	if (!(typeof(themes.infobox[temp.eve.options.theme.toLowerCase().replace(/ /g, '')]) === 'undefined')) {
		style = themes.infobox[temp.eve.options.theme.toLowerCase().replace(/ /g, '')];
	}
	// Taille de la balise :
	if (temp.importance > mediane) {taille = 'Grand';}

	// Retour :
	var eve = temp.eve;
	eve.options.theme = style+taille;
	return eve;
}

function articlesEnEvenement(article, m_longueur, m_nb_langue) {
	var date = getDate(article);
		
	if (date.defini & (article.lon != 0 & article.lat != 0)) {
		var importance = (Math.min(article.nb_langue, 1)*Math.min(article.longueur, 1))/(1+article.distance_portail*m_nb_langue*m_longueur);

		var tps = {
			eve : {
				"start" : date.start,
				"end" : date.end,
				"point" : {
					"lat" : article.lat,
					"lon" : article.lon
				},
				"title" : article.titre,
				"options" : {
					idp : article.id,
					//trueStart : date.start,
					//trueEnd : date.end,
					"url" : article.url,
					"theme" : article.type_infobox // Pour le moment...
				}
			},
			importance : importance
		};
	} else {var tps = false;}

	return tps;
}

/*
	* Fonction pour transformer les dates.
*/
function getDate(page) {
	// Si l'année de début n'est pas défnie on ajoute pas l'évènement :
	if (page.debut_annee == 10000) {
		return {defini:false};
	}
	
	// Si jour de debut n'est pas défini : on prend 1
	debut_jour = Math.max(1, page.debut_jour);
	// Si mois de debut n'est pas défini : on prend 1
	debut_mois = Math.max(1, page.debut_mois);
	
	// Si jour de debut n'est pas défini : on prend 1
	fin_jour = Math.max(1, page.fin_jour);
	// Si mois de debut n'est pas défini : on prend 1
	fin_mois = Math.max(1, page.fin_mois);

	// C'est bon :
	return {
		defini : true,
		start : zeros(page.debut_annee,4)+'-'+zeros(debut_mois,2)+'-'+zeros(debut_jour,2),
		end : zeros(page.fin_annee,4)+'-'+zeros(fin_mois,2)+'-'+zeros(fin_jour,2)
	}
}

/*
	* Fonction pour écrire un chiffre avec un certain nombre de chiffre minimum
*/
function zeros(nb, nb_zeros) {
	if (nb >= 0) {
		var str = nb + '';
		while (str.length < nb_zeros) {str = '0' + str;}
	} else {
		var str = -nb + '';
		while (str.length < nb_zeros) {str = '0' + str;}
		str = '-' + str;
	}
	return str;
}

/*
	* Fontion pour générer des évènements aléatoires si manque de données
*/
function autoEv(nb, lat, lon, deb, fin) {
	var Ev = [];
	for (i=1; i<=nb; i++) {
		y = rand(deb, fin);
		ev = {
			"start" : zeros(y,4)+'-'+zeros(rand(1,12),2)+'-'+zeros(rand(1,28),2),
			"end" : zeros(y+rand(1,10),4)+'-'+zeros(rand(1,12),2)+'-'+zeros(rand(1,28),2),
			"point" : {"lat": RandR(lat.min, lat.max), "lon":RandR(lon.min, lon.max)},
			"title" : "auto_"+i,
			"options" : {"theme" : themes.shuffle()}
		};
		Ev.push(ev);
	}
	return Ev;
}