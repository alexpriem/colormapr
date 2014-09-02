
var enter_selectie=function enter_selectie (evt) {
	$(this).addClass('hover_selectie');
}
var leave_selectie=function enter_selectie (evt) {
	$(this).removeClass('hover_selectie');
}


var click_size=function click_size (evt) {
	size=parseInt($(this).attr('data-size'));
	$('.sizename ').removeClass('active_selectie');
	$(this).addClass('active_selectie');	
	draw_heatmap();
	return false;
}


function init_sizes() {

	var html='<li class="sel_heading"> Sizes:</li>';
		

	html+='<li class="sizename" data-size="1">'+xpixels+"x"+ypixels+'</li>';
	sizetable=[2,5,10,20,50,100,200,500,1000,2000,5000];
	j=0;
	size=sizetable[0];
	while ((xpixels/size>9) && (ypixels/size)>9) {		
		html+='<li class="sizename" data-size="'+size+'">'+Math.floor(xpixels/size)+"x"+Math.floor(ypixels/size)+'</li>';
		j++;
		size=sizetable[j];		
	}
	size=1;
	$('#sel_size').html(html);

   $('.sizename').slice(0,1).addClass('active_selectie');	
   $('.sizename').on('click',click_size);
   $('.sizename').on('mouseenter ',enter_selectie);
   $('.sizename').on('mouseout ',leave_selectie);
 // console.log("initsize");
}



var click_transform=function click_size (evt) {

	transform=$(this).attr('data-transform');
	$('.transformname ').removeClass('active_selectie');
	$(this).addClass('active_selectie');

/*	tgradmax=gradmax;
	tgradmin=gradmin;
*/	
	console.log("click_transform:", transform,tgradmin, tgradmax);				
	draw_heatmap();
	return false;
}



function init_gradient_transforms() {
 	$('.transformname').on('click',click_transform);
 	$('.transformname').on('mouseenter ',enter_selectie);
  	$('.transformname').on('mouseout ',leave_selectie);
  	$('#trans_'+transform).addClass('active_selectie');	  	
  	tgradmax=gradmax;
  	tgradmin=gradmin;
}



function click_data_transform () {

	var id=$(this).attr('id');
	if (id=='inv_grad') {inv_grad=1-inv_grad;	var state=inv_grad;}

	if (state) {
		$(this).addClass('active_selectie');
	} else {
		$(this).removeClass('active_selectie');
	}
	draw_heatmap();
}


function init_data_transforms() {
 	$('.swapname').on('click',click_data_transform);
 	$('.swapname').on('mouseenter ',enter_selectie);
  	$('.swapname').on('mouseout ',leave_selectie);  	
}









// gradient 


function draw_colormap () {

console.log("draw_colormap", colormaplength);


$('.colormap').remove();
var barlength=imgheight/3;
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
