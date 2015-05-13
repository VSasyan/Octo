/**
	Constructeur de la classe Carte.
	Entrée : id de l'element HHTML qui servira à afficer les informations (peut être vide '')
**/
function Carte(id) {
	this.id = '#'+id;
	this.trierSelon = '';
	this.tabArticles = [];
	this.tabEvenements = [];

	this.titre = '';
	this.description = '';
	this.debut_annee = -9999;
	this.fin_annee = 9999;
	this.echelle_temps_haut = 3;
	this.echelle_temps_bas = 3;
	this.duree = 30;
	this.idC = -1;
	this.animee = false;
	this.pause = {current:0,timePassed:1,duration:0};
}

/**
	Initialisation de la carte d'après une objet.
	Entrée : data : l'objet contenant les informations
**/
Carte.prototype.initialiserCarte = function(data) {
	aCopier = ['titre', 'description', 'debut_annee', 'fin_annee', 'duree', 'echelle_temps_bas', 'echelle_temps_haut', 'tabEvenements', 'tabArticles'];
	var that = this;
	$.each(aCopier, function(i, name) {
		if (data.hasOwnProperty(name)) {that[name] = data[name];}
	});
}

/**
	Vérifie que le portail associé à la carte existe. Si oui crée
	la carte et l'envoi sur le serveur si demandé.
	Entrée : envoyerSurServeur : bool, faut-il envoyer la carte sur le serveur ou non ?
**/
Carte.prototype.verifierPortail = function(envoyerSurServeur) {
	var that = this;
	$('#resultat').html('<p>Vérifications en cours...</p>');
	// On vérifie que le portail est dans la liste :
	var portail = false;
	var nom = $('#portail').val();
	$.each(portails, function(i,elm) {if (elm.nom.toLowerCase() == nom.toLowerCase()) {portail = elm;}});
	if (portail === false) {
		// On charge le message d'erreur :
		$(that.id).html(html_chargement);
		$.ajax({
			url: 'personnaliser/ajax.php?fct=erreur_portail&portail='+encodeURIComponent(nom)
		}).done(function(data) {
			$(that.id).html(data);
			$('#nom').val(nom);
		});
	} else {
		// On crée la carte :
		var dataCarte = {
			debut_annee : parseInt($('#debut_annee').val()),
			fin_annee : parseInt($('#fin_annee').val()),
			titre : $('#titre').val(),
			description : $('#description').val(),
			duree : parseInt($('#duree').val()),
			echelle_temps_bas : parseInt($('#echelle_temps_bas').val()),
			echelle_temps_haut : parseInt($('#echelle_temps_haut').val()),
		};
		that.initialiserCarte(dataCarte);
		if (envoyerSurServeur) {
			if (!carte.ajouterCarteServeur(portail)) {
			$(that.id).html('<p>Impossible d\'ajouter la carte sur le serveur</p>');
			}
		} else {
			that.recupererArticles(portail);
			that.filtrerArticles();
			that.filtrerArticlesDate();
			that.afficherArticles();
		}
	}
}

