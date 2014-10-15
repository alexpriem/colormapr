

var enter_selectie=function enter_selectie (evt) {
	$(this).addClass('hover_selectie');
}
var leave_selectie=function enter_selectie (evt) {
	$(this).removeClass('hover_selectie');
}


var click_size=function click_size (evt) {

//	console.log('click_size:',evt.type);
	if (evt.type=='click') {
		size=parseInt($(this).attr('data-size'));
		$('.sizename ').removeClass('active_selectie');
		$(this).addClass('active_selectie');	
	} 
	if (evt.type=='change'){
		size=parseInt($(this).val());
	}	

	widget_id=$(this).attr('data-widget');	
//	console.log('click_size:',size, widget_id);

	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('data-gradient');
	gradient_node=document.getElementById(gradient);
	gradient_node.size=size;   	
	if (gradient_node.preAttributeChangedCallback!=null){
		gradient_node.preAttributeChangedCallback();
	}
	if (gradient_node.postAttributeChangedCallback!=null){
		gradient_node.postAttributeChangedCallback();	
	}
}


function init_sizes(widget_id) {
	   
	console.log('init_sizes:', widget_id)
   $('.sizename_'+widget_id).slice(0,1).addClass('active_selectie');	
   $('.sizename_'+widget_id).on('click',click_size);
   $('.sizename_'+widget_id).on('mouseenter ',enter_selectie);
   $('.sizename_'+widget_id).on('mouseout ',leave_selectie);
 }



var click_transform=function click_transform (evt) {

	if (evt.type=='click') {
		var transform=$(this).attr('data-transform');
		$('.transformname_'+widget_id).removeClass('active_selectie');
		$(this).addClass('active_selectie');	
	} 
	if (evt.type=='change'){
		var transform=$(this).val();
	}	
	
	widget_id=$(this).attr('data-widget');
	
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('data-gradient');
	gradient_node=document.getElementById(gradient);	
	gradient_node.setAttribute('transform',transform);		
	gradient_node.need_data_recalc=true;
	console.log('click_transform:', transform, widget_id, gradient_node.id);
	draw_colormap (gradient_node);		

	return false;
}



function init_gradient_transforms(widget_id, transform) {

 	$('.transformname_'+widget_id).on('click',click_transform);
 	$('.transformname_'+widget_id).on('mouseenter ',enter_selectie);
  	$('.transformname_'+widget_id).on('mouseout ',leave_selectie);
  	$('#trans_'+transform+'_'+widget_id).addClass('active_selectie');	  	
}




	

var click_colormap=function click_colormap (evt) {

	if (evt.type=='click') {
		var	colormapname=$(this).attr('data-colormap');			
		$('.colormapname_'+widget_id).removeClass('active_selectie');
		$(this).addClass('active_selectie');	
	} 
	if (evt.type=='change'){
		var colormapname=$(this).val();
	}	

	widget_id=$(this).attr('data-widget');
	console.log('click_colormap',colormapname);	
	
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('data-gradient');
	gradient_node=document.getElementById(gradient);
	gradient_node.setAttribute('colormapname',colormapname);
	var gradsteps=gradient_node.getAttribute('gradient_steps')
	gradient_node.colormap=gradient_node.colormaps[colormapname](gradsteps);
	gradient_node.need_data_recalc=false;
	
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
		gradient_node.need_data_recalc=true;
		draw_colormap (gradient_node);
		console.log('update_gradient done');
	}
}

function update_invert_state (node, gradient_node) {

	if (gradient_node.getAttribute('gradient_invert')=='true') {		
		$(node).addClass('active_selectie');
	} else {		
		$(node).removeClass('active_selectie');				
	}
}


