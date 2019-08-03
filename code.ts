if (figma.currentPage.selection.length <= 0){
  figma.closePlugin('Please select a Rectanle, Ellipse, or Polygon before running this plugin')
}

let ignoredCounter = 0
let ref = []
let selection = figma.currentPage.selection

selection.forEach(c => {
  ref.push(c)
})
ref.sort((one, two) => (one > two ? -1 : 1));

ref.forEach((layer:any) => {

  
  // make sure it's a vector
  if (layer.type === "RECTANGLE" || layer.type === "ELLIPSE" || layer.type === "POLYGON" || layer.type === "VECTOR") {
    
    if(!layer.fillStyleId){
      
      //creating the paint style
      var newStyle = figma.createPaintStyle()

      //naming the paint style with the layer name
      newStyle.name = layer.name

      //assigning the color
      newStyle.paints = [{
        type: layer.fills[0].type,
        color: {
          r: layer.fills[0].color.r,
          g: layer.fills[0].color.g,
          b: layer.fills[0].color.b
        },
        opacity: layer.fills[0].opacity
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
