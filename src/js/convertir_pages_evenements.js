function convertir_pages_evenements(data) {
	/**
		La fonction converti le resultat de la fonction recuperer_article_JSON
		en un tableau d'objet Evenement
		Entrée : tableau d'objet page
		Sortie tableau d'objet evenement :
			Structure :
	**/

	var evenements = [];
	$.each(data, function(i, page) {
		var date = getDate(page);
		
		if (date.defini & (page.lon != 0 & page.lat != 0)) {
			var evenement = {
				start : date.start,
				end : date.end,
				point : {
					lat : page.lat,
					lon : page.lon
				},
				title : page.titre,
				options : {
					idp : page.idp,
					trueStart : date.start,
					trueEnd : date.end,
					theme : themes.shuffle()
				}
			};
			evenements.push(evenement);
		}
	});

	return evenements;
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

Array.prototype.shuffle = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function RandR(min, max) {
  return Math.random() * (max - min) + min;
}