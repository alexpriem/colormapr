// gradient 

//FIXME:init

var colormapname='blue';
var colormap=colormaps[colormapname](gradsteps);
var gradientnr=0;

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
gradientnr=gradientnr+1;


svg.attr("id",'g'+gradientnr);
chart.attr("id",'g'+gradientnr);


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
//if (gradientnr==2) return;

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
