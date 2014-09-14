// gradient 

//FIXME:init

var maxval=100;  // FIXME: function
var minval=0;


function draw_colormap (topnode) {

console.log("draw_colormap", topnode, topnode.id);

child=topnode.childNodes[0];
topnode.removeChild(child);
var svg=d3.select('#'+topnode.id).append('svg')




svg.attr('width',150);
svg.attr('height',300);
var chart=svg.append('svg:g');

console.log('id:',chart );

svg.attr("id",'g_'+topnode.id);
chart.attr("id",'g_'+topnode.id);


var gradient_min=topnode.getAttribute('gradient_min');
var gradient_max=topnode.getAttribute('gradient_min');
var gradient_steps=topnode.getAttribute('gradient_min');
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



 // console.log(gradmin, gradmax, tgradmin, tgradmax, minval, maxval);
  if (gradmax=='max') {
    tgradmax=maxval;  
  } else {
    tgradmax=gradmax;
  }
  if (gradmax=='min') {
    tgradmin=minval;
  } else {
    tgradmin=gradmin;
  }
  //console.log(gradmin, gradmax, tgradmin, tgradmax, minval, maxval);



  if (transform=='linear') {
	var colorScale=d3.scale.linear();
  }  
  if (transform=='log10') {  	
  	var colorScale=d3.scale.log();
  }
  if (transform=='log2') {
  	var colorScale=d3.scale.log().base(2);
  }
  if (transform=='sqrt') {
  	var colorScale=d3.scale.pow().exponent(0.5);
  }

//  console.log('Colorscale, datadomain',datamin, datamax);
  console.log('Colorscale, domain',tgradmin, tgradmax);
  colorScale.domain([tgradmax, tgradmin]);
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

  if (!topnode.hasAttribute('gradient_min')) {
    topnode.setAttribute('gradient_min',0);
  }

  if (!topnode.hasAttribute('gradient_max')) {
    topnode.setAttribute('gradient_max',100);
  }
  if (!topnode.hasAttribute('gradient_steps')) {
    topnode.setAttribute('gradient_steps',20);
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
  if (!topnode.hasAttribute('colormapname')) {
    topnode.setAttribute('colormapname','blue');
  }

  var colormaps=topnode.colormaps;
  var gradsteps=topnode.getAttribute('gradient_steps');
  var colormapname=topnode.getAttribute('colormapname');
  var colormap=colormaps[colormapname](gradsteps);
  topnode.colormap=colormap;
  console.log('calc_colormap:',colormap);


  topnode.setAttribute('colormap',colormap);

  draw_colormap(topnode);
}