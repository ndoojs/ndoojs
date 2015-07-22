# ndoojs
- 轻量级javascript框架。docs [http://thinkjs.github.io/ndoojs/](http://thinkjs.github.io/ndoojs/)

## 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>example</title>
    <script src="../js/ndoo_prep.js"></script>
  </head>
  <body>
    <p id="content"></p>
    <div id="scriptArea" data-page-id="home/index">
      <script src="lib/underscore-min.js"></script>
      <script src="lib/jquery-2.1.1.min.js"></script>
      <script src="js/ndoo_lib.js"></script>
      <script src="js/ndoo.js"></script>
      <script src="app.js"></script>
    </div>
  </body>
</html>
```

app.js

```javascript
(function(){
  'use strict';
  var _, $, _n, _vars, _func, _stor;
  _ = this['_'];
  $ = this['jQuery'] || this['Zepto'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;

  /* [home module] {{{ */
  _n.app('home', {
    indexAction: function(param){
      var $content;
      $content = $('#content');
      $content.html('module: home, action: indexAction');
    }
  });
  /* }}} */

}).call(this);
```

### 1. 引入头文件
ndoojs 需要在head处引用一个头文件，ndoo_prep.js。主要用来预定义变量，暂存事件回调等。这个文件体积非常小巧，不会对页面加载造成影响。

```html
<script src="../js/ndoo_prep.js"></script>
```

### 2. 定义页面id
ndoojs的核心概念即每个页面有一个唯一的id，有一个唯一的入口函数，在该函数内处理该页面的所有逻辑。

### 3. 编写对应脚本 app.js
见app.js

### 4. 引入ndoo脚本及依赖
ndoojs依赖underscore，使用到jQuery的ready函数(可以使其它库的ready代替)。ndoo_lib提供事件和路由支持。

```html
<script src="lib/underscore-min.js"></script>
<script src="lib/jquery-2.1.1.min.js"></script>
<script src="js/ndoo_lib.js"></script>
<script src="js/ndoo.js"></script>
<script src="app.js"></script>
```
为了省事，一般会将 ndoo 的相关脚本放到 scriptArea 下面。
