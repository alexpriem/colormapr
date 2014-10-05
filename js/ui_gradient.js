// gradient 



function draw_colormap (topnode) {

if (!('id' in topnode)) {
  console.error('draw_colormap:gradient element needs id');
}
 if (typeof(topnode.preAttributeChangedCallback)=='function') {
    topnode.preAttributeChangedCallback();
}


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


if (topnode.hasAttribute('gradient_min_data')){
  var gradmin=topnode.getAttribute('gradient_min_data');  
}
else {
  var gradmin=topnode.getAttribute('gradient_min');
}
if (topnode.hasAttribute('gradient_max_data')){  
  var gradmax=topnode.getAttribute('gradient_max_data');
} else {
  var gradmax=topnode.getAttribute('gradient_max');
}
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
    if (typeof(topnode.postAttributeChangedCallback)=='function') {
      topnode.postAttributeChangedCallback();
  }

}



var init_colormap=function init_colormap (i, topnode) {


  console.log('init_colormap'); 
  var default_colormaps={              
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

  var defaults={ width: 150,
              height: 300,
              xpixels: 500,
              ypixels: 500,
              show_size: 'true',
              gradient_min: 0,
              gradient_max: 100,
              gradient_steps: 20,
              transform: 'linear',
              colormaps: default_colormaps ,
              gradient_invert:'false'        
            };

  console.log('init_colormap');
  if (!('id' in topnode)){
    console.error('No id for gradient element');
  }
  
  if (!topnode.hasAttribute('data-controls')) {
    console.error('No controls for gradient element #',topnode.id);
  }
  controlnode=document.getElementById(topnode.getAttribute('data-controls'));


  for (var keyword in defaults) {
      if (defaults.hasOwnProperty(keyword)) {
          if (!topnode.hasAttribute(keyword)){
              //console.log(keyword, defaults[keyword]);
              if (keyword!='colormaps') {
                topnode.setAttribute(keyword, defaults[keyword]);
              }
          }
      }
  }
  

  if (!('postAttributeChangedCallback' in topnode)) {
    topnode.postAttributeChangedCallback=null;
  }
  if (!('preAttributeChangedCallback' in topnode)) {
    topnode.preattributeChangedCallback=null;
  }

  var colormaps=defaults.colormaps;
  colormapnames=[];
  for (var colormapname in colormaps) {
      if (colormaps.hasOwnProperty(colormapname)) {
          colormapnames.push(colormapname);
      }
  }  
  if (!('colormaps' in topnode)) {    
      topnode.colormaps=colormaps;
  }  

  topnode.colormapnames=colormapnames;
  if (!topnode.hasAttribute('colormapname')) {
      topnode.setAttribute('colormapname',colormapnames[0]);
  }
  
  var gradsteps=topnode.getAttribute('gradient_steps');
  var colormapname=topnode.getAttribute('colormapname');
  
  var colormap=colormaps[colormapname](gradsteps);
  topnode.colormap=colormap;

  //console.log('calc_colormap:',colormap);

  init_controls(controlnode, topnode);
  draw_colormap(topnode);
}


var init_gradients=function init__gradients () {
    
  
      $('.colormap-gradient').each(init_colormap); 
      console.log('init done');
  };
