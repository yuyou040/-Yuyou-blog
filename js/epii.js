(function(){var _r_data_tag="r-data",_r_list_tag="r-list",_r_display="r-display",_r_click_function="r-click-function",_r_click_change="r-click-change",_in_it_common="_in_it_common",_r_style="r-style",_r_empty="r-empty",_r_default="r-data-default";var click_change_function=function(e){if(window)window.location.href=e;else{console.log("请使用epii.setClickToChangeFunction设置点击事件")}},enable_r_tag_show=false,$_templateParser=null;function getValueByKeyPath(e,t){if(t==null){return e}var i=0,a=e[t[i++]],r=t.length;while(i<r){if(a===undefined)return null;a=a[t[i++]]}return a}function hasAttribute(e){return typeof this[e]!=="undefined"}function $templateParser(e,t){if(t===undefined||t===null){return undefined}var i="";if(e&&e.indexOf("{")!=-1){i=e.replace(/{(.*?)}/gi,function(){var e=arguments[1].split(".");var i=getValueByKeyPath(t,e);if(i===null){return null}if(i!=undefined){return i}else{if($_templateParser){return $_templateParser(arguments[1],e)}return undefined}})}else{var a=t[e];if(a!=undefined&&a!=null){i=a}else{i=e}}if(i=="null"){return null}if(i=="undefined"){return undefined}return i}function get_epii_mode(group){var out={data:{},view_group:null,root_key_view:{},is_data_set:false,init:function(e){this.view_group=e;var t;for(var i=0;i<e.length;i++){if(e[i].key.indexOf("{")!=-1){var a=e[i].key.match(/{(.*?)}/gi);for(var r=0;r<a.length;r++){a[r]=a[r].substring(1,a[r].length-1);t=e[i].view._keypath.length==0?a[r]:e[i].view._keypath+"."+a[r];if(!this.root_key_view[t])this.root_key_view[t]=[];this.root_key_view[t].push(e[i])}}else{t=e[i].view._keypath.length==0?e[i].key:e[i].view._keypath+"."+e[i].key;if(e[i].type==_r_data_tag||e[i].type==_r_list_tag){if(!this.root_key_view[t])this.root_key_view[t]=[];this.root_key_view[t].push(e[i])}else{if(!this.root_key_view[_in_it_common])this.root_key_view[_in_it_common]=[];this.root_key_view[_in_it_common].push(e[i])}}}return this},setData:function(e){var t=[];if(this.root_key_view[_in_it_common]){t=t.concat(this.root_key_view[_in_it_common])}var i=[{todata:this.data,data:e,keypath:[]}];var a;while(i.length>0){var r=i.shift();for(var n in r.data){if(r.data[n]instanceof Array||!r.data[n]||!(r.data[n]instanceof Object)){r.todata[n]=r.data[n];a=r.keypath.concat(n).join(".");if(this.root_key_view[a])t=t.concat(this.root_key_view[a])}else{r.todata[n]={};i.push({todata:r.todata[n],data:r.data[n],keypath:r.keypath.concat(n)})}}}if(!this.is_data_set){this.renderView(this.view_group,this.data,false);this.is_data_set=true}else this.renderView(t,this.data,false);return this},addData:function(e){var t=[];for(var i in e){if(e[i]instanceof Array){if(!this.data[i])this.data[i]=[];for(var a=0;a<e[i].length;a++){this.data[i].push(e[i][a])}}else{this.data[i]=e[i]}if(this.root_key_view[i])t=t.concat(this.root_key_view[i])}this.renderView(t,e,true);return this},getData:function(){return this.data},getDataValue:function(e){return getValueByKeyPath(this.data,arguments)},renderView:function(e,t,i){var a={};for(var r=0;r<e.length;r++){a=getValueByKeyPath(t,e[r].view["_keypath"].length==0?null:e[r].view["_keypath"].split("."));if(e[r].type==_r_data_tag){this.showValue(e[r].view,e[r].key,a,e[r]["d_v"])}else if(e[r].type==_r_list_tag){if(!i||e[r].view["is_empty"]){while(e[r].view.hasChildNodes()){e[r].view.removeChild(e[r].view.firstChild)}}var n=a[e[r].key];if(n===undefined||n===null||n.length==0){if(!i&&!e[r].view["is_empty"]&&e[r].empty_view){e[r].view.appendChild(e[r].empty_view);e[r].view["is_empty"]=true}return}e[r].view["is_empty"]=false;var l=0;var _=[];if(e[r].template.length>0){for(var s=0;s<e[r].template.length;s++){_.push(e[r].template[s].view.getAttribute(_r_display))}}for(var o=0,u={};o<n.length;o++){if(typeof n[o]!="object"){u={value:n[o]}}else{u=n[o]}for(s=0;s<_.length;s++){rdisplay=_[s];if(rdisplay!==null&&this.getBool(rdisplay,u)){l=s;break}}var f=e[r].template[l].view.cloneNode(true);var d=get_group_from_dom(f);this.renderView(d,u);e[r].view.appendChild(f)}}else if(e[r].type==_r_display){this.displayView(e[r].view,e[r].key,a)}else if(e[r].type==_r_click_function){this.clickFunction(e[r].view,e[r].key,a)}else if(e[r].type==_r_click_change){this.clickChange(e[r].view,e[r].key,a)}else if(e[r].type==_r_style){this.viewStyle(e[r].view,e[r].key,a)}else if(e[r].type=="attr"){this.viewAttr(e[r].view,e[r].key,a,e[r].attr_name)}}},showValue:function(e,t,i,a){var r=$templateParser(t,i);if(r===null){r=""}else if(r===undefined||r=="undefined"){if(a){r=$templateParser(a,i)}if(r===undefined||r=="undefined"){r=""}}var n=e.tagName.toLowerCase();if(n=="input"){e.value=r}else if(n=="img"){e.src=r}else e.innerHTML=r;if(!enable_r_tag_show)e.removeAttribute(_r_data_tag)},displayView:function(view,value,data){var string=$templateParser(value,data);if(string.indexOf("{")==-1){var viewstyle=view.currentStyle?view.currentStyle:document.defaultView.getComputedStyle(view,null);if(eval(string)){if(viewstyle["display"]=="none"){if(view.displayValue){view.style.display=view.displayValue}else view.style.display="block"}}else{if(viewstyle["display"]!="none"){view.displayValue=viewstyle["display"]}view.style.display="none"}}if(!enable_r_tag_show)view.removeAttribute(_r_display)},viewAttr:function(e,t,i,a){var r=$templateParser(t,i);e.setAttribute(a,r)},viewStyle:function(e,t,i){var a=$templateParser(t,i);e.setAttribute("style",a);if(!enable_r_tag_show)e.removeAttribute(_r_style)},clickFunction:function(e,t,i){var a=$templateParser(t,i);var r=a.split("#");var n=r[0];e.onclick=function(){var t=[];for(var a=1;a<r.length;a++){t.push(r[a])}t.push(i);window[n].apply(e,t)};if(!enable_r_tag_show)e.removeAttribute(_r_click_function)},clickChange:function(e,t,i){var a=$templateParser(t,i);e.onclick=function(){if(click_change_function){click_change_function.call(e,a)}};if(!enable_r_tag_show)e.removeAttribute(_r_click_change)},getBool:function(value,data){var string=$templateParser(value,data);if(string.indexOf("{")==-1){if(eval(string)){return true}else{return false}}return true}};return out.init(group)}function get_group_from_dom(e){function t(e,t){i(e,t);var a=t.getAttribute(_r_data_tag);if(a){if(t.childElementCount>0){if(a.indexOf("{")>-1){a=a.substring(1,a.length-1)}t["_keypath"]=t["_keypath"]?t["_keypath"].length==0?a:t["_keypath"]+"."+a:a;return false}else{e.push({type:_r_data_tag,view:t,key:a,d_v:t.getAttribute(_r_default)})}}else{a=t.getAttribute(_r_list_tag);if(a){var r={type:_r_list_tag,view:t,key:a,template:[],empty_view:null};var n=0;for(var l=0;l<t.childNodes.length;l++){if(t.childNodes[l].nodeType===1){if(!t.childNodes[l].hasAttribute){t.childNodes[l].hasAttribute=hasAttribute}if(t.childNodes[l].hasAttribute(_r_empty)){r.empty_view=t.childNodes[l]}else r.template.push({view:t.childNodes[l],group:[]});n++}}while(t.hasChildNodes()){t.removeChild(t.firstChild)}e.push(r);return true}else{}}return false}function i(e,t){key=t.getAttribute(_r_display);if(key){e.push({type:_r_display,view:t,key:key})}key=t.getAttribute(_r_click_function);if(key){e.push({type:_r_click_function,view:t,key:key})}key=t.getAttribute(_r_click_change);if(key){e.push({type:_r_click_change,view:t,key:key})}key=t.getAttribute(_r_style);if(key){e.push({type:_r_style,view:t,key:key})}var i=t.attributes,a,r;for(var n=0;n<i.length;n++){a=i[n].nodeName;if(a.indexOf("r-")!==0){r=i[n].nodeValue;if(r&&r["substring"]&&r.indexOf("{")!==-1){e.push({type:"attr",view:t,key:r,attr_name:a})}}}}e["_keypath"]="";var a=[],r=[{obj:a,root:e}];while(r.length>0){var n=r.shift(),l=n.root;if(t(n.obj,l)){continue}var _=0,s=l.childNodes,o;for(;_<s.length;_++){o=s[_];if(o.nodeType===1){o["_keypath"]=l["_keypath"];r.push({obj:n.obj,root:o})}}}return a}function epii(e){return get_epii_mode(get_group_from_dom(e))}epii.setClickToChangeFunction=function(e){click_change_function=e;return epii};epii.setEnableRtagShow=function(e){enable_r_tag_show=e;return epii};epii.setTemplateParser=function(e){$_templateParser=e;return epii};if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=epii}else if(typeof define==="function"&&(define.amd||define.cmd)){define(function(){return epii})}else{this.epii=epii}}).call(this||(typeof window!=="undefined"?window:global));