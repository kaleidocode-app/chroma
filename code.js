if (figma.currentPage.selection.length <= 0) {
    figma.closePlugin('Please select a Rectanle, Ellipse, or Polygon before running this plugin');
}
let addedCounter = 0;
let ref = [];
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
    // fills
    if (layer.fills.length > 0) {
        let colors = [];
        let newStyle = figma.createPaintStyle();
        if (layer.fills.length == 1) {
            newStyle.description = findTheHEX(layer.fills[0].color.r, layer.fills[0].color.g, layer.fills[0].color.b).toUpperCase();
        }
        newStyle.name = layer.name;
        layer.fills.forEach(item => {
            colors.push(item);
        });
        newStyle.paints = colors;
        layer.fillStyleId = newStyle.id;
        colors.length = 0;
        addedCounter++;
    }
    // strokes
    if (layer.strokes.length > 0) {
        console.log(layer);
        let strokes = [];
        let newStyle = figma.createPaintStyle();
        newStyle.name = layer.name;
        layer.strokes.forEach(item => {
            strokes.push(item);
        });
        newStyle.paints = strokes;
        layer.strokeStyleId = newStyle.id;
        strokes.length = 0;
        addedCounter++;
    }
});
figma.currentPage.selection = [];
figma.closePlugin(`🎉 ${addedCounter} styles added!`);
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
