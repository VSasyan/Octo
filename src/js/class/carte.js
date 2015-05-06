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
}

Carte.prototype.initialiserCarte = function(data) {
	aCopier = ['titre', 'description', 'debut_annee', 'fin_annee', 'duree', 'echelle_temps_bas', 'echelle_temps_haut', 'tabEvenements', 'tabArticles'];
	var that = this;
	$.each(aCopier, function(i, name) {
		if (data.hasOwnProperty(name)) {that[name] = data[name];}
	});
	console.log(this.titre, this)
}

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
			debut_annee : $('#debut_annee').val(),
			fin_annee : $('#fin_annee').val(),
			titre : $('#titre').val(),
			description : $('#description').val(),
			duree : $('#duree').val(),
			echelle_temps_bas : $('#echelle_temps_bas').val(),
			echelle_temps_haut : $('#echelle_temps_haut').val(),
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
		console.log(json)
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
			this.envoyee = true;
			$(this.id).html('<p>Carte n°' + retour.id + ' créée avec succès !</p>');
			$(this.id).append('<p><a href="index.php?page=personnaliser&type=perso&idC='+retour.id+'">Personnaliser la carte</a></p>');
			return true;
		} else {
			$(this.id).html(retour.message);
			return false;
		}
	} else {
		$(this.id).html('<p>Utilisateur invalide !</p>');
		return false;
	}
}

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
	that.initialiserCarte(reponse);
	return true;
}

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
	this.changerTri('debut_annee');
	$('#ajax.form').html('');
};

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

Carte.prototype.changerTri = function(trierSelon) {
	this.trierSelon = (this.trierSelon == trierSelon ? '-'+trierSelon : trierSelon);
	this.tabArticles.sort(sort_by(this.trierSelon, (this.trierSelon.search(/-/) != -1), false));
	this.tabEvenements.sort(sort_by(this.trierSelon, (this.trierSelon.search(/-/) != -1), false));
}

Carte.prototype.afficherArticles = function() {
	// On agrandit la page :
	$('div#wrap').css({width: "700px"});
	$('article#action').css({width: "700px"});
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
	HTML += '<button id="validerChangements">Valider les changements</button>';
	HTML += '<button id="choixStyles">Choisir les Styles</button>';
	$(this.id+'.eve').html(HTML);

	console.log(this.tabArticles)

	// On ajoute les fonctions associées :
	this.fonctionsArticles();
};

