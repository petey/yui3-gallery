YUI.add("gallery-simple-datatable",function(B){var A=B.Lang;B.SimpleDatatable=B.Base.create("sdt",B.Widget,[],{CONTENT_TEMPLATE:"<table>",className:"",tHead:null,headersSet:false,rowsSet:false,initializer:function(C){this.className=this.getClassName();},renderUI:function(){this.tHead=B.Node.create("<thead></thead>");this.tBody=B.Node.create("<tbody></tbody>");this.get("contentBox").append(this.tHead).append(this.tBody);},syncUI:function(){this.setHeaders(this.get("headers"));this.setRows(this.get("rows"));},setHeaders:function(E){var J=B.Node.create("<tr></tr>"),C,I,H,G=0,F=this.get("linerTemplate"),D={linerClasses:this.className+"-liner",labelClasses:this.className+"-label",label:""};if(!E){E={};}if(A.isObject(E)){for(I in E){C=B.Node.create("<th></th>");C.addClass(this.className+"-col-"+(G++));C.addClass(this.className+"-col-"+I);if(A.isString(E[I])){D.label=E[I];}else{if(E[I].label){D.label=E[I].label.toString();}else{D.label=I;}}C.append(B.substitute(F,D));C.setAttribute("key",I);if(A.isObject(E[I])){for(H in E[I]){C.setAttribute(H,E[I][H]);}}J.append(C);}}if(this.tHead.one("tr")){this.tHead.one("tr").remove(true);}this.tHead.append(J);this.headersSet=true;return this;},setRows:function(F){var E,D,C=this.get("contentBox"),G=B.Node.create("<tbody></tbody>");if(!F){F=[];}for(E=0,D=F.length;E<D;E++){G.append(this._addRow(F[E],E));}C.one("tbody").replace(G);this.tBody=G;this.rowsSet=true;return this;},clearHeaders:function(C){if(C===true){this.set("headers",{});}return this.setHeaders();},clearRows:function(C){if(C===true){this.set("rows",[]);}return this.setRows();},_addRow:function(E,I){var D=this.get("headers")||{},G=0,O,L,K,H=0,C="__yui_id",J=this.get("linerTemplate"),N={linerClasses:this.className+"-liner",labelClasses:this.className+"-label",label:""},M=A.isObject(E),F=A.isArray(E);O=B.Node.create("<tr>");if(M){for(K in E){if(K.substring(0,2)==="__"){O.setAttribute(K.substring(2),E[K]);}}if(!E[C]){E[C]=B.Event.generateId(O);}O.set("id",E[C]);}else{O.set("id",B.Event.generateId(O));}for(K in D){L=B.Node.create("<td>");L.addClass(this.className+"-col-"+H++);L.addClass(this.className+"-col-"+K);if(M&&E[K]){N.label=E[K];}else{if(F&&E[G]){N.label=E[G];}else{N.label="&nbsp;";}}L.append(B.substitute(J,N));O.append(L);G++;}O.addClass(this.className+"-"+((I%2)?"even":"odd"));return O;}},{ATTRS:{headers:{value:{},validator:A.isObject},linerTemplate:{value:'<div class="{linerClasses}"><div class="{labelClasses}">{label}</div></div>'},rows:{value:[],validator:A.isArray}}});},"gallery-2010.09.08-19-45",{requires:["node","widget","widget-child","event","event-mouseenter","substitute"]});