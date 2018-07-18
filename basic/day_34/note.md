# 7/18 的记录

## canvas 的基本 API

1 矩形

    * fillRect(x, y, width, height)
    * strokeRect(x, y, width, height)
    * clearRect(x, y, width, height)
    * rect(x, y, width, height)

2 路径

    * beginPath()
    * closePath()
    * stroke()
    * fill()
    * moveTo(x, y)
    * lineTo(x, y)

3 圆弧

    * arc(x, y, radius, startAngle, endAngle,anticlockwise)
      anticlockwise 为弧的方向，true 为逆时针， false 为顺时针，默认 false
    * arcTo(x1, y1, x2, y2, radius)


4 曲线

    * quadraticCurveTo(cp1x, cp1y, x, y)
    * bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
       cp* 都表示控制点坐标

5 Path2D

    * Path2D()
    * Path2D(path)
      拷贝构造
    * Path2D(d)
      使用与 svg path 的 d 属性的值相同规则的字符串构造 Path2D

    Path2D 对象也可使用上面的方法，他本质上就是许多 Path 的集合，相当于保存自定义 2D 图形。
    可使用 fill(path2D) 或者 stroke(path2D) 来将 path2d 这个对象画出来

6 Styles

    * colors
      fillStyle = color
      strokeStyle = color
        color = #rrggbb || rgb(r,g,b) || colorName

    * Transparency
      globalAlpha = transparencyValue
      color = rgba(r,g,b,transparencyValue)
        transparencyValue = [0,1]

7 Line Styles

    * lineWidth = value
    * lineCap = type
        type = butt || round || square
        设置线条末端样式。
    * lineJoin = type
        type= round || bevel || miter
        设定线条与线条间接合处的样式。
    * miterLimit = value
        限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指
        线条交接处内角顶点到外角顶点的长度。
    * getLineDash()
        返回一个包含当前虚线样式，长度为非负偶数的数组。
    * setLineDash(segments)
        segments = [v1,v2]
        设置当前虚线样式。
    * lineDashOffset = value
        设置虚线样式的起始偏移量。
        
## 几种鼠标事件的区别

1 mouseover 指针移动到元素上时触发，触发最快

2 moverenter 也是移动到元素上触发，比 over 慢

2 mousemove 指针在元素上移动就会触发

3 moveout 指针离开元素后触发

4 moveleave 和上一个一样，不同之处在于目标元素是绑定了 Listener 的那一个，
而不会对其子元素起作用。