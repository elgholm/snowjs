/*
MIT License

Copyright (c) 2020 Charlie Elgholm

snow.js - v0.2b - Written by Charlie Elgholm 2020-12-18 for the Mensa Sweden Secret Santa 2020
Steal it? Sure, but credit me, because karma.
2023-11-22: Added stop()

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


var Snow=new Object();

Snow.opt = {
	autostart: true, // Set to false, and then trigger with Snow.start()
	num: 50, // Number of flakes
	size: [8, 30], // min, max (inclusive), object-size-ratio
	speed: [0.3, .1, 33], // size-ratio speed y, speed x, refresh-rate
	colors: ["#fff", "#eee", "#ddd", "#ccc"],  // Evenly distributed colors
	txt: "&#10052;", // The "character" to show
	style: 'position:absolute; z-index:100; cursor:default; -webkit-user-select:none; -moz-user-select:none; user-select:none;'
};

Snow.resize = function(){
	// don't ask, needs margin/padding 0 to work well just now
	Snow.bottom = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight); 
	Snow.right = document.body.clientWidth;
};

Snow.start = function(){
	Snow.resize();
	Snow.flakes=[];
	Snow.a=0;
	for(var c=0;c<Snow.opt.num;c++){
		var f={
			a: 2*Math.PI*Math.random(),
			size: Snow.opt.size[0]+Math.floor((Snow.opt.size[1]-Snow.opt.size[0]+1)*Math.random()),
			elm: document.createElement('SPAN')
		};
		f.elm.innerHTML=Snow.opt.txt;
		f.elm.setAttribute('style', Snow.opt.style+' top:0; left:'+f.left+'px; font-size:'+f.size+'px; color:'+Snow.opt.colors[c%Snow.opt.colors.length]+';');
		document.body.appendChild(f.elm);
		f.height=f.elm.offsetHeight;
		f.width=f.elm.offsetWidth;
		f.top=Math.floor(Snow.bottom*Math.random()-f.height);
		f.left=f.width+Math.floor(Snow.right*Math.random()-2*f.width);
		Snow.flakes[c]=f;
	}
	Snow.intrvl=setInterval(Snow.move, Snow.opt.speed[2]);
};

Snow.stop = function(){
	clearInterval(Snow.intrvl);
	for(c in Snow.flakes)
		Snow.flakes[c].elm.remove();
	Snow.flakes
	Snow.flakes=[];
};

Snow.move = function(){
	for(var c=0;c<Snow.opt.num;c++){
		var f=Snow.flakes[c];
		f.top+=Snow.opt.speed[0]*f.size;
		f.a+=Snow.opt.speed[1];
		if((f.top+f.height)>=Snow.bottom){ f.top=0; f.left=f.width+Math.floor(Snow.right*Math.random()-2*f.width); }
		if((f.left+2*f.width)>=Snow.right){ f.left=f.width+Math.floor(Snow.right*Math.random()-2*f.width); }
		f.elm.style.top=Math.floor(f.top)+"px";
		f.elm.style.left=Math.floor(f.left+f.width*Math.sin(f.a))+"px";
	}
};
    
window.addEventListener('resize', Snow.resize);
if(Snow.opt.autostart) window.addEventListener('load', Snow.start);
