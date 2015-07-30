# ndoojs
ndoojs是一款轻量级javascript框架，框架的功能主要由个人项目开发积累和实践总结而来。试试吧，或许你会喜欢他。
文档链接[http://thinkjs.github.io/ndoojs/](http://thinkjs.github.io/ndoojs/)。

## 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>started-ndoojs</title>
  </head>
  <body>
    <p id="container"></p>
    <div id="scriptArea" data-page-id="home/index">
      <script src="lib/underscore-min.js"></script>
      <script src="lib/jquery-2.1.1.min.js"></script>
      <script src="js/ndoo_all.js"></script>
      <script>
        (function() {
          var $, _n;
          $ = this['jQuery'] || this['Zepto'];
          _n = this.ndoo;
          _n.app('home', {
            indexAction: function() {
              return $('#container').html('hello ndoojs!');
            }
          });
          _n.init();
        }).call(this);
      </script>
    </div>
  </body>
</html>
```

### 1.定义页面id

ndoojs需要为页面分配一个id，每个id对应的一个入口函数，在该函数内初始化该页面的所有逻辑，使用data-page-id属性指定id。
ndoojs的核心概念即每个页面有一个唯一的id，有一个唯一的入口函数，在该函数内处理该页面的所有逻辑。

```html
<div id="scriptArea" data-page-id="home/index">
...
</div>
```


### 2.引入ndoo脚本及依赖

ndoojs依赖underscore，使用jQuery的ready函数(可以使其它库的ready代替)。为了省事，一般会将 ndoo 的相关脚本放到 scriptArea 下面。

```html
<script src="lib/underscore-min.js"></script>
<script src="lib/jquery-2.1.1.min.js"></script>
<script src="js/ndoo_all.js"></script>
```

### 3.编写对应脚本

为home/index编写对应的入口函数，定义home下名为indexAction的入口函数。

```javascript
_n.app('home', {
  indexAction: function() {
    return $('#container').html('hello ndoojs!');
  }
});
```

### 4.启动脚本

```javascript
_n.init()
```
