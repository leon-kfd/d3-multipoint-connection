!function(){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function l(t,n){Object.keys(n).map(function(e){t.setAttribute(e,n[e])})}function t(e){return document.querySelector(e)}var n=new(function(){function t(e){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.movingCircleEl=this.el.querySelector(".fake-point"),this.centerPoint={x:300,y:300},this.index=0,this.R=5,this.lineType="curveCardinal",this.lineTypeControlValue=0,this.lineTypeControlMap={curveBundle:{name:"beta",default:.85},curveCardinal:{name:"tension",default:0},curveCatmullRom:{name:"alpha",default:.5}},this.moveTarget=null,this.isDraging=!1,this.el.addEventListener("mousedown",function(e){var t=e.target;t.dataset.point&&(i.moveTarget=t,l(i.movingCircleEl,{cx:t.getAttribute("cx"),cy:t.getAttribute("cy")}),i.movingCircleEl.classList.remove("hidden"),i.isDraging=!0)}),this.el.addEventListener("mousemove",function(e){var t,n;i.isDraging&&(t=e.offsetX,n=e.offsetY,l(i.movingCircleEl,{cx:t,cy:n}))}),this.el.addEventListener("mouseup",function(e){i.isDraging=!1,i.movingCircleEl.classList.add("hidden");var t=e.offsetX,n=e.offsetY;i.moveTarget&&(l(i.moveTarget,{cx:t,cy:n}),l(i.moveTarget.nextElementSibling,{x:t,y:n+i.R+15}),i.linkPoint()),i.moveTarget=null})}var e,n,i;return e=t,(n=[{key:"setLineType",value:function(e){var t=this;this.lineType=e;var n=Object.keys(this.lineTypeControlMap).find(function(e){return t.lineType.includes(e)});n&&(this.lineTypeControlValue=this.lineTypeControlMap[n].default),this.linkPoint()}},{key:"setLineTypeControlValue",value:function(e){this.lineTypeControlValue=e,this.linkPoint()}},{key:"addRandomPoint",value:function(e){var t=0<arguments.length&&void 0!==e?e:500,n=this.centerPoint.x+(Math.random()-.5)*t,i=this.centerPoint.y+(Math.random()-.5)*t;this.addPoint(n,i)}},{key:"addPoint",value:function(e,t){var n=++this.index,i=document.createElementNS("http://www.w3.org/2000/svg","circle");l(i,{cx:e,cy:t,r:this.R,fill:"#262626",id:"_point".concat(n),class:"point","data-point":n}),this.el.appendChild(i);var o=document.createElementNS("http://www.w3.org/2000/svg","text");l(o,{x:e,y:t+this.R+15,"text-anchor":"middle","font-size":12}),o.textContent=n,this.el.appendChild(o),this.linkPoint()}},{key:"linkPoint",value:function(){var e,t=[];document.querySelectorAll("[data-point]").forEach(function(e){t.push({x:~~e.getAttribute("cx"),y:~~e.getAttribute("cy")})}),t.length<=2||(e=this.getCurrentCurve(),d3.select("#line").datum(t).attr("d",d3.line().x(function(e){return e.x}).y(function(e){return e.y}).curve(e)))}},{key:"getCurrentCurve",value:function(){var t=this,e=Object.keys(this.lineTypeControlMap).find(function(e){return t.lineType.includes(e)});return e?d3[this.lineType][this.lineTypeControlMap[e].name](this.lineTypeControlValue):d3[this.lineType]}}])&&o(e.prototype,n),i&&o(e,i),t}())(t("#main"));function i(){var e=Object.keys(n.lineTypeControlMap).find(function(e){return n.lineType.includes(e)});e?(t("#lineTypeControlWrapper").classList.remove("hidden"),t("#lineTypeControlValue").value=n.lineTypeControlValue,t("#lineTypeControlLabel").innerText=n.lineTypeControlMap[e].name):t("#lineTypeControlWrapper").classList.add("hidden")}n.addPoint(300,150),n.addPoint(150,450),n.addPoint(450,450),i(),t("#add").addEventListener("click",function(){n.addRandomPoint()}),t("#lineType").addEventListener("change",function(e){n.setLineType(e.target.value),i()}),t("#lineTypeControlValue").addEventListener("change",function(e){n.setLineTypeControlValue(e.target.value)})}();
