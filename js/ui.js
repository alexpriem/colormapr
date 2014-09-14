

function init_controls (node) {

    console.log('created:', node.id);

    var source   = $("#entry-template").html();        
    var template = Handlebars.compile(source); 
    var data = {
         widget_id : node.id,
         min: 0,
         max: Math.random(),
         steps: 20,
         colormaps: [{name:'red', widget_id:node.id},
                     {name:'blue', widget_id:node.id},
                     {name:'green', widget_id:node.id}]             
       };
    node.innerHTML =template(data);

    var transform='linear';

    console.log('gradient:', node.getAttribute('gradient'));
    init_gradient_transforms(node.id);                            
    init_colormaps(node.id);

}



    var init_page=function expand () {

        console.log(colormaps);
        var ColorMapControlsPrototype = Object.create(HTMLElement.prototype);
        ColorMapControlsPrototype.createdCallback = function() {
                            init_controls(this);
        };

        var ColorMapGradientPrototype = Object.create(HTMLElement.prototype);
        ColorMapGradientPrototype.createdCallback = function() {            
            init_colormap (this);
        }
        var ColorMapGradient = document.registerElement('colormap-gradient', {prototype: ColorMapGradientPrototype});        
        
        var ColorMapControls = document.registerElement('colormap-controls', {prototype: ColorMapControlsPrototype});       //order is important
        console.log('init done');

    }

    

    $(init_page);

