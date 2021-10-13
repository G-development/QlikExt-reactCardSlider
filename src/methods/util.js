/**
 * @param {*} label label name
 * @param {*} defaultValue default Value
 * @param {*} expression Type of Expression (none, optional, always)
 * @param {*} expressionType (if it is a dimension or a measure)
 * @param {*} component component type (expression, textarea)
 * @param {*} show function that enables the component
 * @returns 
 */
export function cpString(ref, label, defaultValue = "", expression = "", expressionType, component, show) {
    var newString = {
        ref: ref,
        label: label,
        type: "string",
        defaultValue: defaultValue,
        expression: expression
    }
    if (expressionType) { newString.expressionType = expressionType }
    if (component) { newString.component = component }
    if (show) { newString.show = show }
    return newString;
}

export function cpNumber(ref, label, defaultValue = "",type ="integer", expression = "", expressionType, component, show) {
    var newString = {
        ref: ref,
        label: label,
        type: type,
        defaultValue: defaultValue,
        expression: expression
    }
    if (expressionType) { newString.expressionType = expressionType }
    if (component) { newString.component = component }
    if (show) { newString.show = show }
    return newString;
}

export function cpText(label, show) {
    var newString = {
        label: label,
        component: "text",
    }
    if (show) { newString.show = show }
    return newString;
};

export function cpMedia(ref, label, show) {
    var newString = {
        ref: ref,
        label: label,
        layoutRef: ref,
        component: "media",
        type: "string",
    }
    if (show) { newString.show = show }
    return newString;
};
/**
* push componente Slider
*/

export function cpSlider(ref, label, min, max, step, defaultValue, show) {
    var newString = {
        ref: ref,
        label: label,
        min: min,
        max: max,
        step: step,
        component: "slider",
        type: "number",
        defaultValue: defaultValue
    }
    if (show) { newString.show = show }
    return newString;
};

/** 
 * push componente switch
 */
 export function cpSwitch(ref, label, labelTrue, labelFalse, defaultValue = false,show) {
    const newString = {
        ref: ref,
        label: label,
        component: "switch",
        type: "boolean",
        options: [{
            value: true,
            label: labelTrue
        }, {
            value: false,
            label: labelFalse
        }],
        defaultValue: defaultValue       
    }
    if (show) { newString.show = show }
    return newString;
}
/** 
* push componente dropdown Number
*/
export function cpDropDownNumber (ref, label, options, defaultValue = 0) {
        const newString = {
            ref: ref,
            label: label,
            component: "dropdown",
            type: "numeric",
            options: options,
            defaultValue: defaultValue
        }

        return newString;
    }
/** 
* push componente dropdown String
*/

export function cpDropDownString (ref, label, options, defaultValue, show) {
        const newString = {
            ref: ref,
            label: label,
            component: "dropdown",
            type: "string",
            options: options,
        }
        if (defaultValue) { newString.defaultValue = defaultValue }
        if (show) { newString.show = show }
        return newString;
    }
/** 
* push componente Array
*/

 export function cpArray (ref, label, itemTitleRef, addTranslation, items) {
        const newString = {
            type: "array",
            ref: ref,
            label: label,
            itemTitleRef: itemTitleRef,
            allowAdd: true,
            allowRemove: true,
            allowMove: true,
            addTranslation: addTranslation,
            items: items
        }

        return newString;
    }
/** 
* push componente TextArea
*/

 export function cpTextArea (ref, label, defaultValue = "", row = 30, maxlength = 3000) {
        const newString = {
            ref: ref,
            label: label,
            component: "textarea",
            type: "string",
            rows: row,
            maxlength,
            defaultValue: defaultValue
        }

        return newString;
    }
/** 
* push componente About
*/

 export function cpAbout (qExtTit, qExtVer) {
        const newString = {
            label: "About",
            type: "string",
            component: {
                template: '<a href="https://it.nttdata.com/" target="_blanck"><svg width="249" height="120" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="vector-effect: non-scaling-stroke;" stroke="null">  <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->  <g stroke="null">   <title stroke="null">background</title>   <rect stroke="null" fill="#070e27" id="canvas_background" height="122" width="251" y="-1" x="-1"/>   <g style="vector-effect: non-scaling-stroke;" stroke="null" display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">    <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>   </g>  </g>  <g stroke="null">   <title stroke="null">Layer 1</title>   <image stroke="null" xlink:href="data:image/png;base64,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" id="svg_2" height="75.50075" width="156.99994" y="56.50008" x="12.50002"/>   <text font-style="normal" font-weight="bold" stroke="#000" transform="matrix(1.3379949604350607,0,0,1.3275012291488264,-89.30773578650027,-152.96976727684935) " xml:space="preserve" text-anchor="start" font-family="sans-serif" font-size="18" id="svg_8" y="139.49394" x="75.94225" stroke-width="0" fill="#ffffff">{{qExtTit}}</text>   <text stroke="#000" transform="matrix(0.7439698576927185,0,0,0.7805714011192322,5.672667840495706,15.360001921653748) " xml:space="preserve" text-anchor="start" font-family="sans-serif" font-size="14" id="svg_9" y="58.05079" x="10.73781" stroke-width="0" fill="#ffffff">Version: {{qExtVer}}</text>  </g> </svg></a>',
                controller: ["$scope", "$element", function (scope, $element) { scope.qExtTit = qExtTit; scope.qExtVer = qExtVer }]
            }
        }

        return newString;
    }