/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojvalidation","ojs/internal-deps/dvt/DvtToolkit","ojdnd","promise"],function(a,g,b,c,d){function e(a,b){this.CAa=b;this.ACa=a;this.lsa="/"}a.wk=function(a){this.Init(a)};o_("AttributeGroupHandler",a.wk,a);a.b.sa(a.wk,a.b,"oj.AttributeGroupHandler");a.wk.prototype.Init=function(a){this.nC={};this.QL=0;this.mV={};for(var b in a)this.BX(b,a[b])};a.wk.prototype.Kn=function(){return[]};a.b.g("AttributeGroupHandler.prototype.getValueRamp",{Kn:a.wk.prototype.Kn});
a.wk.prototype.je=function(a){if(this.mV[a])return this.mV[a];this.nC[a]||(this.Tg||(this.Tg=this.Kn().slice()),this.nC[a]=this.Tg[this.QL],this.QL++,this.QL==this.Tg.length&&(this.QL=0));return this.nC[a]};a.b.g("AttributeGroupHandler.prototype.getValue",{je:a.wk.prototype.je});a.wk.prototype.Gfa=function(){var a=[],b;for(b in this.nC)a.push({category:b,value:this.nC[b]});return a};a.b.g("AttributeGroupHandler.prototype.getCategoryAssignments",{Gfa:a.wk.prototype.Gfa});a.wk.prototype.BX=function(a,
b){this.mV[a]=b};a.b.g("AttributeGroupHandler.prototype.addMatchRule",{BX:a.wk.prototype.BX});a.wg=function(b){this.oC=[];if(g(document.body).hasClass("oj-hicontrast"))this.oC=a.wg.A1.slice();else{if(!a.wg.BC){a.wg.BC=[];var c=g(document.createElement("div"));c.attr("style","display:none;");c.attr("id","attrGps");g(document.body).append(c);for(var d=0;d<a.wg.S2.length;d++){var e=g(document.createElement("div"));e.addClass(a.wg.S2[d]);c.append(e);(e=e.css("color"))&&a.wg.BC.push(e)}c.remove()}this.oC=
0<a.wg.BC.length?a.wg.BC.slice():a.wg.A1.slice()}this.Init(b)};o_("ColorAttributeGroupHandler",a.wg,a);a.b.sa(a.wg,a.wk,"oj.ColorAttributeGroupHandler");a.wg.A1="#267db3 #68c182 #fad55c #ed6647 #8561c8 #6ddbdb #ffb54d #e371b2 #47bdef #a2bf39 #a75dba #f7f37b".split(" ");a.wg.S2="oj-dvt-category1 oj-dvt-category2 oj-dvt-category3 oj-dvt-category4 oj-dvt-category5 oj-dvt-category6 oj-dvt-category7 oj-dvt-category8 oj-dvt-category9 oj-dvt-category10 oj-dvt-category11 oj-dvt-category12".split(" ");a.wg.BC=
null;a.wg.prototype.Kn=function(){return this.oC};a.b.g("ColorAttributeGroupHandler.prototype.getValueRamp",{Kn:a.wg.prototype.Kn});e.prototype.qCa=function(a,b,c,d){for(var e={};a&&-1<b.indexOf(c);){var f=b.substring(0,b.indexOf(c));d&&void 0===a[f]&&(a[f]={});a=a[f];b=b.substring(b.indexOf(c)+1,b.length)}a&&(e.object=a,e.parameter=b);return e};e.prototype.bca=function(a){void 0===this.KD&&(a=this.qCa(this.ACa,this.CAa,this.lsa,a),this.KD=a.object,this.zV=a.parameter)};e.prototype.je=function(){this.bca(!1);
return void 0===this.KD?void 0:this.KD[this.zV]};e.prototype.yja=function(a,b){this.bca(!0);if(b||!this.KD[this.zV])this.KD[this.zV]=a};var f={CSS_TEXT_PROPERTIES:function(a){var b={};a&&(a.hasClass("oj-gauge-metric-label")&&a.hasClass(a.parentNode,"oj-ledgauge")?(b["font-size"]=!0,b.color=!0):a.hasClass(a,"oj-chart-slice-label")?b.color=!0:a.hasClass("oj-treemap-node-header")&&(b["font-weight"]=!0));return f.bqa(a,b)},CSS_BACKGROUND_PROPERTIES:function(a){return f.Upa(a)},CSS_URL:function(a){return f.BAa(a)},
S1:"rgb(254, 0, 254)",Fma:"Times",Gma:"1px",U1:"1",T1:"normal",yma:4,uL:{},IGa:function(a,b){return a.css(b)},BAa:function(a){return(a=a.css("background-image"))&&-1!==a.indexOf("url(")?a.slice(a.indexOf("url(")+4,a.length-1).replace(/"/g,""):a},Upa:function(a){var b={};a.css("border-top-color")&&(b["border-color"]=a.css("border-top-color"));a.css("border-width")&&a.css("border-style")&&"none"!=a.css("border-style")&&(b["border-width"]=a.css("border-width"));a.css("background-color")&&(b["background-color"]=
a.css("background-color"));return b},bqa:function(a,b){var c={},d=a.css("font-family");d&&d!==f.Fma&&(c["font-family"]=d.replace(/"/g,"'"));d=a.css("font-size");!d||-1<d.indexOf("px")&&parseFloat(d)<f.yma||b["font-size"]||(c["font-size"]=d);(d=a.css("font-weight"))&&d!==f.U1&&!b["font-weight"]&&(c["font-weight"]=d);(d=a.css("color"))&&d!==f.S1&&!b.color&&(c.color=d);(d=a.css("font-style"))&&d!==f.T1&&(c["font-style"]=d);return c},bKa:function(a,b,c,d){var e=g(document.createElement("div"));e.attr("style",
"display:none;");a.append(e);a="";for(var t=0;t<c.length;t++)a=a+c[t]+" ";e.attr("class",a);g(document.body).append(e);c=g(document.createElement("div"));c.css("font-size",f.Gma);c.css("color",f.S1);c.css("font-weight",f.U1);c.css("font-style",f.T1);e.append(c);for(var s in d)a=d[s],a instanceof Array||(a=[a]),f.YAa(c,b,s,a);e.remove()},YAa:function(a,b,c,d){f.uL[c]||(f.uL[c]={});for(var r=null,t=0;t<d.length;t++){var s=d[t],q=s.property;if(q){var p=f.uL[c][q];"undefined"==typeof p&&(r||(r=g(document.createElement("div")),
r.addClass(c),a.append(r)),p=f.rCa(r,q),f.uL[c][q]=p);if(null!=p){var s=new e(b,s.path),n=f[q];if(null!=n){var u=s.je();if("CSS_URL"!==q){q="";if(null!=u){var u=f.qva(u),v;for(v in p)-1===u.indexOf(v)&&(q+=v+":"+p[v]+";");q+=u}else for(v in p)q+=v+":"+p[v]+";";p=q}}s.yja(p,null!=n)}}}},qva:function(a){if(a instanceof Object){var b="",c;for(c in a)var d=c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),b=b+(d+":"+a[c]+";");return b}return null!=a&&"string"==typeof a?a:""},rCa:function(a,b){var c=
f[b],c=c?c(a):f.IGa(a,b);return null==c||"string"==typeof c&&""==c.replace(/^\s+/g,"")?null:c}};a.Pa("oj.dvtBaseComponent",g.oj.baseComponent,{_ComponentCreate:function(){this._super();this.XD=this.$V=0;this.Wo=null;for(var b=this.Kf(),c=0;c<b.length;c++)this.element.addClass(b[c]);this.QK=g(document.createElement("div"));this.QK.attr("style","visibility:hidden;");this.element.append(this.QK);this.bg=(b=this.element[0].parentElement)&&b.MC?b.MC:new d.Context(this.element[0],null,this.QK[0]);this.bg.setReadingDirection(this.nd());
this.bg.setTooltipAttachedCallback(a.Components.tg);this.bg.setOverlayAttachedCallback(a.Components.tg);this.bg.setTooltipStyleClass("oj-dvt-tooltip");this.bg.setDatatipStyleClass("oj-dvt-datatip");this.bg.setDefaultFontFamily(this.QK.css("font-family"));g(document.body).hasClass("oj-hicontrast")&&d.Agent.setHighContrast(!0);this.xa=this.Eg(this.bg,this.Gl,this);this.bg.getStage().addChild(this.xa);!1!==d.requireJS&&(this.sDa(),this.bba());this.po();this.options._environment="jet";this.options._widgetConstructor=
a.Components.De(this.element)},Ph:function(){this._super();this.element.attr("tabIndex",0);"off"!=this.options.trackResize&&this.RQ();this.Waa();this.Uh()},refresh:function(){this._super();this.bg.setReadingDirection(this.nd());this.bba();this.Uh()},getNodeBySubId:function(a){var b=this.xa&&this.xa.getAutomation?this.xa.getAutomation():null;if(b)return a=this.Hk(a),b.getDomElementForSubId(a)},getSubIdByNode:function(a){var b=this.xa&&this.xa.getAutomation?this.xa.getAutomation():null;if(b)return(a=
b.getSubIdForDomElement(a))?this.Qh(a):null},Hk:function(){return null},Qh:function(){return null},AH:function(){f.bKa(this.element,this.options,this.Kf(),this.Ik())},Kf:function(){return["oj-dvtbase"]},Ik:function(){return{"oj-dvt-no-data-message":{path:"_statusMessageStyle",property:"CSS_TEXT_PROPERTIES"}}},Gj:function(){return[]},Si:function(){var b=this.options.translations,b={"DvtUtilBundle.CLEAR_SELECTION":b.labelClearSelection,"DvtUtilBundle.COLON_SEP_LIST":b.labelAndValue,"DvtUtilBundle.INVALID_DATA":b.labelInvalidData,
"DvtUtilBundle.NO_DATA":b.labelNoData,"DvtUtilBundle.DATA_VISUALIZATION":b.labelDataVisualization,"DvtUtilBundle.STATE_SELECTED":b.stateSelected,"DvtUtilBundle.STATE_UNSELECTED":b.stateUnselected,"DvtUtilBundle.STATE_MAXIMIZED":b.stateMaximized,"DvtUtilBundle.STATE_MINIMIZED":b.stateMinimized,"DvtUtilBundle.STATE_EXPANDED":b.stateExpanded,"DvtUtilBundle.STATE_COLLAPSED":b.stateCollapsed,"DvtUtilBundle.STATE_ISOLATED":b.stateIsolated,"DvtUtilBundle.STATE_HIDDEN":b.stateHidden,"DvtUtilBundle.STATE_VISIBLE":b.stateVisible,
"DvtUtilBundle.SCALING_SUFFIX_THOUSAND":b.labelScalingSuffixThousand,"DvtUtilBundle.SCALING_SUFFIX_MILLION":b.labelScalingSuffixMillion,"DvtUtilBundle.SCALING_SUFFIX_BILLION":b.labelScalingSuffixBillion,"DvtUtilBundle.SCALING_SUFFIX_TRILLION":b.labelScalingSuffixTrillion,"DvtUtilBundle.SCALING_SUFFIX_QUADRILLION":b.labelScalingSuffixQuadrillion},c=a.$a.pF("abbreviated");b["DvtUtilBundle.MONTH_SHORT_JANUARY"]=c[0];b["DvtUtilBundle.MONTH_SHORT_FEBRUARY"]=c[1];b["DvtUtilBundle.MONTH_SHORT_MARCH"]=c[2];
b["DvtUtilBundle.MONTH_SHORT_APRIL"]=c[3];b["DvtUtilBundle.MONTH_SHORT_MAY"]=c[4];b["DvtUtilBundle.MONTH_SHORT_JUNE"]=c[5];b["DvtUtilBundle.MONTH_SHORT_JULY"]=c[6];b["DvtUtilBundle.MONTH_SHORT_AUGUST"]=c[7];b["DvtUtilBundle.MONTH_SHORT_SEPTEMBER"]=c[8];b["DvtUtilBundle.MONTH_SHORT_OCTOBER"]=c[9];b["DvtUtilBundle.MONTH_SHORT_NOVEMBER"]=c[10];b["DvtUtilBundle.MONTH_SHORT_DECEMBER"]=c[11];return b},bba:function(){var a=this.Si();d.Bundle.addLocalizedStrings(a)},sDa:function(){var b={};b.numberConverterFactory=
a.Aa.Qfa("number");b.dateToIsoConverter=function(b){return b instanceof Date?a.Na.dateToLocalIso(b):b};b.isoToDateConverter=function(b){if("string"==typeof b){var c=a.Na.isoToDate(b);b=c.toJSON()?a.Na.dateToLocalIso(c):b;return a.Na.isoToLocalDate(b)}return b};b.dateToIsoWithTimeZoneConverter=function(b){if(b instanceof Date){var c=-1*b.getTimezoneOffset(),d=Math.floor(Math.abs(c)/60),e=Math.abs(c)%60,c=(0<=c?"+":"-")+(2!==d.toString().length?"0"+d:d)+":"+(2!==e.toString().length?e+"0":e);return a.Na.dateToLocalIso(b)+
c}return b};this.bg.setLocaleHelpers(b)},_destroy:function(){this.bg.hideTooltips();this.bg=null;var a=this.element[0].parentElement;a&&a.MC&&(a.MC=null);this.xa.destroy&&this.xa.destroy();this.xa=null;this.WV();this.element.children().remove();this.element.removeAttr("role").removeAttr("tabIndex").removeAttr("aria-activedescendant");for(var a=this.Kf(),b=0;b<a.length;b++)this.element.removeClass(a[b]);this._super()},_setOptions:function(a,b){this._superApply(arguments);var c=this.options.trackResize;
"off"==c&&this.$l?this.WV():"off"==c||this.$l||this.RQ();this.Waa();if(!this.h4){var d=!1,e=this.Gj(),f=["highlightedCategories","selection","dataCursorPosition"];g.each(a,function(a){if(0>e.indexOf(a)&&0>f.indexOf(a))return d=!0,!1});d?this.Uh():(void 0!==a.highlightedCategories&&this.xa.highlight(a.highlightedCategories),void 0!==a.selection&&this.xa.select(a.selection),void 0!==a.dataCursorPosition&&this.xa.positionDataCursor&&this.xa.positionDataCursor(a.dataCursorPosition))}},Eg:function(){return null},
Gl:function(a){var b=a.type;"selection"===b?this.ge("selection",a.selection):"categoryHide"===b||"categoryShow"===b?this.ge("hiddenCategories",a.hiddenCategories):"categoryHighlight"===b?this.ge("highlightedCategories",a.categories):"optionChange"===b?this.ge(a.key,a.value,a.optionMetadata):"touchHoldRelease"===b&&this.options.contextMenu?this.rh(g.Event(a.nativeEvent),"touch"):"ready"===b&&0===this.XD&&(this.JV&&this.JV(!0),this.eba=!0,this.IV=this.JV=null)},RQ:function(){this.$l||(this.$l=this.Mg.bind(this),
a.C.bl(this.element[0],this.$l,250))},WV:function(){this.$l&&(a.C.zm(this.element[0],this.$l),this.$l=null)},Mg:function(){var a=this.element.width(),b=this.element.height();(null==this.RL||null==this.YJ||5<=Math.abs(a-this.RL)+Math.abs(b-this.YJ))&&this.Uh(!0)},po:function(){},Uh:function(b){this.bg.hideTooltips();this.v2();this.bg.isReadyToRender()?(this.RL=this.lH()?null:this.element.width(),this.YJ=this.lH()?null:this.element.height(),this.options._width=this.RL,this.options._height=this.YJ,this.options._locale=
a.ga.gj(),this.options.dnd&&this.element.attr("draggable",!0),this.AH(),this.$V++,b?this.Wo||this.YV(null):0===this.pCa().length&&this.YV(this.options),this.bW=!1):this.bW=!0},fq:function(){this._super();this.bW&&this.Uh()},dq:function(){this._super();this.bW&&this.Uh()},Hj:function(){this._super();this.bg.hideTooltips()},Wm:function(){this._super();this.bg.hideTooltips()},ge:function(a,b,c){this.h4=!0;this.option(a,b,{_context:{Ed:!0,bu:c,nb:!0}});this.h4=!1},qh:function(a,b,c){if("touch"!==c)if("keyboard"===
c){a=this.element[0].getBoundingClientRect();var d=this.xa.getKeyboardFocus()?this.xa.getKeyboardFocus().getBoundingClientRect():null;this.rh(b,c,{position:{at:d?"left+"+(d.left+.5*d.width-a.left)+" top+"+(d.top+.5*d.height-a.top):"center"}})}else this._super(a,b,c)},OB:function(b){return(b=a.Components.De(b)("instance"))?b.xa:null},Qi:function(a){if(a){var b={},c;for(c in a)this.Uoa(a,c,b);Object.defineProperties(a,b)}},Uoa:function(a,b,c){var d=("selected"==b?"is":"get")+b.charAt(0).toUpperCase()+
b.slice(1);c[d]={value:function(){return a[b]}}},Qu:function(a){for(var b="",c=0;c<a.length;c++)b+="["+a[c]+"]";return b},Sm:function(a){for(var b=[],c=0;0<a.indexOf("[",c);){var d=a.indexOf("[",c)+1,c=a.indexOf("]",c);b.push(Number(a.substring(d,c)));c+=1}return b},Kk:function(a){return Number(this.fH(a))},fH:function(a){var b=a.indexOf("[")+1,c=a.indexOf("]");return a.substring(b,c)},Jk:function(){return{}},pCa:function(){this.Wo=null;var a=this.Jk(),b;for(b in a)for(var c=a[b],d=0;d<c.length;d++)if("root"===
b){if(this.jv(this.options,c[d]))break}else{var e=this.options[b];if(e)for(var f=0;f<e.length&&!this.jv(e[f],c[d]);f++);}var g=[];this.XD=0;if(this.Wo){var q=this;for(b in a)c=a[b],c.forEach(function(a){var c;if("root"===b)(c=q.m8(q.Wo,a))&&g.push(c);else{var d=q.Wo[b];if(d)for(var e=0;e<d.length;e++)(c=q.m8(d[e],a))&&g.push(c)}})}return g},jv:function(a,b){if(!this.Wo){var c=(new e(a,b)).je();c&&(c instanceof Function||c instanceof Promise)&&(this.Wo=d.JsonUtils.clone(this.options))}return null!==
this.Wo},m8:function(a,b){var c=new e(a,b),d=c.je();d instanceof Function&&(d=Promise.resolve(d(this.O1(a))));if(d&&d instanceof Promise){this.XD++;var f=this.$V,g=this;d.then(function(a){g.Nba(f,c,a)},function(){g.Nba(f,c,[])});return d}return null},Nba:function(a,b,c){a===this.$V&&(this.XD--,b.yja(c,!0),0===this.XD&&(this.YV(this.Wo),this.Wo=null))},YV:function(a){var b=this.lH()&&this.$l;b&&this.WV();this.xa.render(a,this.RL,this.YJ);b&&this.RQ()},O1:function(){return{}},lH:function(){return!1},
whenReady:function(){if(this.eba)return Promise.resolve(!0);if(!this.IV){var a=this;this.IV=new Promise(function(b){a.JV=b})}return this.IV},v2:function(){this.eba=!1},Waa:function(){var a=this.options.tooltip;"function"===typeof a&&(this.options.tooltip={renderer:a})}},!0);a.Lx=function(a){this.Init(a)};o_("ShapeAttributeGroupHandler",a.Lx,a);a.b.sa(a.Lx,a.wk,"oj.ShapeAttributeGroupHandler");a.Lx.oC="square circle diamond plus triangleDown triangleUp human".split(" ");a.Lx.prototype.Kn=function(){return a.Lx.oC};
a.b.g("ShapeAttributeGroupHandler.prototype.getValueRamp",{Kn:a.Lx.prototype.Kn});a.Components.Wa("dvtBaseComponent","baseComponent",{properties:{trackResize:{type:"string"}},methods:{whenReady:{}},extension:{_widgetName:"dvtBaseComponent"}})});