rem cd f:\cbs\uglifyJS2\bin\
rem node f:\cbs\uglifyJS2\bin\uglifyjs F:\cbs\colormapr\js\colormaps.js F:\cbs\colormapr\js\ui_controls.js  F:\cbs\colormapr\js\ui_gradient.js f:\cbs\colormapr\js\template.js -o f:\cbs\colormapr\colormapr.js  
rm -f f:\cbs\colormapr\colormapr.js  
cat  F:\cbs\colormapr\js\colormaps.js F:\cbs\colormapr\js\ui_controls.js  F:\cbs\colormapr\js\ui_gradient.js > f:\cbs\colormapr\colormapr.js  
copy f:\cbs\colormapr\colormapr.js   f:\cbs\heatmapr\lib\colormapr.js