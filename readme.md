# ndoojs
ndoojs是一款轻量级javascript框架，框架的功能主要由个人项目开发积累和实践总结而来。试试吧，或许你会喜欢他。
文档链接[http://ndoojs.github.io/ndoojs/](http://ndoojs.github.io/ndoojs/)。

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
ndoojs需要为页面定义一个id，每个id有一个对应的入口函数，在入口函数内初始化该页面的所有逻辑。给id为scriptArea的标签设置data-page-id属性定义页面id。

```html
<div id="scriptArea" data-page-id="home/index">
...
</div>
```


### 2.引入ndoo脚本及依赖
ndoojs依赖underscore，使用jQuery的ready函数(可使用zepto替代)。为了整齐美观，一般将脚本放到页面底部scriptArea下面加载。

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
