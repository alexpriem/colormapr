

function init_controls (node) {

    console.log('created:', node.id);
    var source   = $("#entry-template").html();        
    var template = Handlebars.compile(source); 
    var data = {
         min: 0,
         max: Math.random(),
         steps: 20,
         colormaps: [{name:'red'},{name:'blue'},{name:'green'}]             
       };
    node.innerHTML =template(data);

    var transform='linear';

    init_gradient_transforms();                            

}



    var init_page=function expand () {

        var ColorMapControlsPrototype = Object.create(HTMLElement.prototype);
        ColorMapControlsPrototype.createdCallback = function() {
                            init_controls(this);
        };

        ColorMapControlsPrototype.foo = function() {
        console.log('ColorMapControlsPrototype() called');
        };

        var ColorMapControls = document.registerElement('colormap-controls', {prototype: ColorMapControlsPrototype});

    
        var ColorMapGradientPrototype = Object.create(HTMLElement.prototype);
        ColorMapGradientPrototype.createdCallback = function() {            
            draw_colormap (this);
        }
        var ColorMapGradient = document.registerElement('colormap-gradient', {prototype: ColorMapGradientPrototype});        

        console.log('init done');

    }

    

    $(init_page);