/**
	Ajoute la carte sur le serveur
	Entrée : portail associé à la carte : portail = {id:id du portail}
**/
Carte.prototype.ajouterCarteServeur = function(portail) {
	$('#resultat').html('<p>Ajout du portail...</p>');
	// verification de la session utilisateur :
	if (!(typeof(session.idU) === 'undefined')) {
		// Creation des données à envoyer :
		var json = {
			idU : session.idU,
			idP : portail.id,
			titre : this.titre,
			description : this.description,
			debut_annee : this.debut_annee,
			echelle_temps_haut : this.echelle_temps_haut,
			echelle_temps_bas : this.echelle_temps_bas,
			fin_annee : this.fin_annee,
			duree : this.duree
		};
		// Initialisation de la requete :
		$(this.ajax).html("<p>Création de la Carte...</p>" + html_chargement);
		var lien = "script.php?c=add";
		var myData = 'json=' + encodeURIComponent(JSON.stringify(json));
		var retour = {valide:false, message:'<p>Retour invalide !</p>'};
		// Requete :
		$.ajax({
			type : 'POST',
			async : false,
			url : lien,
			data : myData,
			success : function(data) {
				retour = JSON.p(data, retour);
			}
		});
		if (retour.valide) {
			// On ouvre la carte, on vire les eve hors emprise historique et on calcul les styles :
			if (this.ouvrirCarteServeur(retour.id)) {
				// on vire les eve hors emprise historique :
				aSuppr = this.filtrerEvenementsDate();
				// On calcul les styles :
				this.calculerThemesAuto();
				// On sauvegarde :
				var r2 = this.sauverSurServeur(aSuppr);
				if (r2) {
					$(this.id).html('<p>Carte n°' + retour.id + ' créée avec succès !</p>');
					$(this.id).append('<p><a href="index.php?page=personnaliser&type=perso&idC='+retour.id+'">Personnaliser la carte</a></p>');
					return true;
				} else {
					$(this.id).html('Carte n°' + retour.id + ' créée, met erreur lors de l\'initialisation.');
					$(this.id).append('<p><a href="index.php?page=personnaliser&type=perso&idC='+retour.id+'">Personnaliser la carte</a></p>');
					return false;
				}
			}
		} else {
			$(this.id).html(retour.message);
			return false;
		}
	} else {
		$(this.id).html('<p>Utilisateur invalide !</p>');
		return false;
	}
}

/**
	Calcul la moyenne de l'importance des évènements associés au portail.
	Entrée : null
	Sotie : la moyenne
**/
Carte.prototype.calculerMoyenne = function() {
	// On additionne toutes les importances :
	var importances = 0;
	$.each(this.tabEvenements, function(i, eve) {importances += Math.max(eve.options.importance);});
	return importances / this.tabEvenements.length;
}

/**
	Associe automatiquement un thème à chaque évènement de la classe d'après leur infobox et leur importance
	Entrée : null
**/
Carte.prototype.calculerThemesAuto = function() {
	var moyenne = this.calculerMoyenne();
	// Definition du style d'après l'infobox :
	var tab = [];
	$.each(this.tabEvenements, function(i, eve) {
		var style = 'defaut';
		var taille = '';
		// Type de la balise :
		var infobox = eve.options.infobox.toLowerCase().replace(/ /g, '');
		if (!(typeof(themes.infobox[infobox]) === 'undefined')) {style = themes.infobox[infobox];}
		// Taille de la balise :
		if (eve.options.importance > moyenne) {taille = 'Grand';}
		// On definit le theme :
		eve.options.theme = style+taille;
		tab.push(eve);
		console.log(eve.options.infobox, eve.options.theme);
	});
	this.tabEvenements = tab;
}

/**
	Charge une carte présente sur le serveur d'après son identifiant idC
	Entrée : null
**/
Carte.prototype.ouvrirCarteServeur = function(idC) {
	var that = this;
	// On recupere les cartes existants :
	$('#ajax').html('Chargement de la Carte n°'+idC+'...' + html_chargement);
	var lien = 'script.php?c=get';
	var myData = {idCarte: idC};
	var reponse = [];
	$.ajax({
		type : 'POST',
		async : false,
		url : lien,
		data : myData,
		success : function(data) {
			reponse = JSON.p(data, reponse);
			that.idC = idC;
		}
	});
	this.initialiserCarte(reponse);
	return true;
}

/**
	Recupere les articles associés à un portail sur la BDD puis les ajoute à la Carte.
	Entrée : le portail à récuperer : portail = {id:identifiant du portail}
**/
Carte.prototype.recupererArticles = function(portail) {
	var eve = false;
	var lien = 'script.php?a=list';
	var myData = 'idPortail=' + portail.id;
	var tab;
	$.ajax({
		type: "POST",
		async: false,
		url : lien,
		data : myData,
		success : function(data) {
			var info = JSON.parse(data);
			// On passe toutes les dates en integer :
			tab = StrToNumber(info.tabArticles);
		}
	});
	this.tabArticles = tab;
	this.changerTriArticles('debut_annee');
	$('#ajax.form').html('');
};

/**
	Filtre les articles sans coordonnées ou sans date
	Entrée : null
**/
Carte.prototype.filtrerArticles = function() {
	var tab = [];
	$.each(this.tabArticles, function(i, article) {
		if (article.lat != 0 & article.lon != 0 & article.debut_annee != 10000) {
			// on doit avoir des coordonnées et une date valides
			tab.push(article);
		}
	});
	this.tabArticles = tab;
};

