// gradient 



function draw_colormap (topnode) {

console.log('draw_colormap');
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
var gradcenter=topnode.getAttribute('gradient_center');
var gradsteps=topnode.getAttribute('gradient_steps');
var transform=topnode.getAttribute('transform');
var transform=topnode.getAttribute('transform');
var bimodal=topnode.getAttribute('gradient_bimodal')=='true';
var colormap=topnode.colormap;
var colormap2=topnode.colormap2;
console.log('draw_colormap, gradmin/gradmax:',gradmin, gradmax);

//chart = d3.select("#svg_"+topnode);
// $('.colormap').remove(); oude element verwijderen.
var barlength=200;    // FIXME: getAttribute !

  if (transform=='linear') {
	var colorScale=d3.scale.linear();
  }  
  if (transform=='log10') {  	
  	var colorScale=d3.scale.log();
    if (gradmin==0)  {      //bandaid
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
 
  //console.log('100::::',colorScale(gradmax))
  //console.log('50::::',)
  //console.log('0::::',colorScale(gradmin))

  min_px=colorScale(gradmin);
  max_px=colorScale(gradmax);
  if (bimodal) {
    var center_px=colorScale(gradcenter);
    var barlength=center_px-max_px;
  } else {
    var barlength=min_px-max_px;
  }
  if (barlength<0) barlength=-barlength;

var barstep=(barlength)/gradsteps;

console.log('::::::',min_px,center_px, max_px, barlength, barstep);

console.log('draw_colormap, barlength/barstep:',barlength, barstep);
chart.append("rect")  
  .attr("class","colormap")
  .attr("x",75)
  .attr("y",25+10)
  .attr("width",20)
  .attr("height",min_px-max_px)
  .style("fill","none")
  .style("stroke","black")
  .style("stroke-width","1px");

 console.log(colormap);
 for (i=1; i<=gradsteps; i++) {
  color=colormap[i-1];
  //console.log('yy:',i,barlength-barstep*i-1, color);
  chart.append("svg:rect")
    .attr("class","colormap")
    .attr("x",76)
    .attr("y",25+10+barlength-barstep*i-1)
    .attr("width",18)
    .attr("height",barstep)
    .style("fill","rgb("+color[0]+","+color[1]+","+color[2]+")")
    .style("stroke","rgb("+color[0]+","+color[1]+","+color[2]+")")
    .style("stroke-width","1px");
 }


 if (bimodal) {

  var barlength=min_px-center_px;
  var barstep=(barlength)/gradsteps;
  if (barlength<0) barlength=-barlength;

  for (i=1; i<=gradsteps; i++) {
    color=colormap2[i-1];
    //console.log('zz:',i,min_px-barstep*i-1, color);
    chart.append("svg:rect")
        .attr("class","colormap")
        .attr("x",76)
        .attr("y",25+10+min_px-barstep*i-1)
        .attr("width",18)
        .attr("height",barstep)
        .style("fill","rgb("+color[0]+","+color[1]+","+color[2]+")")
        .style("stroke","rgb("+color[0]+","+color[1]+","+color[2]+")")
        .style("stroke-width","1px");
     }
 }




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
            'blue_white':colormap_bluewhite,
            'blue_black':colormap_blueblack,
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

var default_bimodal_colormaps={              
            'blue-white-red':[colormap_blue, colormap_red],
            'blue-white-blue':[colormap_blue, colormap_blue],                      
              };


  var defaults={ width: 150,
              height: 300,
              xpixels: 500,
              ypixels: 500,
              show_size: 'true',
              gradient_min: 0,
              gradient_max: 100,
              gradient_center: 50,
              gradient_steps: 20,
              transform: 'linear',
              colormaps: default_colormaps ,
              bimodal_colormaps: default_bimodal_colormaps ,
              gradient_invert: 'false',
              gradient_bimodal: 'true',
              controltype:'flat' 
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
  

  topnode.size=1;  

  if (!('postAttributeChangedCallback' in topnode)) {
    topnode.postAttributeChangedCallback=null;
  }
  if (!('preAttributeChangedCallback' in topnode)) {
    topnode.preattributeChangedCallback=null;
  }

  var bimodal=topnode.getAttribute('gradient_bimodal')=='true';
  var colormaps=defaults.colormaps;
  colormapnames=[];
  for (var colormapname in colormaps) {
      if (colormaps.hasOwnProperty(colormapname)) {
          colormapnames.push(colormapname);
      }
  }  
  var bimodal_colormaps=defaults.bimodal_colormaps;
  bimodal_colormapnames=[];
  for (var colormapname in bimodal_colormaps) {
      if (bimodal_colormaps.hasOwnProperty(colormapname)) {
          bimodal_colormapnames.push(colormapname);
      }
  }  

  if (bimodal) {
    var colormaps=defaults.bimodal_colormaps;
  } else {
    var colormaps=defaults.colormaps;
  }



  if (!('colormaps' in topnode)) {    
      topnode.colormaps=colormaps;      
  }  


  topnode.colormapnames=colormapnames;
  topnode.bimodal_colormapnames=bimodal_colormapnames;
  if (!topnode.hasAttribute('colormapname')) {
      topnode.setAttribute('colormapname',colormapnames[0]);
  }  

  update_colormaps(topnode);
  

  //console.log('calc_colormap:',colormap);
  topnode.need_data_recalc=true;
  if (controlnode.hasAttribute('controltype')==false) {
    controlnode.setAttribute('controltype',defaults.controltype)
  }
  init_controls(controlnode, topnode);
  draw_colormap(topnode);
}


var init_gradients=function init__gradients () {
    
  
      $('.colormap-gradient').each(init_colormap); 
      console.log('init done');
  };
