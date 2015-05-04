if (typeof TimeMap != undefined) {
	TimeMap.themes = {
		/** 
		 * Red theme: <span style="background:#FE766A">#FE766A</span>
		 * This is the default.
		 *
		 * @type TimeMapTheme
		 */
		red: new TimeMapTheme(),
		defaut: new TimeMapTheme(),
		defautPetit: new TimeMapTheme(),
		
		defautGrand: new TimeMapTheme({
			icon: GIP + "red-dot.png",
			eventIconImage: "red-circle.png",
			iconSize: [64,64]			
		}),

		blue: new TimeMapTheme({
			icon: GIP + "blue-dot.png",
			color: "#5A7ACF",
			eventIconImage: "blue-circle.png"
		}),

		green: new TimeMapTheme({
			icon: GIP + "green-dot.png",
			color: "#19CF54",
			eventIconImage: "green-circle.png"
		}),

		ltblue: new TimeMapTheme({
			icon: GIP + "ltblue-dot.png",
			color: "#5ACFCF",
			eventIconImage: "ltblue-circle.png"
		}),

		purple: new TimeMapTheme({
			icon: GIP + "purple-dot.png",
			color: "#8E67FD",
			eventIconImage: "purple-circle.png"
		}),

		orange: new TimeMapTheme({
			icon: GIP + "orange-dot.png",
			color: "#FF9900",
			eventIconImage: "orange-circle.png"
		}),

		yellow: new TimeMapTheme({
			icon: GIP + "yellow-dot.png",
			color: "#ECE64A",
			eventIconImage: "yellow-circle.png"
		}),

		pink: new TimeMapTheme({
			icon: GIP + "pink-dot.png",
			color: "#E14E9D",
			eventIconImage: "pink-circle.png"
		}),

		batailleGrand: new TimeMapTheme({
			icon: "../../image/theme/bataille_grand.png",
			color: "#000000",
			eventIconImage: "../../image/theme/bataille_grand.png",
			iconSize: [87,99]
		}),

		bataillePetit: new TimeMapTheme({
			icon: "../../image/theme/bataille_petit.png",
			color: "#000000",
			eventIconImage: "../../image/theme/bataille_petit.png",
			iconSize: [32,36]
		})
	};
}

var themes = ["defautGrand","defautPetit", "bataillePetit","batailleGrand"];//['red','blue','green','ltblue','purple','orange','yellow','pink','bataille_grand','bataille_petit'];