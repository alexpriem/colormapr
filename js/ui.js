

function init_controls (node, gradientnode) {

    console.log('created:', node.id);

    colormaps=[];
    var colormapnames=gradientnode.colormapnames;
    for (i=0; i<colormapnames.length; i++){
        colormaps.push({name:colormapnames[i], widget_id:node.id});
    }
    var source   = $("#entry-template").html();        
    var template = Handlebars.compile(source); 
    var data = {
         widget_id : node.id,
         min: gradientnode.getAttribute('gradient_min'),
         max: gradientnode.getAttribute('gradient_max'),
         steps: gradientnode.getAttribute('gradient_steps'),
         transform: gradientnode.getAttribute('transform'),
         colormaps: colormaps                     
       };
    node.innerHTML =template(data);

    var transform='linear';

    console.log('gradient:', node.getAttribute('gradient'));
    init_gradient_transforms(node.id, gradientnode.getAttribute('transform'));                            
    init_colormaps(node.id, gradientnode.getAttribute('colormapname'));
    init_colormap_inputs(node.id);
}



    var init_page=function expand () {
        
        var ColorMapControlsPrototype = Object.create(HTMLElement.prototype);
        ColorMapControlsPrototype.createdCallback = function() {     
        };

        var ColorMapGradientPrototype = Object.create(HTMLElement.prototype);
        ColorMapGradientPrototype.createdCallback = function() {            
            init_colormap (this);
        }
        var ColorMapGradient = document.registerElement('colormap-gradient', {prototype: ColorMapGradientPrototype}); 
        var ColorMapControls = document.registerElement('colormap-controls', {prototype: ColorMapControlsPrototype}); 

        console.log('init done');

    }

    

    $(init_page);

