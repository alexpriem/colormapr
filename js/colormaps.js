

var colormap_gray=function colormap_gray (N) {	
	var step=256/N;
	var cmap=[];
	var col=0;
	for (var i=0; i<N; i++){
		col+=step;
		intcol=parseInt(col);
		cmap.push([255-intcol,255-intcol,255-intcol]);
	}
  return cmap;
}


var colormap_bluewhite=function colormap_bluewhite (N) {
	var step=256/N;
	var cmap=[];
	var col=256;
	for (var i=0; i<N; i++){
		col-=step;
		intcol=parseInt(col);
		cmap.push([intcol,intcol,255]);
	}
  return cmap;
}



var colormap_contour5=function colormap_contour5 (N) {

	var step=256/5;
	var cmap=[];
	var col=0;
	for (var i=0; i<N; i++) {
		col+=step;
		if (col>256) col=0;
		cmap.push([col,col,col]);
	}
	return cmap;
}

var colormap_contour10=function colormap_contour10 (N) {

	var step=256/10;
	var cmap=[];
	var col=0;
	for (var i=0; i<N; i++) {
		col+=step;
		if (col>256) col=0;
		cmap.push([col,col,col]);
	}
	return cmap;
}



var colormap_terrain=function colormap_terrain (N) {
	
	scale = chroma.scale(['#333399','#0098fe','#00ca69','#ffff99','#805d54','#ffffff']);
	cmap=[];
	frac=1.0/N;
	for (i=0; i<N; i++){
		rgb=scale(i*frac).rgb();
		cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
	}
	return cmap;
}

var colormap_coolwarm=function colormap_coolwarm(N){
    
scale = chroma.scale(['#3A4CC0','white','#B30326']);
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;
}

var colormap_hot=function colormap_hot(N){
    
scale=chroma.scale(['white', 'yellow', 'red', 'black']).correctLightness(true);
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;
}

var colormap_hot2=function colormap_hot2(N){
    
scale=chroma.interpolate.bezier(['white', 'yellow', 'red', 'black']);
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;
}

var colormap_hot3=function colormap_hot3(N){
    
scale=chroma.scale(['white', '#ffce00', '#ffae00', 'black']).correctLightness(true);
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;
}


var colormap_ygb=function colormap_ygb(N){
    
scale=chroma.scale(['yellow', 'green', 'blue']);
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;
}


var colormap_blueblack=function colormap_blueblack (N) {

	// CIElab gradient from http://davidjohnstone.net/pages/lch-lab-colour-gradient-picker
var scale=chroma.scale(['#000000','#121b23','#192f41','#1e4462','#1f5b84','#1c72a8','#128bce']);
var scale=chroma.scale(['#000000','#121e23','#1a3541','#1f4e61','#216983','#1f85a7','#16a2cc']);
var scale=chroma.scale(['#000000','#0b2840','#004c82','#0074ca','#009eff','#00cbff','#00f9ff']);
// dump for debug-purposes
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
//	console.log('%d:%d,%d,%d',i,rgb[0],rgb[1],rgb[2]);
}
return cmap;
}


var colormap_blueblack=function colormap_blueblack2 (N) {
var scale=chroma.scale(['#000000','#121b23','#192f41','#1e4462','#1f5b84','#1c72a8','#128bce']);
// dump for debug-purposes
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
//	console.log('%d:%d,%d,%d',i,rgb[0],rgb[1],rgb[2]);
}
return cmap;
}



/*
			0  0   100
d2ecf7 -- 198, 15, 96.9
		  197  34.7  93.7
		  193  100  80.4
		  200  100  82.0
		  211  100  60.4
		  213  100  38.0 
		  */

var colormap_blue=function colormap_blue(N){

scale=chroma.scale(['white', '#d2ecf7','#9cd7ef','#00a1cd','#008dd1','#004b9a', '#002c61']);

// dump for debug-purposes
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
//	console.log('%d:%d,%d,%d',i,rgb[0],rgb[1],rgb[2]);
}
return cmap;
}

var colormap_red=function colormap_red(N){
    
scale=chroma.scale(['white', '#fee4c7','#fccb8d','#f39200','#ea5906','#e4002c', '#af081f']).correctLightness(true);
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;
}

var colormap_green=function colormap_green(N){
    
scale=chroma.scale(['white', '#ecf2d0','#dae49b','#afcb05','#85bc22','#00a139', '#007f2c']).correctLightness(true);
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;
}





var colormap_qualitative=function colormap_qualitative(N){
/* Set2 Accent  Set1  Set3  Dark2  Paired  Pastel2  Pastel1  */

scale=chroma.scale('Paired');
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;

}


var colormap_qualitative14=function colormap_qualitative14(N){

var Pairedhack14=['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928','#0000ff','#f8f009'];
scale=chroma.scale(Pairedhack14);
cmap=[];
frac=1.0/N;
for (i=0; i<N; i++){
	rgb=scale(i*frac).rgb();
	cmap.push([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
}
return cmap;

}



