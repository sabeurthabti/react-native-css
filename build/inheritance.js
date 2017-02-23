Object.defineProperty(exports,"__esModule",{value:true});exports.numeric=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=











































































































inheritance;var _toCamelCase=require("to-camel-case");var _toCamelCase2=_interopRequireDefault(_toCamelCase);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var textProps=["fontSize","color","lineHeight","fontFamily","fontStyle","fontWeight","textAlign","textDecorationLine","textShadowColor","textShadowOffset","textShadowRadius","textAlignVertical","letterSpacing","textDecorationColor","textDecorationStyle","writingDirection"];var numeric=["font-size","line-height","letter-spacing","text-shadow-radius"],numericProps=numeric.map(_toCamelCase2.default);var defaultRootState={fontSize:14};function expandStyles(styles){var tree={};var _loop=function _loop(selector){selector.split(",").forEach(function(select){var target=tree;select=select.replace(/\s*>\s*/g,">").replace(/\s+/g," ");select.split(" ").forEach(function(part){part.split(">").forEach(function(key,i){target=target[key]||(target[key]={});target._isDirectDescendent=i>0;});});_extends(target,styles[selector]);});};for(var _iterator=Object.keys(styles),_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var selector=_ref;_loop(selector);}return tree;}function getInheritedProperties(state,node,rootState){state=_extends({},state);textProps.forEach(function(prop){if(node&&node[prop]){var value=node[prop];if(numericProps.indexOf(prop)>-1&&typeof value==="string"){var numericValue=parseFloat(value.replace(/[^0-9\.]/g,"")),isRelativeToRoot=value.indexOf("rem")>-1,isRelative=value.indexOf("em")>-1;if(isRelativeToRoot){numericValue*=rootState[prop];}else if(isRelative){numericValue*=state[prop]||0;}node[prop]=~~numericValue;}state[prop]=node[prop];}});return state;}function cleanInherits(inherited,node){var keys=Object.keys(node),clean={};Object.keys(inherited).forEach(function(key){if(keys.indexOf(key)===-1){clean[key]=inherited[key];}});return clean;}function inherit(node,state,rootState){if(!state){rootState=_extends({},defaultRootState,node.root);rootState=state=getInheritedProperties(rootState,node.root,rootState);}var cleanNode={};for(var _iterator2=Object.keys(node),_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref2;if(_isArray2){if(_i2>=_iterator2.length)break;_ref2=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref2=_i2.value;}var key=_ref2;var childNode=node[key];var textPsuedo=key.toLowerCase().indexOf(":text")>-1;key=key.replace(/:text/i,"");if((key.toLowerCase().indexOf("text")===0||textPsuedo)&&typeof childNode==="object"){cleanNode[key+"&inherited"]=cleanInherits(getInheritedProperties(state,childNode,rootState),childNode);cleanNode[key]=childNode;}else if(childNode&&typeof childNode==="object"){cleanNode[key]=inherit(childNode,getInheritedProperties(state,childNode,rootState),rootState);}else if(textProps.indexOf(key)===-1){cleanNode[key]=childNode;}}return cleanNode;}function flatten(tree){var flatObject=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var name=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";var flatStyle={};for(var _iterator3=Object.keys(tree),_isArray3=Array.isArray(_iterator3),_i3=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var _ref3;if(_isArray3){if(_i3>=_iterator3.length)break;_ref3=_iterator3[_i3++];}else{_i3=_iterator3.next();if(_i3.done)break;_ref3=_i3.value;}var key=_ref3;var value=tree[key],isDirectDescendent=value._isDirectDescendent;if(typeof value==="object"){flatten(value,flatObject,name+(isDirectDescendent?">":" ")+key);}else if(key!=="_isDirectDescendent"){flatStyle[key]=value;}}if(Object.keys(flatStyle).length>0){flatObject[name.trim()]=flatStyle;}return flatObject;}function inheritance(styles){
return flatten(inherit(expandStyles(styles)));
}exports.
numeric=numeric;