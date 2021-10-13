import {
	cpAbout,
	cpDropDownString,
	cpString,
	cpTextArea,
	cpSwitch
} from './util'

var choseOptions = [{
	value: "cluster",
	label: "Cluster"
}, {
	value: "img",
	label: "Image"
}, {
	value: "linkName",
	label: "Link name"
}, {
	value: "link",
	label: "Link"
}];

var choseWeight = [{
	value: "100",
	label: "Thin"
}, {
	value: "normal",
	label: "Regular"
}, {
	value: "bold",
	label: "Bold"
}, {
	value: "900",
	label: "Bolder"
}];

function createChoseArrows () {
	let r = require.context('../img/', false, /\.(png|jpe?g|svg)$/);
	let images = [];
	r.keys().map((item, index) => { images[index] = item.replace('./', ''); });

	let arr = [];
	arr.push({value: "none", label: "None"}, {value: "custom", label: "Custom"});
	images.map((item, index) => arr.push({value: images[index], label: images[index]}));
	return arr;
}
var choseArrowLeft = createChoseArrows(), choseArrowRight = createChoseArrows();


export default {
	type: "items",
	component: "accordion",
	items: {
		settings: {
			uses: "settings",
		},
		dimensions: {
			uses: "dimensions",
			min: 4,
			max: 4,
			items: {
				type: cpDropDownString("qDef.type", "Dimension type", choseOptions, "cluster"),
			}
		},
		cardGeneral: {
			type: "items",
			label: "General",
			items: {
				cardBackgroundColor: cpString("cardSlider.card.backgroundColor", "Background color", ""),
				cardBorderRadius: cpString("cardSlider.card.borderRadius", "Card border radius", ""),
				cardBorderColor: cpString("cardSlider.card.borderColor", "Card border color", ""),
				cardBorderWidth: cpString("cardSlider.card.borderWidth", "Card border width", ""),
				cardImgBorderRadius: cpString("cardSlider.card.imgBorderRadius", "Image border radius", ""),
				cardMinLinkShowed: cpString("cardSlider.card.minLinkShowed", "Min. link showed", ""),
				minCardPerView: cpString("cardSlider.card.minCardPerView", "Card per view", ""),
				minCardPerView500: cpString("cardSlider.card.minCardPerView500", "Card per view: port <500", ""),
				minCardPerView800: cpString("cardSlider.card.minCardPerView800", "Card per view: port <800", ""),
				minCardPerView1000: cpString("cardSlider.card.minCardPerView1000", "Card per view: port <1000", ""),
				cssTextArea: cpTextArea("cardSlider.card.cssTextArea", "More CSS", "", 7, 1000),
			}
		},
		cardTitle: {
			type: "items",
			label: "Title settings",
			items: {
				cardTitleColor: cpString("cardSlider.title.titleColor", "Title color", ""),
				cardTitleSize: cpString("cardSlider.title.titleSize", "Title font-size", ""),
				cardTitleWeight: cpDropDownString("cardSlider.title.titleWeight", "Title font-weight", choseWeight, "thin"),
				cardTitleFontStyle: cpSwitch("cardSlider.title.titleFontStyle", "Italic", "Yes", "No", "No"),
			}
		},
		cardLink: {
			type: "items",
			label: "Links settings",
			items: {
				cardLinkColor: cpString("cardSlider.link.linkColor", "Link color", ""),
				cardLinkSize: cpString("cardSlider.link.linkSize", "Link font-size", ""),
				cardLinkWeight: cpDropDownString("cardSlider.link.linkWeight", "Link font-weight", choseWeight, "normal"),
				cardLinkFontStyle: cpSwitch("cardSlider.link.linkFontStyle", "Italic", "Yes", "No", "No"),
				cardLinkMargin: cpString("cardSlider.link.linkMargin", "Link margin", ""),
				cardLinkArrowColor: cpString("cardSlider.link.linkArrowColor", "Link arrow color", "", ""),
				cardLinkShowmoreColor: cpString("cardSlider.link.linkShowmoreColor", "'Show more' color", "", "")
			}
		},
		arrowsConfig: {
			type: "items",
			label: "Arrow settings",
			items: {
				arrLeft: cpDropDownString("cardSlider.arrow.arrowLeftImg", "Left arrow img", choseArrowLeft, 'none'),
				arrLeftCustom: cpString("cardSlider.arrow.arrowLeftCustom", "Arrow left custom", "", 'optional', null, null,
					function (data) { return data.cardSlider.arrow.arrowLeftImg == 'custom'; }),
				arrRight: cpDropDownString("cardSlider.arrow.arrowRightImg", "Right arrow img", choseArrowRight, 'none'),
				arrRightCustom: cpString("cardSlider.arrow.arrowRightCustom", "Arrow right custom", "", 'optional', null, null,
					function (data) { return data.cardSlider.arrow.arrowRightImg == 'custom'; }),
				arrowMaxWidth: cpString("cardSlider.arrow.arrowMaxWidth", "Custom max-width", "20px", 'optional', null, null, function (data) {return data.cardSlider.arrow.arrowLeftImg != 'none' && data.cardSlider.arrow.arrowRightImg != 'none';}),
				arrowDistanceLR: cpString("cardSlider.arrow.arrowDistanceLR", "Custom distance left/right", "" , 'optional', null, null, function (data) {return data.cardSlider.arrow.arrowLeftImg != 'none' && data.cardSlider.arrow.arrowRightImg != 'none';}),
				arrowDistanceUp: cpString("cardSlider.arrow.arrowDistanceUp", "Custom distance up", "", 'optional', null, null, function (data) {return data.cardSlider.arrow.arrowLeftImg != 'none' && data.cardSlider.arrow.arrowRightImg != 'none';}),
				bulletActiveColor: cpString("cardSlider.arrow.bulletActiveColor", "Custom bullet color", "", 'optional', null, null, function (data) {return data.cardSlider.arrow.arrowLeftImg != 'none' && data.cardSlider.arrow.arrowRightImg != 'none';}),
			}
		},
		about: cpAbout("cardSlider", "1.0.0"),
	},
}