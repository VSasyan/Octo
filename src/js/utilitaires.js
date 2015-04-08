var html_chargement = '<div class="center"><img src="../../image/load.gif" alt="Chargement en cours..." title="Chargement en cours..."/></div>';

function getMediane(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2) {return values[half];}
    else {return (values[half-1] + values[half]) / 2.0;}
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

function recupererSession() {
	// On demande à getSession.php les paramètres de session
	var data = $.ajax({
		url : '../authentification/getSession.php',
		async : false
	}).responseText;

	var session = JSON.p(data, {});
	return session;
}

// parser JSON fiable :
JSON.p = function (str, def) {
	try {
		var jsonObject = JSON.parse(str);
	} catch(e) {
		var jsonObject = def;
	}
	return jsonObject;
}

// Fonctions $.OO :
$.url = function(name, def){
	var def = def || null;
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {return results[1];} else {return def;}
}