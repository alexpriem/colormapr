rem cd f:\src\uglifyJS2\bin\
rem node \src\uglifyJS2\bin\uglifyjs \src\colormapr\js\colormaps.js \src\colormapr\js\ui_controls.js  F:\src\colormapr\js\ui_gradient.js \src\colormapr\js\template.js -o \src\colormapr\colormapr.js  
rm -f \src\colormapr\colormapr.js  
cat  \src\colormapr\js\colormaps.js \src\colormapr\js\ui_controls.js  \src\colormapr\js\ui_gradient.js > \src\colormapr\colormapr.js  
copy \src\colormapr\colormapr.js   \src\heatmapr\lib\colormapr.js
