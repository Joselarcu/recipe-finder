import{B as c,Ca as w,Da as M,E as i,Fa as O,K as m,Na as D,P as o,Q as n,R as a,X as r,ca as g,da as s,ra as C,sa as b,ta as x,ua as h,va as A,xa as k,ya as y,za as F}from"./chunk-AIU7P5UL.js";var L=[{path:"",loadComponent:()=>import("./chunk-5UEAS3PW.js").then(e=>e.RecipeSearchComponent)},{path:"recipe/:id",loadComponent:()=>import("./chunk-TUHDLRAM.js").then(e=>e.RecipeDetailComponent)},{path:"favorites",loadComponent:()=>import("./chunk-GWMXF2XX.js").then(e=>e.FavoritesComponent)},{path:"new-recipe",loadComponent:()=>import("./chunk-R5EYE4DX.js").then(e=>e.AddRecipeComponent)},{path:"**",redirectTo:""}];var N={production:!1,firebase:{apiKey:"AIzaSyC0C4QTFrY5TxxYZNYK8nvw4Z4ITwCXeZc",authDomain:"recipe-finder-a977f.firebaseapp.com",projectId:"recipe-finder-a977f",storageBucket:"recipe-finder-a977f.firebasestorage.app",messagingSenderId:"224043316407",appId:"1:224043316407:web:ee3f85984db114f6e4c932"}};var R={providers:[F(L),x(),w(()=>M(N.firebase)),O(()=>D())]};var v=()=>({exact:!0}),l=class e{static \u0275fac=function(t){return new(t||e)};static \u0275cmp=i({type:e,selectors:[["app-nav-bar"]],decls:17,vars:6,consts:[[1,"navbar","navbar-expand-lg"],[1,"container-fluid"],["href","/",1,"navbar-brand"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarNavDropdown","aria-controls","navbarNavDropdown","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","navbarNavDropdown",1,"collapse","navbar-collapse","d-lg-flex","flex-lg-row-reverse"],[1,"navbar-nav"],[1,"nav-item"],["aria-current","page","routerLink","/","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["aria-current","page","routerLink","/favorites","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["aria-current","page","routerLink","/new-recipe","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"]],template:function(t,u){t&1&&(o(0,"nav",0)(1,"div",1)(2,"a",2),r(3,"Recipe finder"),n(),o(4,"button",3),a(5,"span",4),n(),o(6,"div",5)(7,"ul",6)(8,"li",7)(9,"a",8),r(10,"Search"),n()(),o(11,"li",7)(12,"a",9),r(13,"Favorites"),n()(),o(14,"li",7)(15,"a",10),r(16,"Add recipe"),n()()()()()()),t&2&&(c(9),m("routerLinkActiveOptions",s(3,v)),c(3),m("routerLinkActiveOptions",s(4,v)),c(3),m("routerLinkActiveOptions",s(5,v)))},dependencies:[k,y],styles:[".navbar[_ngcontent-%COMP%]{background-color:#e3f2fd}"]})};var f=class e{static \u0275fac=function(t){return new(t||e)};static \u0275cmp=i({type:e,selectors:[["app-footer"]],decls:3,vars:0,consts:[[1,"footer"]],template:function(t,u){t&1&&(o(0,"footer",0)(1,"p"),r(2,"\xA9 Recipe finder"),n()())},styles:[".footer[_ngcontent-%COMP%]{background-color:#fff;padding:1rem 0;text-align:center;box-shadow:0 -2px 4px #0000001a}.footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#666}"]})};var d=class e{title="Recipe Finder";static \u0275fac=function(t){return new(t||e)};static \u0275cmp=i({type:e,selectors:[["app-root"]],features:[g([{provide:h,useValue:{snapshot:{params:{id:"1"}}}}])],decls:4,vars:0,consts:[[1,"main-content"]],template:function(t,u){t&1&&(a(0,"app-nav-bar"),o(1,"main",0),a(2,"router-outlet"),n(),a(3,"app-footer"))},dependencies:[C,l,A,f],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;min-height:100vh}.main-content[_ngcontent-%COMP%]{flex:1;padding:20px 0;background-color:#f8f9fa}@media (max-width: 768px){.nav-content[_ngcontent-%COMP%]{flex-direction:column;gap:1rem}.nav-links[_ngcontent-%COMP%]{width:100%;justify-content:center}}"]})};b(d,R).catch(e=>console.error(e));
