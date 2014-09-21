// gradient 



function draw_colormap (topnode) {

console.log("draw_colormap", topnode, topnode.id);

child=topnode.childNodes[0];
topnode.removeChild(child);
var svg=d3.select('#'+topnode.id).append('svg')


var width=topnode.getAttribute('width');
var height=topnode.getAttribute('height');

svg.attr('width',150);
svg.attr('height',300);
var chart=svg.append('svg:g');

console.log('id:',chart );

svg.attr("id",'g_'+topnode.id);
chart.attr("id",'g_'+topnode.id);


var gradmin=topnode.getAttribute('gradient_min');
var gradmax=topnode.getAttribute('gradient_max');
var gradsteps=topnode.getAttribute('gradient_steps');
var transform=topnode.getAttribute('transform');
var colormap=topnode.colormap;


//chart = d3.select("#svg_"+topnode);
// $('.colormap').remove(); oude element verwijderen.
var barlength=200;
var barstep=(barlength/gradsteps);
console.log(barlength, barstep);
chart.append("rect")  
	.attr("class","colormap")
	.attr("x",75)
	.attr("y",25+10)
	.attr("width",20)
	.attr("height",barlength)
	.style("fill","none")
	.style("stroke","black")
	.style("stroke-width","1px");

//console.log('chartexit:', chart[0][0].innerHTML);

 for (i=1; i<=gradsteps; i++) {
 	color=colormap[i-1];
	chart.append("svg:rect")
		.attr("class","colormap")
		.attr("x",76)
		.attr("y",25+10+barlength-barstep*i-1)
		.attr("width",20)
		.attr("height",barstep)
		.style("fill","rgb("+color[0]+","+color[1]+","+color[2]+")")
		.style("stroke","rgb("+color[0]+","+color[1]+","+color[2]+")")
		.style("stroke-width","1px");

 }



  
  if (transform=='linear') {
	var colorScale=d3.scale.linear();
  }  
  if (transform=='log10') {  	
  	var colorScale=d3.scale.log();
    if (gradmin==0)  {      //bandaid
        gradmin=1;
      }
  }
  if (transform=='log2') {
  	var colorScale=d3.scale.log().base(2);
    if (gradmin==0)  {
        gradmin=1;
      }

  }
  if (transform=='sqrt') {
  	var colorScale=d3.scale.pow().exponent(0.5);
  }

//  console.log('Colorscale, datadomain',datamin, datamax);
  //console.log('Colorscale, domain',tgradmin, tgradmax);
  colorScale.domain([gradmax, gradmin]);
  colorScale.range([0,barlength]); 
  colorScale.ticks(8);

  var colorAxis=d3.svg.axis();  
  colorAxis.scale(colorScale)       
       .orient("right");

  scalepos=95;
  chart.append("g")
        .attr("class","yaxis colormap")
        .attr("transform","translate("+scalepos+",35)")
        .call(colorAxis);        
 
  
 // console.log('chartexit:',chart);
 // console.log('chartexit:',chart[0][0].innerHTML);
 // console.log(topnode.id);
 // topnode.innerHTML =chart[0][0].innerHTML;
}



function init_colormap (topnode) {


  console.log('init_colormap');
  if (!('id' in topnode)){
    console.log('No id for gradient element');
  }
  
  if (!topnode.hasAttribute('controls')) {
    console.log('No controls for gradient element #',topnode.id);
  }
  controlnode=document.getElementById(topnode.getAttribute('controls'));

  if (!topnode.hasAttribute('width')) {
    topnode.setAttribute('width',150);
  }

   if (!topnode.hasAttribute('height')) {
    topnode.setAttribute('height',300);
  }

  if (!topnode.hasAttribute('gradient_min')) {
    topnode.setAttribute('gradient_min',0);
  }

  if (!topnode.hasAttribute('gradient_max')) {
    topnode.setAttribute('gradient_max',100);
  }
  if (!topnode.hasAttribute('gradient_steps')) {
    topnode.setAttribute('gradient_steps',20);
  }

   if (!topnode.hasAttribute('gradient_min')) {
    topnode.setAttribute('gradient_min',0);
  }

   if (!topnode.hasAttribute('transform')) {
    topnode.setAttribute('transform','linear');
  }

  if (!('colormaps' in topnode)) { 
    console.log('insert colormaps');    
    var colormaps={              
            'blue':colormap_blue,
            'blue2':colormap_blue2,
            'green':colormap_green,
            'red':colormap_red, 
            'gray':colormap_gray,
            'terrain':colormap_terrain,
            'coolwarm':colormap_coolwarm,
            'hot':colormap_hot, 
            'hot2':colormap_hot2,   
            'hot3':colormap_hot3,
            'ygb':colormap_ygb,
              };
            console.log(colormaps);
      topnode.colormaps=colormaps;
  }
  colormapnames=[];
  for (var colormapname in colormaps) {
      if (colormaps.hasOwnProperty(colormapname)) {
          colormapnames.push(colormapname);
      }
  }
  console.log('')
  topnode.colormapnames=colormapnames;
  if (!topnode.hasAttribute('colormapname')) {
      topnode.setAttribute('colormapname',colormapnames[0]);
  }


  

  var colormaps=topnode.colormaps;
  var gradsteps=topnode.getAttribute('gradient_steps');
  var colormapname=topnode.getAttribute('colormapname');

  var colormap=colormaps[colormapname](gradsteps);
  topnode.colormap=colormap;
  console.log('calc_colormap:',colormap);

  init_controls(controlnode, topnode);

  topnode.setAttribute('colormap',colormap);

  draw_colormap(topnode);
}


  var init_gradients=function expand () {
      
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
