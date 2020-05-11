if (figma.currentPage.selection.length <= 0){
  figma.closePlugin('Please select a Rectanle, Ellipse, or Polygon before running this plugin')
}

let ignoredCounter = 0
let ref = []
let selection = figma.currentPage.selection

selection.forEach(c => {
  ref.push(c)
})

ref.sort(function (a, b) {
  return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
});
// TODO: turn this into an dropdown option
// ref.reverse()

ref.forEach((layer:any) => {

  // make sure it's a vector
  if (layer.type === "RECTANGLE" || layer.type === "ELLIPSE" || layer.type === "POLYGON" || layer.type === "VECTOR") {
    var fill = layer.fills[0]
    
    if (!fill) {
      // Just skip.
    } else if (!layer.fillStyleId) {
      
      //creating the paint style
      var newStyle = figma.createPaintStyle()
      var hex = findTheHEX(fill.color.r, fill.color.g, fill.color.b)

      //naming the paint style with the layer name
      newStyle.name = layer.name
      newStyle.description = hex.toUpperCase()

      //assigning the color
      newStyle.paints = [{
        type: fill.type,
        color: {
          r: fill.color.r,
          g: fill.color.g,
          b: fill.color.b
        },
        opacity: fill.opacity
      }]

      //applying the style to the selected layer
      layer.fillStyleId = newStyle.id

      // console log the output
      console.log('🎉 Created style ' + layer.name)

    } else {
      ignoredCounter++
    }
    

  } else {
    figma.closePlugin('Please select a Rectanle, Ellipse, or Polygon before running this plugin')
  }
});

figma.currentPage.selection = []

if(ignoredCounter > 0){
  figma.closePlugin('⚠️ Warning: ' + ignoredCounter + ' color style(s) already exist and can\'t be added')
} else {
  figma.closePlugin();
}

function findTheHEX(red:any, green:any, blue:any) {
  var redHEX = rgbToHex(red)
  var greenHEX = rgbToHex(green)
  var blueHEX = rgbToHex(blue)

  return redHEX + greenHEX + blueHEX
}

function rgbToHex(rgb:any) {
  rgb = Math.floor(rgb * 255)
  var hex = Number(rgb).toString(16)
  if (hex.length < 2) {
    hex = '0' + hex
  }
  return hex
}
