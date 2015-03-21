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