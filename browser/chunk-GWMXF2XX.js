import{a as w}from"./chunk-AFGL3DTB.js";import{a as I}from"./chunk-O6GSRLFD.js";import{Aa as E,B as r,Ba as T,D as d,E as C,I as g,K as x,M as l,N as F,O as R,P as o,Q as n,S,T as b,U as m,X as c,da as h,la as y,ra as j,s as v,t as f,v as u,xa as M,y as _}from"./chunk-AIU7P5UL.js";var P=()=>[],V=(e,t)=>t.id;function D(e,t){e&1&&(o(0,"div",2)(1,"p"),c(2,"You haven't saved any favorite recipes yet."),n(),o(3,"button",5),c(4,"Search Recipes"),n()())}function L(e,t){e&1&&(o(0,"div",3),c(1," Loading recipe details... "),n())}function O(e,t){if(e&1){let i=S();o(0,"div",6)(1,"app-recipe-card",7),b("reloadRecipes",function(){v(i);let p=m(2);return f(p.loadFavoriteRecipes())}),n()()}if(e&2){let i=t.$implicit;r(),x("recipe",i)}}function N(e,t){if(e&1&&(o(0,"div",4),F(1,O,2,1,"div",6,V),n()),e&2){let i=m();r(),R(i.recipes())}}var k=class e{constructor(t,i){this.recipeService=t;this.injector=i;this.loadFavoriteRecipes()}recipes=_(null);loading=y(()=>this.recipes()===null);loadFavoriteRecipes(){this.recipes=T(this.recipeService.getFavoriteRecipes(),{initialValue:null,injector:this.injector})}static \u0275fac=function(i){return new(i||e)(d(I),d(u))};static \u0275cmp=C({type:e,selectors:[["app-favorites"]],decls:6,vars:4,consts:[[1,"container"],[1,"text-center","pb-4"],[1,"no-favorites"],[1,"loading"],[1,"row"],["routerLink","/","type","button",1,"btn","btn-success"],[1,"col","col-sm-1","col-md-2","col-lg-4","col-xl-4","mb-4"],[3,"reloadRecipes","recipe"]],template:function(i,a){if(i&1&&(o(0,"div",0)(1,"h1",1),c(2,"My Favorite Recipes"),n(),g(3,D,5,0,"div",2)(4,L,2,0,"div",3)(5,N,3,0,"div",4),n()),i&2){let p,s;r(3),l(a.recipes()!==null&&((p=a.recipes())==null?null:p.length)===0?3:-1),r(),l(a.loading()?4:-1),r(),l(((s=a.recipes())!==null&&s!==void 0?s:h(3,P)).length>0?5:-1)}},dependencies:[j,E,M,w],styles:[".no-favorites[_ngcontent-%COMP%]{text-align:center;padding:40px;background:#f8f9fa;border-radius:8px;margin-top:20px}.no-favorites[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#666;margin-bottom:20px}"]})};export{k as FavoritesComponent};