var toggle_invert=function toggle_invert (evt) {

	widget_id=$(this).attr('data-widget');
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('data-gradient');
	gradient_node=document.getElementById(gradient);
	if (gradient_node.getAttribute('gradient_invert')=='true') {
		gradient_node.setAttribute('gradient_invert','false');	
	} else {
		gradient_node.setAttribute('gradient_invert','true');		
	}

	console.log('toggle_invert', gradient_node.getAttribute('gradient_invert'));

	update_invert_state(this,gradient_node);
	gradient_node.need_data_recalc=true;	
	draw_colormap (gradient_node);
}


function update_bimodal_state (node, gradient_node,widget_id) {

	if (gradient_node.getAttribute('gradient_bimodal')=='true') {		
		$('#header_center_'+widget_id).show();
		$(node).addClass('active_selectie');		
	} else {		
		$('#header_center_'+widget_id).hide();
		$(node).removeClass('active_selectie');			
	}
}

var toggle_bimodal=function toggle_bimodal (evt) {

	widget_id=$(this).attr('data-widget');
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('data-gradient');
	gradient_node=document.getElementById(gradient);
	console.log('toggle_bimodal', gradient_node.bimodal);
	if (gradient_node.getAttribute('gradient_bimodal')=='true') {
		gradient_node.setAttribute('gradient_bimodal','false');	
	} else {
		gradient_node.setAttribute('gradient_bimodal','true');
	}

	update_bimodal_state(this, gradient_node,widget_id);
	gradient_node.need_data_recalc=true;
	draw_colormap (gradient_node);
}

function init_colormap_inputs(widget_id, gradient_node) {

	console.log('init_inputs');
	$('#invert_'+widget_id).on('click',toggle_invert);
	$('#bimodal_'+widget_id).on('click',toggle_bimodal);
	$("#min_"+widget_id).on('keydown',update_gradient);
	$("#center_"+widget_id).on('keydown',update_gradient);
	$("#max_"+widget_id).on('keydown',update_gradient);
	$("#steps_"+widget_id).on('keydown',update_gradient);	

	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('data-gradient');
	gradient_node=document.getElementById(gradient);

	var node=$('#bimodal_'+widget_id);
	update_bimodal_state(node,gradient_node,widget_id);
	var node=$('#invert_'+widget_id);
	update_invert_state(node,gradient_node);
}


var colormap_select=function colormap_select (evt) {

 console.log('colormap_select',this.id);
 console.log('colormap_select',$(this).val());
}


function init_controls (node, gradientnode) {

    console.log('init_controls, create:', node.id);

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
		console.log("init_controls, show_size");
		sizetable=[1,2,5,10,20,50,100,200,500,1000,2000,5000];
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

	var controltype=node.getAttribute('controltype');
	console.log('controltype:',controltype);
	if (controltype=='flat') {
    	var source   = $("#entry-template-flat").html();        
    } else {
    	var source   = $("#entry-template").html();        
    }
    var template = Handlebars.compile(source); 
    var data = {
         widget_id : node.id,
         min: gradientnode.getAttribute('gradient_min'),
         center: gradientnode.getAttribute('gradient_center'),
         max: gradientnode.getAttribute('gradient_max'),
         steps: gradientnode.getAttribute('gradient_steps'),
         transform: gradientnode.getAttribute('transform'),
         invert: gradientnode.getAttribute('gradient_invert'),
         bimodal: gradientnode.getAttribute('gradient_bimodal'),
         colormaps: colormaps, 
         show_size: show_size,
         sizes: sizes         
       };
    node.innerHTML =template(data);

    console.log('gradient:', node.getAttribute('data-gradient'));
    if (controltype=='flat') {
    	console.log('doit');
    	$('#colormap_select_'+node.id).change(click_colormap);
    	$('#transform_select_'+node.id).change(click_transform);
    	$('#size_select_'+node.id).change(click_size);
    }
    init_gradient_transforms(node.id, gradientnode.getAttribute('transform'));                            
    init_colormaps(node.id, gradientnode.getAttribute('colormapname'));
    init_colormap_inputs(node.id, gradientnode);
    init_sizes(node.id);
}






