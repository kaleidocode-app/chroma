if (figma.currentPage.selection.length <= 0) {
    figma.closePlugin('Please select a Rectanle, Ellipse, or Polygon before running this plugin');
}
let ignoredCounter = 0;
let ref = [];
let colors = [];
let selection = figma.currentPage.selection;
selection.forEach(c => {
    ref.push(c);
});
ref.sort(function (a, b) {
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
});
// TODO: turn this into an dropdown option
// ref.reverse()
ref.forEach((layer) => {
    // make sure it's a vector
    if (layer.type === "RECTANGLE" || layer.type === "ELLIPSE" || layer.type === "POLYGON" || layer.type === "VECTOR") {
        if (!layer.fillStyleId) {
            //creating the paint style
            var newStyle = figma.createPaintStyle();
            var hex = findTheHEX(layer.fills[0].color.r, layer.fills[0].color.g, layer.fills[0].color.b);
            //naming the paint style with the layer name
            newStyle.name = layer.name;
            newStyle.description = hex.toUpperCase();
            //assigning the colors
            layer.fills.forEach(item => {
                colors.push({
                    type: item.type,
                    visible: item.visible,
                    blendMode: item.blendMode,
                    color: {
                        r: item.color.r,
                        g: item.color.g,
                        b: item.color.b
                    },
                    opacity: item.opacity
                });
            });
            newStyle.paints = colors;
            //applying the style to the selected layer
            layer.fillStyleId = newStyle.id;
            // console log the output
            console.log('🎉 Created style ' + layer.name);
        }
        else {
            ignoredCounter++;
        }
    }
    else {
        figma.closePlugin('Please select a Rectanle, Ellipse, or Polygon before running this plugin');
    }
});
figma.currentPage.selection = [];
if (ignoredCounter > 0) {
    figma.closePlugin('⚠️ Warning: ' + ignoredCounter + ' color style(s) already exist and can\'t be added');
}
else {
    figma.closePlugin();
}
function findTheHEX(red, green, blue) {
    var redHEX = rgbToHex(red);
    var greenHEX = rgbToHex(green);
    var blueHEX = rgbToHex(blue);
    return redHEX + greenHEX + blueHEX;
}
function rgbToHex(rgb) {
    rgb = Math.floor(rgb * 255);
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}
