webpackJsonp([1],[/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function(t,e,n){(function(t){"use strict";n(/*! ./RiotControl.js */3),n(/*! ./stores.js */2),n(/*! ./riotTags.js */4),t.mount("app")}).call(e,n(/*! riot */1))},,/*!***********************!*\
  !*** ./src/stores.js ***!
  \***********************/
function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(/*! ./store/blogstore */5),i=o(r),a={blog:i["default"]};e["default"]=a,t.exports=e["default"]},/*!****************************!*\
  !*** ./src/RiotControl.js ***!
  \****************************/
function(t,e,n){(function(t){"use strict";var e=["on","one","off","trigger"],n={_stores:[],addStore:function(t){this._stores.push(t)}};e.forEach(function(t){n[t]=function(){var e=[].slice.call(arguments);this._stores.forEach(function(n){return n[t].apply(null,e)})}}),t.control=n,t.SE={POSTS_CHANGED:"se_posts_changed"},t.VE={RESET_DATA:"ve_reset_data",LIKE_POST:"ve_like_post",LOAD_POSTS:"ve_load_posts"},t.mixin("controlMixin",{onControl:function(e,n){t.control.on(e,n),this.on("unmount",function(){return t.control.off(e,n)})}})}).call(e,n(/*! riot */1))},/*!*************************!*\
  !*** ./src/riotTags.js ***!
  \*************************/
function(t,e,n){"use strict";n(/*! ./component/postcell.html */9),n(/*! ./view/posts-view.html */12),n(/*! ./view/categories-view.html */10),n(/*! ./view/detail-view.html */11),n(/*! ./app.html */8)},/*!********************************!*\
  !*** ./src/store/blogstore.js ***!
  \********************************/
function(t,e,n){(function(n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),i="riot-webpack-demo",a=function(){function t(){o(this,t),n.observable(this);var e=window.localStorage.getItem(i);e?this._posts=e&&JSON.parse(e)||[]:this.initData()}return r(t,[{key:"getPostById",value:function(t){return this._posts.filter(function(e){return e.postId===t})[0]}},{key:"initData",value:function(){var t=[{postId:1,title:"Best xbox games",content:"Halo, GOW",category:"collection",likes:10},{postId:2,title:"Best ps games",content:"Uncharted, The Last of US",category:"collection",likes:20},{postId:3,title:"Best wii games",content:"Zelda, Mario",category:"collection",likes:16},{postId:4,title:"Review of Halo",content:"yes, cortana",category:"review",likes:11},{postId:5,title:"Review of Titanfall",content:"where is the local game?",category:"review",likes:7},{postId:6,title:"Review of portal",content:"I don't blame you",category:"review",likes:40}];this._posts=t,this.saveToStorage()}},{key:"saveToStorage",value:function(){window.localStorage.setItem(i,JSON.stringify(this._posts))}}]),t}(),u=new a;u.on(n.VE.LOAD_POSTS,function(){u.trigger(n.SE.POSTS_CHANGED,u._posts)}),u.on(n.VE.RESET_DATA,function(){u.initData(),u.trigger(n.SE.POSTS_CHANGED,u._posts)}),u.on(n.VE.LIKE_POST,function(t){u._posts.forEach(function(e){e.postId===t&&(e.likes=e.likes+1)}),u.saveToStorage(),u.trigger(n.SE.POSTS_CHANGED,u._posts)}),n.control.addStore(u),e["default"]=u,t.exports=e["default"]}).call(e,n(/*! riot */1))},,,/*!**********************!*\
  !*** ./src/app.html ***!
  \**********************/
function(t,e,n){(function(t){t.tag("app",'<section> <header> <nav> <ul> <li><a href="#posts">Posts</a></li> <li><a href="#categories">Categories</a></li> </ul> </nav> </header> <article> <div id="mainview"></div> </article> <footer> <nav> <a onclick="{resetData}">Reset Data</a> </nav> </footer> </section>',function(e){var n=this;this._currentView=null,this.resetData=function(){t.control.trigger(t.VE.RESET_DATA)},this.loadView=function(e,o){n._currentView&&n._currentView.unmount(!0),n._currentView=t.mountTo("div#mainview",e,{data:o})[0]},this.studyRoute=function(t,e){switch(t){case"categories":n.loadView("categories-view");break;case"detail":n.loadView("detail-view",e);break;case"posts":n.loadView("posts-view");break;default:n.loadView("posts-view")}},t.route(this.studyRoute),this.on("mount",function(){t.route.exec(n.studyRoute)})})}).call(e,n(/*! riot */1))},/*!*************************************!*\
  !*** ./src/component/postcell.html ***!
  \*************************************/
function(t,e,n){(function(t){t.tag("postcell",'<div> <span>Id: {opts.data.postId}</span> <span>Title: <a href="#detail/{opts.data.postId}">{opts.data.title}</a></span> <span>{opts.data.likes} Likes</span> <button onclick="{likePost}">Like</button> </div>',function(e){this.likePost=function(){t.control.trigger(t.VE.LIKE_POST,e.data.postId)}})}).call(e,n(/*! riot */1))},/*!***************************************!*\
  !*** ./src/view/categories-view.html ***!
  \***************************************/
function(t,e,n){(function(t){t.tag("categories-view",'<div each="{category, posts in _postsInCategories}"> <h3>{category}</h3> <postcell each="{posts}" data="{this}"></postcell> <hr> </div>',function(e){var n=this;this.mixin("controlMixin"),this._postsInCategories={},this.on("mount",function(){t.control.trigger(t.VE.LOAD_POSTS)}),this.onControl(t.SE.POSTS_CHANGED,function(t){n._postsInCategories=t.reduce(function(t,e){return t[e.category]=t[e.category]||[],t[e.category].push(e),t},{}),n.update()})})}).call(e,n(/*! riot */1))},/*!***********************************!*\
  !*** ./src/view/detail-view.html ***!
  \***********************************/
function(t,e,n){(function(t){t.tag("detail-view",'<h2>{_post.title}</h2> <p>{_post.content}</p> <p>{_post.likes} Likes</p> <a if="{ opts.data > 1 }" href="#detail/{ opts.data - 1 }">Previous Post</a> | <a if="{ opts.data < _total }" href="#detail/{ opts.data - -1 }">Next Post</a>',function(e){function o(t){return t&&t.__esModule?t:{"default":t}}var r=this,i=n(/*! ../stores */2),a=o(i);this.mixin("controlMixin"),this.onControl(t.SE.POSTS_CHANGED,function(t){r.readData()}),this.readData=function(){r._post=a["default"].blog.getPostById(Number(e.data)),r._total=a["default"].blog._posts.length,r.update()},this.readData()})}).call(e,n(/*! riot */1))},/*!**********************************!*\
  !*** ./src/view/posts-view.html ***!
  \**********************************/
function(t,e,n){(function(t){t.tag("posts-view",'<postcell each="{_posts}" data="{this}"></postcell>',function(e){var n=this;this.mixin("controlMixin"),this._posts=[],this.on("mount",function(){t.control.trigger(t.VE.LOAD_POSTS)}),this.onControl(t.SE.POSTS_CHANGED,function(t){n._posts=t,n.update()})})}).call(e,n(/*! riot */1))}]);
//# sourceMappingURL=bundle.js.map