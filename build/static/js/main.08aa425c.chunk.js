(window.webpackJsonppart1=window.webpackJsonppart1||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=t(2),l=t(3),i=t.n(l),s="/api/persons",m=function(){return i.a.get(s).then((function(e){return e.data}))},f=function(e){return i.a.post(s,e).then((function(e){return e.data}))},d=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.value,t=e.onChange;return r.a.createElement("input",{value:n,onChange:t})},v=function(e){var n=e.name,t=e.value,a=e.setValue;return r.a.createElement("div",null,"".concat(n,": "),r.a.createElement(p,{value:t,onChange:function(e){var n=e.target;return a(n.value)}}))},E=function(e){var n=e.filter,t=e.setFilter;return r.a.createElement(v,{name:"Filter shown with",value:n,setValue:function(e){return t(e.toLowerCase())}})},h=function(e){var n=e.type,t=e.name;return r.a.createElement("button",{type:n},t)},g={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},w=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{style:g},n)},y={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},j=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{style:y},n)},O=function(e){var n=e.persons,t=e.setPersons,o=Object(a.useState)(""),u=Object(c.a)(o,2),l=u[0],i=u[1],s=Object(a.useState)(""),m=Object(c.a)(s,2),b=m[0],p=m[1],E=Object(a.useState)(null),g=Object(c.a)(E,2),y=g[0],O=g[1],S=Object(a.useState)(null),k=Object(c.a)(S,2),P=k[0],C=k[1],D={name:l,number:b};return r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a,r=n.find((function(e){return e.name===l}));r?(a=r,window.confirm("".concat(a.name," is already added to phonebook, replace the old number with a new one? "))&&d(a.id,D).then((function(e){t(n.map((function(n){return n.id===a.id?e:n}))),O("Updated ".concat(e.name,"'s number to ").concat(e.number)),setTimeout((function(){O(null)}),5e3)})).catch((function(){C("Information of '".concat(l,"' has already been removed from server")),setTimeout((function(){C(null)}),5e3)}))):f(D).then((function(e){t(n.concat(e)),O("Added ".concat(e.name)),setTimeout((function(){O(null)}),5e3)})).catch((function(e){console.log(e.response.data)})),i(""),p("")}},r.a.createElement(v,{name:"Name",value:l,setValue:i}),r.a.createElement(v,{name:"Number",value:b,setValue:p}),r.a.createElement(h,{type:"submit",name:"Add"}),r.a.createElement(j,{message:P}),r.a.createElement(w,{message:y}))},S=function(e){var n=e.name,t=e.number,a=e.id,o=e.persons,u=e.setPersons;return r.a.createElement("li",null,r.a.createElement("form",{onSubmit:function(e){return function(e,n,t,a,r){e.preventDefault(),window.confirm("Delete ".concat(n,"?"))&&(b(t),r(a.filter((function(e){return e.id!==t}))))}(e,n,a,o,u)}},"".concat(n," ").concat(t," "),r.a.createElement(h,{type:"submit",name:"Delete"})))},k=function(e){var n=e.persons,t=e.filter,a=e.setPersons,o=n.filter((function(e){return""===t||e.name.toLowerCase().includes(t)}));return r.a.createElement("ul",null," ",o.map((function(e){return r.a.createElement(S,{key:e.id,id:e.id,name:e.name,number:e.number,persons:n,setPersons:a})}))," ")},P=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),l=Object(c.a)(u,2),i=l[0],s=l[1];return Object(a.useEffect)((function(){m().then((function(e){return o(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{filter:i,setFilter:s}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(O,{persons:t,setPersons:o}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(k,{persons:t,filter:i,setPersons:o}))};u.a.render(r.a.createElement(P,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.08aa425c.chunk.js.map