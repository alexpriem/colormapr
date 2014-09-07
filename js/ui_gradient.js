// gradient 


function draw_colormap () {

console.log("draw_colormap");

chart = d3.select("#heatmap_svg");
$('.colormap').remove();
var barlength=200;
var barstep=(barlength/gradsteps);
console.log(barlength, barstep);
chart.append("rect")
	.attr("class","colormap")
	.attr("x",imgwidth+75)
	.attr("y",25+10)
	.attr("width",20)
	.attr("height",barlength)
	.style("fill","none")
	.style("stroke","black")
	.style("stroke-width","1px");
  
 for (i=1; i<=gradsteps; i++) {
 	color=colormap[i-1];
	chart.append("rect")
		.attr("class","colormap")
		.attr("x",imgwidth+76)
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
  }
  if (transform=='log2') {
  	var colorScale=d3.scale.log().base(2);
  }
  if (transform=='sqrt') {
  	var colorScale=d3.scale.pow().exponent(0.5);
  }

  console.log('Colorscale, datadomain',datamin, datamax);
  console.log('Colorscale, domain',tgradmin, tgradmax);
  colorScale.domain([tgradmax, tgradmin]);
  colorScale.range([0,barlength]); 
  colorScale.ticks(8);

  var colorAxis=d3.svg.axis();  
  colorAxis.scale(colorScale)       
       .orient("right");

  scalepos=imgwidth+95;
  chart.append("g")
        .attr("class","yaxis colormap")
        .attr("transform","translate("+scalepos+",35)")
        .call(colorAxis);        
 
}