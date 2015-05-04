function Carte(titre, portail, debut, fin) {
	this.titre = titre;
	this.portail = portail;
	this.para = {
		debut_annee : debut,
		fin_annee : fin
	};
	this.trierSelon = '';
	this.tabArticles = [];
	this.tabEvenements = [];
}

Carte.prototype.recupererArticles = function() {
	var eve = false;
	var url = 'script.php?a=list';
	var data = 'idPortail=' + this.portail.id;
	var tab;
	$.ajax({
        type: "POST",
        async: false,
        url,
        data,
        success : function(data) {
			var info = JSON.parse(data);
			// On passe toutes les dates en integer :
			tab = StrToNumber(info.tabArticles);
		}
	});
	this.tabArticles = tab;
	this.changerTri('debut_annee');
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
	var tab = [];
	para = this.para;
	$.each(this.tabArticles, function(i, article) {
		if (article.debut_annee >= para.debut_annee && article.fin_annee <= para.fin_annee) {
			// l'article doit parler d'un evenement entre les deux dates
			tab.push(article);
		}
	});
	this.tabArticles = tab;
};

Carte.prototype.filtrerArticlesNonCoches = function() {
	var tab = [];
	$.each(this.tabArticles, function (i, article) {
		if ($('#_' + article.id).prop('checked')) {
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

Carte.prototype.afficherArticles = function(id) {
	// On affiche le formulaire de selection d'evenements :
	var HTML = '';
	HTML += '<p>Décocher les événements à supprimer :</p>';
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
	$('#'+id).html(HTML);

	// On ajoute les fonctions associées :
	this.fonctionsArticles(id);
};

Carte.prototype.fonctionsArticles = function (id) {
	var that = this;
	// On ajoute les fonction de tri sur le titre :
	$('#'+id + ' div.title.row div.titre').click(function() {
		that.changerTri('titre');
		that.afficherArticles(id);
	}).addClass('clickable');
	$('#'+id + ' div.title.row div.dates').click(function() {
		that.changerTri('debut_annee');
		that.afficherArticles(id);
	}).addClass('clickable');
	$('#'+id + ' div.title.row div.position').click(function() {
		that.changerTri('lat');
		that.afficherArticles(id);
	}).addClass('clickable');

	// On ajoute les fonctions de validation :
	$('#'+id + ' #validerChangements').click(function() {
		that.filtrerArticlesNonCoches();
		that.afficherArticles(id);
	});
	$('#'+id + ' #choixStyles').click(function() {
		// On convertit tous les articles en evènements :
		that.conversionArticles();
		that.afficherEvenements(id);
	});	
};

Carte.prototype.conversionArticles = function() {
	this.tabEvenements = conversionArticles(this.tabArticles);
}

Carte.prototype.afficherEvenements = function(id) {
	// Choix des themes :
	var HTML_themes = '';
	HTML_themes += '<select>';
	$.each(themes.themes, function (i, theme) {
		HTML_themes += '<option value="' + theme.nom + '">' + theme.nom + '</option>';
	});
	HTML_themes += '</select>';

	// On affiche le formulaire de selection de styles :
	var HTML = '';
	HTML += '<p>Choississez le thèmes des évènements :</p>';
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
			HTML += '<div class="keep"><input type="checkbox" checked="checked" class="checkbox"/></div>';
			HTML += '<div class="titre"><a href="' + eve.options.url + '" title="' + eve.title + '">' + truncString(eve.title, 40) + '</a></div>';
			//HTML += '<div class="dates">' + dateToInput(eve) + '</div>';
			HTML += '<div class="position">(' + Math.round(eve.point.lat) + ',&nbsp;' + Math.round(eve.point.lon) + ')</div>';
			HTML += '<div class="theme">' + HTML_themes + '</div>';
		HTML += '</div>';
	});
	HTML += '</div>';
	HTML += '<button id="validerStyles">Valider les changements</button>';
	HTML += '<button id="razStyles">Annuler les changements</button>';
	HTML += '<button id="voirCarte">Voir la carte</button>';
	$('#'+id).html(HTML);

	// On ajoute les fonctions associées :
	this.fonctionsEvenements(id);
	this.razStyles(id);
}

Carte.prototype.fonctionsEvenements = function(id) {
	var that = this;
	// On ajoute les fonction de tri sur le titre :
	$('#'+id + ' div.title.row div.titre').click(function() {
		that.changerTri('titre');
		that.afficherArticles(id);
		that.fonctionsArticles(id);
	}).addClass('clickable');
	$('#'+id + ' div.title.row div.dates').click(function() {
		that.changerTri('debut_annee');
		that.afficherArticles(id);
		that.fonctionsArticles(id);
	}).addClass('clickable');
	$('#'+id + ' div.title.row div.position').click(function() {
		that.changerTri('lat');
		that.afficherArticles(id);
		that.fonctionsArticles(id);
	}).addClass('clickable');

	// On ajoute les fonctions de validation :
	$('#'+id + ' #validerStyles').click(function() {that.validerStyles(id);});
	$('#'+id + ' #razStyles').click(function() {that.razStyles(id);});
	$('#'+id + ' #voirCarte').click(function() {that.voirCarte();});
}

Carte.prototype.razStyles = function(id) {
	$('#'+id+' select option').prop('selected', false);
	$.each(this.tabEvenements, function (i, eve) {
		$('#'+id+' #_' + eve.options.idp + ' select option[value=' + eve.options.theme + ']').prop('selected', true);
	});
}

Carte.prototype.validerStyles = function(id) {
	// On met à jour les thèmes :
	$.each(this.tabEvenements, function (i, eve) {
		eve.options.theme = $('#'+id+' #_' + eve.options.idp + ' select option:selected').val();
	});
}

Carte.prototype.voirCarte = function() {
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
	});
}