/**
	Filtre les articles qui ne sont pas dans la période spécifiée
	Entrée : null
**/
Carte.prototype.filtrerArticlesDate = function() {
	var that = this;
	var tab = [];
	$.each(this.tabArticles, function(i, article) {
		if (article.debut_annee >= that.debut_annee && article.fin_annee <= that.fin_annee) {
			// l'article doit parler d'un evenement entre les deux dates
			tab.push(article);
		}
	});
	this.tabArticles = tab;
};

/**
	Filtre les articles non cochés dans le formulaire
	Entrée : null
	Sotie : la moyenne
**/
Carte.prototype.filtrerArticlesNonCoches = function() {
	var that = this;
	var tab = [];
	$.each(this.tabArticles, function (i, article) {
		if ($(that.id + ' #_' + article.id).prop('checked')) {
			tab.push(article);
		}
	});
	this.tabArticles = tab;
};

/**
	Change l'ordre des articles de la classe selon le critère passé en paramètre
	Entrée : trierSelon : critère de tri
**/
Carte.prototype.changerTriArticles = function(trierSelon) {
	this.trierSelon = (this.trierSelon == trierSelon ? '-'+trierSelon : trierSelon);
	this.tabArticles.sort(sort_by(this.trierSelon, (this.trierSelon.search(/-/) != -1), false));
}

/**
	Change l'ordre des evènements de la classe selon le critère passé en paramètre
	Entrée : trierSelon : critère de tri
**/
Carte.prototype.changerTriEvenements = function(trierSelon) {
	this.trierSelon = (this.trierSelon == trierSelon ? '-'+trierSelon : trierSelon);
	this.tabEvenements.sort(sort_by(this.trierSelon, (this.trierSelon.search(/-/) != -1), false));
}

/**
	Affiche les articles de la Classe
	Entrée : null
**/
Carte.prototype.afficherArticles = function() {
	// On affiche le formulaire de selection d'evenements :
	var HTML = '';
	HTML += '<h3>Evénements à afficher sur la carte</h3>';
	HTML += '<div class="table">';
	HTML += '<div class="row title">';
		HTML += '<div class="keep"></div>';
		HTML += '<div class="titre">Titre de l\'évènement</div>';
		HTML += '<div class="dates">Date</div>';
		HTML += '<div class="position">Position</div>';
	HTML += '</div>';
	$.each(this.tabArticles, function(i,article) {
		HTML += '<div class="row">';
			HTML += '<div class="keep"><input type="checkbox" checked="checked" class="checkbox" id="_' + article.id + '"/></div>';
			HTML += '<div class="titre"><a href="' + article.url + '" title="' + article.titre + '">' + truncString(article.titre, 40) + '</a></div>';
			HTML += '<div class="dates">' + dateToStr(article) + '</div>';
			HTML += '<div class="position">(' + Math.round(article.lat) + ',&nbsp;' + Math.round(article.lon) + ')</div>';
		HTML += '</div>';
	});
	HTML += '</div>';
	HTML += '<p class="button center">';
	HTML += '<button id="validerChangements">Valider</button>';
	HTML += '<button id="choixStyles">Choisir les Styles</button>';
	HTML += '</p>';
	$(this.id+'.eve').html(HTML);

	// On ajoute les fonctions associées :
	this.fonctionsArticles();
};

/**
	Ajoute les évènements pour les fonctions JS associées au formulaire
	Entrée : null
**/
Carte.prototype.fonctionsArticles = function () {
	var that = this;
	// On ajoute les fonction de tri sur le titre :
	$(this.id+'.eve' + ' div.title.row div.titre').click(function() {
		that.changerTriArticles('titre');
		that.afficherArticles();
	}).addClass('clickable');
	$(this.id+'.eve' + ' div.title.row div.dates').click(function() {
		that.changerTriArticles('debut_annee');
		that.afficherArticles();
	}).addClass('clickable');
	$(this.id+'.eve' + ' div.title.row div.position').click(function() {
		that.changerTriArticles('lat');
		that.afficherArticles();
	}).addClass('clickable');

	// On ajoute les fonctions de validation :
	$(this.id+'.eve' + ' #validerChangements').click(function() {
		that.filtrerArticlesNonCoches();
		that.afficherArticles();
	});
	$(this.id+'.eve' + ' #choixStyles').click(function() {
		// On convertit tous les articles en evènements :
		that.conversionArticles();
		that.afficherEvenements();
	});
};

