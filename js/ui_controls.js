

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


function init_sizes(widget_id) {
	   
	console.log('init_sizes:', widget_id)
   $('.sizename_'+widget_id).slice(0,1).addClass('active_selectie');	
   $('.sizename_'+widget_id).on('click',click_size);
   $('.sizename_'+widget_id).on('mouseenter ',enter_selectie);
   $('.sizename_'+widget_id).on('mouseout ',leave_selectie);
 }



var click_transform=function click_transform (evt) {

	transform=$(this).attr('data-transform');
	widget_id=$(this).attr('data-widget');
	
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('data-gradient');
	gradient_node=document.getElementById(gradient);	
	gradient_node.setAttribute('transform',transform);	
	console.log('click_transform:', widget_id, gradient_node.id);
	draw_colormap (gradient_node);		
	$('.transformname_'+widget_id).removeClass('active_selectie');
	$(this).addClass('active_selectie');

	return false;
}



function init_gradient_transforms(widget_id, transform) {

 	$('.transformname_'+widget_id).on('click',click_transform);
 	$('.transformname_'+widget_id).on('mouseenter ',enter_selectie);
  	$('.transformname_'+widget_id).on('mouseout ',leave_selectie);
  	$('#trans_'+transform+'_'+widget_id).addClass('active_selectie');	  	
}



function click_data_transform () {

	var id=$(this).attr('id');
	var topnode=document.getElementById(widget_id);
	var gradient=topnode.getAttribute('data-gradient');
	var gradient_node=document.getElementById(gradient);
	

	if (id=='inv_grad') {		
		var gradient_invert=topnode.getAttribute('gradient_invert');
		gradient_invert=1-gradient_invert;
		gradient_node.setAttribute('gradient_invert',gradient_invert);	
		var state=gradient_invert;
	}

	if (state) {
		$(this).addClass('active_selectie');
	} else {
		$(this).removeClass('active_selectie');
	}

	widget_id=$(this).attr('data-widget');	
	draw_colormap (gradient_node);
	return false;
}





var click_colormap=function click_colormap (evt) {

	colormapname=$(this).attr('data-colormap');			
	widget_id=$(this).attr('data-widget');
	console.log('click_colormap',colormapname);
	$('.colormapname_'+widget_id).removeClass('active_selectie');
	$(this).addClass('active_selectie');
	
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('data-gradient');
	gradient_node=document.getElementById(gradient);
	gradient_node.setAttribute('colormapname',colormapname);
	var gradsteps=gradient_node.getAttribute('gradient_steps')
	gradient_node.colormap=gradient_node.colormaps[colormapname](gradsteps);

	
	draw_colormap (gradient_node);

	return false;
}




function init_colormaps(widget_id, colormapname)
{
console.log('init_colormap:',colormapname,'#colormap_'+colormapname+'_'+widget_id);

$('.colormapname_'+widget_id).on('click',click_colormap);
$('.colormapname_'+widget_id).on('mouseenter ',enter_selectie);
$('.colormapname_'+widget_id).on('mouseout ',leave_selectie);

$('#colormap_'+colormapname+'_'+widget_id).addClass('active_selectie');
 
 //colormap=colormaps[colormapname](gradsteps); 
 
}




function update_gradient (e) {

	
	console.log('update_gradient:');
	if (e.keyCode == '13') {
		widget_id=$(this).attr('data-widget');
		gradmax=$('#max_'+widget_id).val();
		gradsteps=$('#steps_'+widget_id).val();
		gradmin=$('#min_'+widget_id).val();
		console.log('update_gradient:',widget_id, gradmin, gradmax, gradsteps);


		topnode=document.getElementById(widget_id);
		gradient=topnode.getAttribute('data-gradient');
		gradient_node=document.getElementById(gradient);	
		var colormapname=gradient_node.getAttribute('colormapname');		
		console.log('map/#',topnode, gradient, gradient_node);
		console.log(gradient_node.colormaps)
		console.log ('map:',colormapname, gradsteps);
		console.log('grad:',gradient_node.colormaps[colormapname]);

		gradient_node.colormap=gradient_node.colormaps[colormapname](gradsteps);
		gradient_node.setAttribute('gradient_min', gradmin);
		gradient_node.setAttribute('gradient_max',gradmax);
		gradient_node.setAttribute('gradient_steps',gradsteps);
		draw_colormap (gradient_node);

	}
}


function init_colormap_inputs(widget_id) {

	console.log('init_inputs');
	$("#min_"+widget_id).on('keydown',update_gradient);
	$("#max_"+widget_id).on('keydown',update_gradient);
	$("#steps_"+widget_id).on('keydown',update_gradient);	
}




function init_controls (node, gradientnode) {

    console.log('created:', node.id);

    colormaps=[];
    var colormapnames=gradientnode.colormapnames;
    for (i=0; i<colormapnames.length; i++){
        colormaps.push({name:colormapnames[i], widget_id:node.id});
    }

	xpixels=gradientnode.getAttribute('xpixels');
	ypixels=gradientnode.getAttribute('ypixels');
	show_size=gradientnode.getAttribute('show_size');
	sizes=[];
	if (show_size=='true') {
		show_size=true;
	} else {
		show_size=false;
	}

	if (show_size) {
		sizetable=[2,5,10,20,50,100,200,500,1000,2000,5000];
		j=0;
		size=sizetable[0];		
		while ((xpixels/size>9) && (ypixels/size)>9) {		
			el={};
			el.size_x_size=Math.floor(xpixels/size)+"x"+Math.floor(ypixels/size);
			el.size=size;
			el.sizenr=j;
			el.widget_id=node.id;
			j++;
			size=sizetable[j];		
			sizes.push(el);
		}
	}

    var source   = $("#entry-template").html();        
    var template = Handlebars.compile(source); 
    var data = {
         widget_id : node.id,
         min: gradientnode.getAttribute('gradient_min'),
         max: gradientnode.getAttribute('gradient_max'),
         steps: gradientnode.getAttribute('gradient_steps'),
         transform: gradientnode.getAttribute('transform'),
         colormaps: colormaps, 
         show_size: show_size,
         sizes: sizes         
       };
    node.innerHTML =template(data);

    console.log('gradient:', node.getAttribute('data-gradient'));
    init_gradient_transforms(node.id, gradientnode.getAttribute('transform'));                            
    init_colormaps(node.id, gradientnode.getAttribute('colormapname'));
    init_colormap_inputs(node.id);
    init_sizes(node.id);
}





