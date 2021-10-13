import { initialProperties, template, definition, controller, paint, resize } from "./methods"

window.define(['qlik'], function (qlik) {
	return {
		initialProperties,
		template,
		definition,
		controller,
		paint,
		resize,
	}
})