
var transform='linear';
var gradmax='max';
var gradmin=0;
var gradsteps=20;
var colormapname='blue';


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


function init_sizes(widget_id, xpixels, ypixels) {

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
	$('#sel_size_'+widget_id).html(html);

   $('.sizename').slice(0,1).addClass('active_selectie');	
   $('.sizename').on('click',click_size);
   $('.sizename').on('mouseenter ',enter_selectie);
   $('.sizename').on('mouseout ',leave_selectie);
 }



var click_transform=function click_transform (evt) {

	transform=$(this).attr('data-transform');
	$('.transformname ').removeClass('active_selectie');
	$(this).addClass('active_selectie');

/*	tgradmax=gradmax;
	tgradmin=gradmin;
*/	
	widget_id=$(this).attr('data-widget');
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('gradient');
	gradient_node=document.getElementById(gradient);
		
	draw_colormap (gradient_node);		
	return false;
}



function init_gradient_transforms(widget_id) {

 	$('.transformname_'+widget_id).on('click',click_transform);
 	$('.transformname_'+widget_id).on('mouseenter ',enter_selectie);
  	$('.transformname_'+widget_id).on('mouseout ',leave_selectie);
  	$('#trans_'+transform+'_'+widget_id).addClass('active_selectie');	  	
}



function click_data_transform () {

	var id=$(this).attr('id');

	if (id=='inv_grad') {
		inv_grad=1-inv_grad; 
		var state=inv_grad;
	}

	if (state) {
		$(this).addClass('active_selectie');
	} else {
		$(this).removeClass('active_selectie');
	}

	widget_id=$(this).attr('data-widget');
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('gradient');
	gradient_node=document.getElementById(gradient);

	draw_colormap (gradient_node);
	return false;
}



var click_colormap=function click_colormap (evt) {

	colormapname=$(this).attr('data-colormap');			
	widget_id=$(this).attr('data-widget');
	console.log('click_colormap',colormapname,  colormaplength);
	$('.colormapname_'+widget_id).removeClass('active_selectie');
	$(this).addClass('active_selectie');
	
	topnode=document.getElementById(widget_id);
	gradient=topnode.getAttribute('gradient');
	gradient_node=document.getElementById(gradient);
	gradient_node.colormapname=colormapname;
	gradient_node.colormap=gradient_node.colormaps[colormapname](gradsteps);
	
	draw_colormap (gradient_node);
	return false;
}




function init_colormaps(widget_id)
{

$('.colormapname_'+widget_id).on('click',click_colormap);
$('.colormapname_'+widget_id).on('mouseenter ',enter_selectie);
$('.colormapname_'+widget_id).on('mouseout ',leave_selectie);

$('#colormap_'+colormapname+'_'+widget_id).addClass('active_selectie');
 
 colormap=colormaps[colormapname](gradsteps);
 colormaplength=colormap.length-1;
 console.log('init_colormap:',colormapname,colormaplength,gradsteps,'#colormap_'+colormapname+'_'+widget_id);
}