Carte.prototype.fonctionsArticles = function () {
	var that = this;
	// On ajoute les fonction de tri sur le titre :
	$(this.id+'.eve' + ' div.title.row div.titre').click(function() {
		that.changerTri('titre');
		that.afficherArticles();
	}).addClass('clickable');
	$(this.id+'.eve' + ' div.title.row div.dates').click(function() {
		that.changerTri('debut_annee');
		that.afficherArticles();
	}).addClass('clickable');
	$(this.id+'.eve' + ' div.title.row div.position').click(function() {
		that.changerTri('lat');
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

Carte.prototype.conversionArticles = function() {
	this.tabEvenements = conversionArticles(this.tabArticles);
}

Carte.prototype.afficherEvenements = function() {
	// On agrandit la page :
	$('div#wrap').css({width: "700px"});
	$('article#action').css({width: "700px"});

	// Choix des themes :
	var HTML_themes = '';
	HTML_themes += '<select>';
	$.each(themes.themes, function (i, theme) {
		HTML_themes += '<option value="' + theme.nom + '">' + theme.nom + '</option>';
	});
	HTML_themes += '</select>';

	// On affiche le formulaire de selection de styles :
	var HTML = '';
	HTML += '<h3>Choississez le thèmes des évènements</h3>';
	HTML += '<div class="table">';
	HTML += '<div class="row title">';
		HTML += '<div class="keep"></div>';
		HTML += '<div class="titre">Titre de l\'évènement</div>';
		//HTML += '<div class="dates">Date</div>';
		HTML += '<div class="position">Position</div>';
		HTML += '<div class="theme">Thème</div>';
	HTML += '</div>';
	$.each(this.tabEvenements, function(i,eve) {
		HTML += '<div class="row" id="_' + eve.options.idp + '">';
			HTML += '<div class="keep"><input type="checkbox" checked="checked" class="checkbox" /></div>';
			HTML += '<div class="titre"><a href="' + eve.options.url + '" title="' + eve.title + '">' + truncString(eve.title, 40) + '</a></div>';
			//HTML += '<div class="dates">' + dateToInput(eve) + '</div>';
			HTML += '<div class="position">(' + Math.round(eve.point.lat) + ',&nbsp;' + Math.round(eve.point.lon) + ')</div>';
			HTML += '<div class="theme">' + HTML_themes + '</div>';
		HTML += '</div>';
	});
	HTML += '</div>';
	HTML += '<button id="retourArticles" title="Retour au choix des articles">Retour</button>';
	HTML += '<button id="validerStyles">Valider les changements</button>';
	HTML += '<button id="razStyles">Annuler les changements</button>';
	HTML += '<button id="voirCarte">Voir la carte</button>';
	$(this.id+'.eve').html(HTML);

	// On ajoute les fonctions associées :
	this.fonctionsEvenements();
	this.razStyles();
	if (this.idC != -1) {
		// La carte est enregistrée, on affiche aussi le formulaire :
		this.afficherFormulaire(false, true);
	}
}

Carte.prototype.fonctionsEvenements = function() {
	var that = this;
	// On ajoute les fonction de tri sur le titre :
	$(this.id + ' div.title.row div.titre').click(function() {
		that.changerTri('titre');
		that.afficherArticles();
		that.fonctionsArticles();
	}).addClass('clickable');
	$(this.id + ' div.title.row div.dates').click(function() {
		that.changerTri('debut_annee');
		that.afficherArticles();
		that.fonctionsArticles();
	}).addClass('clickable');
	$(this.id + ' div.title.row div.position').click(function() {
		that.changerTri('lat');
		that.afficherArticles();
		that.fonctionsArticles();
	}).addClass('clickable');

	// On ajoute les fonctions de validation :
	$(this.id + ' #retourArticles').click(function() {that.afficherArticles();});
	$(this.id + ' #validerStyles').click(function() {
		aSuppr = that.validerStylesFiltrerEvenementsNonCoches();
		if (that.idC != -1) {
			// La carte est enregistrée, il faut donc la mettre à jour sur le serveur :
			that.sauverSurServeur();
		}
		that.afficherEvenements();
	});
	$(this.id + ' #razStyles').click(function() {that.razStyles();});
	$(this.id + ' #voirCarte').click(function() {that.voirCarte();});
}

Carte.prototype.afficherFormulaire = function(changerPortail, envoyerSurServeur) {
	var changerPortail = changerPortail || false;
	var envoyerSurServeur = envoyerSurServeur || false;
	var that = this;

	$.ajax({
		url : 'personnaliser/ajax.php?fct=formulaire_portail'+(envoyerSurServeur ? '' : '_unregistered')
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
	});
}

Carte.prototype.sauverSurServeur = function() {
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
		data : myData,
		success : function(data) {
			retour = JSON.p(data, retour);
		}
	});
	if (retour.valide === true) {
		alert("Votre carte est bien sauvegardée sur le serveur !");
	} else {
		alert(retour.message);
	}
}

Carte.prototype.razStyles = function(id) {
	var that = this.id;
	$(this.id +' select option').prop('selected', false);
	$.each(this.tabEvenements, function (i, eve) {
		$(that.id +' #_' + eve.options.idp + ' select option[value=' + eve.options.theme + ']').prop('selected', true);
	});
}

Carte.prototype.validerStylesFiltrerEvenementsNonCoches = function(id) {
	var that = this;
	// On met à jour les thèmes :
	var tab = [];
	var aSuppr = [];
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

Carte.prototype.voirCarte = function(id) {
	var that = this;
	// On charge la carte :
	$('#wrap').html('Chargement de la Carte...' + html_chargement);
	$.ajax({
		url : 'personnaliser/ajax.php?fct=viewer_unregistered'
	}).done(function (data) {
		// Ajout du viewer  :
		$('#wrap').html(data);
		// On agrandit la page :
		$('div#wrap').css({width: "100%"});
		$('article#action').css({width: "100%"});
		// On defini l'echelle :
		var echelle = definirEchelle(that.tabEvenements);
		// On affiche la timeline :
		afficherCarte(that.tabEvenements, echelle);
		// On ajoute la fonction d'animation :
		$('#animate').click(function () {
			var duration = parseInt($('#duration').val());
			tm.animate(duration);
		});
		// Et la fonction Retour à l'edition :
		$('#edition').click(function () {
			that.retourEdition(id);
		});

	});
}

Carte.prototype.retourEdition = function (id) {
	var that = this;
	$('#wrap').html('Chargement de \'interface d\'édition...' + html_chargement);
	$.ajax({
		url : 'personnaliser/ajax.php?fct=unregistered'
	}).done(function (data) {
		// Ajout de l'editeur  :
		$('#wrap').html(data);
		// On affiche les evènements :
		that.afficherEvenements(id);
	});
}