/**
	Convertit les Articles en Evenements
	Entrée : null
**/
Carte.prototype.conversionArticles = function() {
	this.tabEvenements = conversionArticles(this.tabArticles);
}

/**
	Défini l'échelle temporelle de la classe en fonction des évènements
	Entrée : null
**/
Carte.prototype.definirEchelle = function() {
	var echelle = definirEchelle(this.tabEvenements);
	this.echelle_temps_haut = parseInt(echelle.haut);
	this.echelle_temps_bas = parseInt(echelle.bas);
}

/**
	Affiche le formuaire d'édition des evènements associés à la classe
	Entrée : null
	Sotie : la moyenne
**/
Carte.prototype.afficherEvenements = function() {
	//this.changerTriEvenements('title');
	// Choix des themes :
	var HTML_themes = '';
	HTML_themes += '<select>';
	$.each(themes.themes, function (i, theme) {
		HTML_themes += '<option value="' + theme.nom + '">' + theme.titre + '</option>';
	});
	HTML_themes += '</select>';

	// On affiche le formulaire de selection de styles :
	var HTML = '';
	HTML += '<h3>Choississez le thèmes des évènements</h3>';
	HTML += '<div class="table">';
	HTML += '<div class="row title">';
		HTML += '<div class="keep"></div>';
		HTML += '<div class="titre">Titre de l\'évènement</div>';
		HTML += '<div class="dates">Date</div>';
		HTML += '<div class="position">Position</div>';
		HTML += '<div class="theme">Thème</div>';
	HTML += '</div>';
	$.each(this.tabEvenements, function(i,eve) {
		HTML += '<div class="row" id="_' + eve.options.idp + '">';
			HTML += '<div class="keep"><input type="checkbox" checked="checked" class="checkbox" /></div>';
			HTML += '<div class="titre"><a href="' + eve.options.url + '" title="' + eve.title + '">' + truncString(eve.title, 40) + '</a></div>';
			HTML += '<div class="dates">' + dateEvenementToStr(eve) + '</div>';
			HTML += '<div class="position">(' + Math.round(eve.point.lat) + ',&nbsp;' + Math.round(eve.point.lon) + ')</div>';
			HTML += '<div class="theme">' + HTML_themes + '</div>';
		HTML += '</div>';
	});
	HTML += '</div>';
	HTML += '<p class="button center">';
	HTML += '<button id="razStyles">Annuler</button>';
	HTML += '<button id="validerStyles">Valider</button>';
	HTML += '<button id="voirCarte">Voir la carte</button>';
	HTML += '</p>';
	$(this.id+'.eve').html(HTML);

	// On ajoute les fonctions associées :
	this.afficherFormulaire(false, (this.idC != -1));
	this.fonctionsEvenements();
	this.razStyles();
}

/**
	Ajoute les évènements pour les fonctions JS associées au formulaire
	Entrée : null
**/
Carte.prototype.fonctionsEvenements = function() {
	var that = this;

	// On ajoute les fonctions de validation :
	$(this.id + ' #validerStyles').click(function() {
		that.lireFormulaire();
		aSuppr = that.validerStylesFiltrerEvenementsNonCoches();
		if (that.idC != -1) {
			// La carte est enregistrée, il faut donc la mettre à jour sur le serveur :
			if (that.sauverSurServeur(aSuppr) === true) {
				alert("Votre carte est bien sauvegardée sur le serveur !");
			} else {
				alert(retour.message);
			}
		}
		that.afficherEvenements();
	});
	$(this.id + ' #razStyles').click(function() {that.razStyles();});
	$(this.id + ' #voirCarte').click(function() {that.voirCarte(true);});
}

