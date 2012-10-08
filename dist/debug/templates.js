this['JST'] = this['JST'] || {};

this['JST']['app/templates/layouts/feed.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='  <div class="feed"></div>';
}
return __p;
};

this['JST']['app/templates/layouts/main.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="todoapp">\n  <div class="header">\n    <h1>Todos</h1>\n  </div>\n\n  <form></form>\n  <div class="list"></div>\n  <div class="stats"></div>\n</div>\n\n<footer>\n  <p>Created by</p>\n  <a href="http://jgn.me/">J&eacute;r&ocirc;me Gravel-Niquet</a>.\n  <p>Cleanup, edits: <a href="http://addyosmani.com">Addy Osmani</a>.</p>\n  <p>Updates: <a href="http://tbranyen.com">Tim Branyen</a>.</p>\n</footer>\n';
}
return __p;
};

this['JST']['app/templates/photo/pin.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<img width="192" src="'+
_.escape( imageUrl )+
'"></img>\n<audio controls name="media" class="audio" width="192">\n\t<source src="'+
_.escape( audioUrl )+
'" type="audio/mpeg">\n</video>\n<figcaption>\n  '+
_.escape( title )+
'\n</figcaption>';
}
return __p;
};

this['JST']['app/templates/photo/player.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<img width="192" src="'+
_.escape( imageUrl )+
'"></img>\n<!--audio controls name="media" class="audio" width="182">\n\t<source src="'+
_.escape( audioUrl )+
'" type="audio/mpeg">\n</audio -->\n  <button class="control play">Play</button>\n  <button class="control pause">Pause</button>\n<figcaption>\n  '+
_.escape( title )+
'\n</figcaption>';
}
return __p;
};

this['JST']['app/templates/photo/post.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='  <!-- Templates -->\n  <!--script type="text/template" id="post-template"-->\n    <a href="'+
_.escape( link )+
'"><h2>'+
_.escape( title )+
'</h2></a>\n    <article>'+
( content )+
'</article>\n  <!--/script-->';
}
return __p;
};

this['JST']['app/templates/todo/form.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="create-todo">\n  <input id="new-todo" placeholder="What needs to be done?" type="text" />\n  <span class="ui-tooltip-top" style="display:none;">Press Enter to save this task</span>\n</div>\n\n<div id="todos">\n  <input class="check mark-all-done" type="checkbox"/>\n  <label for="check-all">Mark all as complete</label>\n</div>\n';
}
return __p;
};

this['JST']['app/templates/todo/item.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="todo '+
( done && "done" )+
'">\n  <div class="display">\n    <input class="check" type="checkbox" '+
( done && "checked='checked'" )+
'>\n    <label class="todo-content">'+
( content )+
'</label>\n    <span class="todo-destroy"></span>\n  </div>\n  <div class="edit">\n    <input class="todo-input" type="text" value="'+
( content )+
'">\n  </div>\n</div>\n';
}
return __p;
};

this['JST']['app/templates/todo/stats.html'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<span class="todo-count">\n  <span class="number">'+
( remaining )+
'</span>\n  <span class="word">'+
( remaining == 1 ? 'item' : 'items' )+
'</span> left.\n</span>\n\n<span class="todo-clear">\n  <a href="#">\n    Clear <span class="number-done">'+
( done )+
'</span>\n    completed <span class="word-done">'+
( done == 1 ? 'item' : 'items' )+
'</span>\n  </a>\n</span>\n';
}
return __p;
};