/**
	Affiche le formulaire sur les informations de la Carte
	Entrée : 
		- changerPortail : bool, peut-on changer le portail (oui si la classe vient d'être créée, non si c'est une édition de carte)
		- envoyerSurServeur : bool, doit-on envoyer la carte créée sur le serveur ?
**/
Carte.prototype.afficherFormulaire = function(changerPortail, envoyerSurServeur) {
	var changerPortail = changerPortail || false;
	var envoyerSurServeur = envoyerSurServeur || false;
	var that = this;

	$.ajax({
		url : 'personnaliser/ajax.php?fct=formulaire_portail'
	}).done(function (data) {
		// Ajout du formulaire :
		$(that.id+'.form').html(data);
		if (changerPortail) {
			// Ajout fonction de listage des portails :
			$('#portail').autocomplete({
				source : portails,
				min : 3
			});
			// Ajout de la fonction d'envoi du formulaire :
			$('#verifierPortail').click(function() {that.verifierPortail(envoyerSurServeur)});
		} else {
			$('p.verifierPortail, p.portail').hide();
			$(that.id+'.form #titre').val(that.titre);
			$(that.id+'.form #description').val(that.description);
			$(that.id+'.form #debut_annee').val(that.debut_annee);
			$(that.id+'.form #fin_annee').val(that.fin_annee);
			$(that.id+'.form #echelle_temps_haut').val(that.echelle_temps_haut);
			$(that.id+'.form #echelle_temps_bas').val(that.echelle_temps_bas);
			$(that.id+'.form #duree').val(that.duree);
		}
		if (!envoyerSurServeur) {
			$(that.id+'.form .titre').hide();
			$(that.id+'.form .description').hide();
		}
	});
}

/**
	Récupère les données entrées dans le formulaire par l'utilisateur et met à jour les attributs de la classe
	Entrée : null
**/
Carte.prototype.lireFormulaire = function() {
	this.titre = $(this.id+'.form #titre').val();
	this.description = $(this.id+'.form #description').val();
	this.debut_annee = $(this.id+'.form #debut_annee').val();
	this.fin_annee = $(this.id+'.form #fin_annee').val();
	this.echelle_temps_haut = $(this.id+'.form #echelle_temps_haut').val();
	this.echelle_temps_bas = $(this.id+'.form #echelle_temps_bas').val();
	this.duree = $(this.id+'.form #duree').val();	
}

/**
	Sauvegarde les modifications apportées à la carte et aux évènements qui lui sont associés
	Entrée : null
**/
Carte.prototype.sauverSurServeur = function(aSuppr) {
	var lien = "script.php?c=maj";
	var myData = {
		carte : {
			titre : this.titre,
			description : this.description,
			debut_annee : this.debut_annee,
			echelle_temps_haut : this.echelle_temps_haut,
			echelle_temps_bas : this.echelle_temps_bas,
			fin_annee : this.fin_annee,
			duree : this.duree,
			idCarte : this.idC
		},
		majEve : {
			tabEvenements : this.tabEvenements,
			aSuppr : aSuppr
		}
	};
	var retour = {valide: false, message: 'Retour invalide...'}
	$.ajax({
		type: "POST",
		async: false,
		url : lien,
		data : {json: JSON.stringify(myData)},
		success : function(data) {
			retour = JSON.p(data, retour);
		}
	});
	return retour.valide;
}

/**
	Remet à zéros les styles des évènements sur le formulaire.
	Entrée : null
**/
Carte.prototype.razStyles = function() {
	var that = this.id;
	$(this.id+'.eve' +' select option').prop('selected', false);
	$.each(this.tabEvenements, function (i, eve) {
		$('#_' + eve.options.idp + ' select option[value=' + eve.options.theme + ']').prop('selected', true);
	});
}

/**
	Filtre les évènements associés à la carte selon la période historique de la carte
	Entrée : null
**/
Carte.prototype.filtrerEvenementsDate = function() {
	var that = this;
	// On met à jour les thèmes :
	var tab = [];
	var aSuppr = [];
	$.each(this.tabEvenements, function (i, eve) {
		if (bonneDate(eve, that.debut_annee, that.fin_annee)) {
			tab.push(eve);
		} else {aSuppr.push(eve.options.ide);}
	});
	this.tabEvenements = tab;
	return aSuppr;	
}

/**
	Met à jour les styles des évènements associés à la carte, et suprime ceux qui ne sont plus cochés
	Entrée : null
**/
Carte.prototype.validerStylesFiltrerEvenementsNonCoches = function(id) {
	var that = this;
	// On met à jour les thèmes :
	var tab = [];
	var aSuppr = this.filtrerEvenementsDate();
	$.each(this.tabEvenements, function (i, eve) {
		var tps = $(that.id + ' #_' + eve.options.idp);
		if (tps.find('input.checkbox').prop('checked')) {
			eve.options.theme = tps.find('select option:selected').val();
			tab.push(eve);
		} else {aSuppr.push(eve.options.ide);}
	});
	this.tabEvenements = tab;
	return aSuppr;
}

/**
	Affiche la carte.
	Entrée : retourPossible : bool, true si l'utilisateur peut revenir à la fentre d'édition de
			 la carte (false quand il est dans le viewer en gros)
**/
Carte.prototype.voirCarte = function(retourPossible) {
	var retourPossible = retourPossible || false;
	var that = this;
	// On charge la carte :
	$('#wrap').html('Chargement de la Carte...' + html_chargement);
	$.ajax({
		url : 'personnaliser/ajax.php?fct=viewer_unregistered'
	}).done(function (data) {
		// Ajout du viewer  :
		$('#wrap').html(data);
		// On agrandit la page :
		var echelle = {
			haut: parseInt(that.echelle_temps_haut),
			bas: parseInt(that.echelle_temps_bas)
		};
		// On affiche la timeline :
		afficherCarte(that.tabEvenements, echelle);
		// On ajoute les fonctions d'animation :
		$('#play').click(function () {that.lancerAnimation();});
		$('#pause').click(function () {that.pauseAnimation();});
		$('#stop').click(function () {that.stopAnimation();});
		// Et la fonction Retour à l'edition :
		console.log(retourPossible)
		if (retourPossible === true) {
			$('#edition').click(function () {
				that.retourEdition();
			});
		} else {
			$('#edition').remove();
		}

	});
}

/**
	Lance l'animation de la carte et de la timeline
	Entrée : null
**/
Carte.prototype.lancerAnimation = function () {
	if (this.animee === false) {
		this.animee = true;
		this.animation = tm.animate(this.duree*1000);
		$('span#animate .fa-play').addClass('fa-stop').removeClass('fa-play');
		if (this.pause.timePassed < this.pause.duration) {
			this.animation.current = this.pause.current;
			this.animation.timePassed = this.pause.timePassed;
		}
		$('#play').hide(); $('#pause').show(); $('#stop').show();
	}
}

/**
	Pause (reprise possible) l'animation de la carte et de la timeline
	Entrée : null
**/
Carte.prototype.pauseAnimation = function() {
	if (this.animee === true) {
		this.pause = {
			current : this.animation.current,
			timePassed : this.animation.timePassed,
			duration : this.animation.duration
		};
		this.animation.to = this.animation.current;
		this.animation.timePassed = this.animation.duration;
		this.animee = false;
		$('#pause').hide(); $('#play').show();
	}
}

/**
	Stop (reprise impossible) l'animation de la carte et de la timeline
	Entrée : null
**/
Carte.prototype.stopAnimation = function() {
	if (this.animee === true) {
		this.animation.to = this.animation.current;
		this.animation.timePassed = this.animation.duration;
		this.animee = false;
		$('#pause').hide(); $('#play').show();
	}
	$('#pause').hide(); $('#play').show(); $('#stop').hide();
	this.pause = {current:0,timePassed:1,duration:0};
}

/**
	Retourne à l'édition de la carte
	Entrée : null
**/
Carte.prototype.retourEdition = function () {
	var that = this;
	$('body').removeClass('tm');
	$('#wrap').html('Chargement de \'interface d\'édition...' + html_chargement);
	$.ajax({
		url : 'personnaliser/ajax.php?fct=unregistered'
	}).done(function (data) {
		// Ajout de l'editeur  :
		$('#wrap').html(data);
		// On affiche les evènements :
		that.afficherEvenements();
	});
}