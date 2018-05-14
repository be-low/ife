# 第四天

关于 CSS

### 背景: background

1. background-color

    背景颜色

2. background-image

   设置背景图片: url("path"), 可设置多个背景图， 会有覆盖效果

3. background-repeat

| key                        | interpretation                     |
| :------------------------- | ---------------------------------- |
| repeat-x, repeat-y, repeat | 背景图重复， x 或者 y 表示单个方向 |
|no-repeat					   			 | 背景图像将仅显示一次 |
| space                      | 背景图像将尽可能重复而不被截断，可以留有空白 |
| round                      | 随着空间的增大或减小，重复的图像将伸缩 |

4. background-position

   定位背景图像， 可使用两种定位语法

   1. 直接使用 top, bottom ...
   2. 以百分比或像素定位，以左上角原点，也可以在 数值前面加方向作为参照方向

### 边框: border

1. border-color

   边框颜色

2. border-style

   边框线样式

   1. 默认为 none， 表现类似 hidden
   2. 隐藏 hidden，类似 none
   3. solid 实线
   4. double 双实线
   5. dotted 以点组成的虚线
   6. dashed 以线段注册的实线

3. border-width

   边框宽度

4. border-[top,right,bottom,left]

   上 右 下 左 的边框可以分别设置

### 列表: list-style

1. list-style-type

    更改列表元素 一般可以认为是 li 的 marker

    1. 列表序号的 position

      1. inside: 序号属于 li， 处于 li 之内
      2. outsize: 默认的值 相反

    2.列表序号的风格

      1. 设为自定义图像 url(image-path)
      2. 无序号 none
      3. 预设 marker

        1. circle 空心圆
        2. disc 实心圆
        3. decimal 数字， 从 1. 开始
2. list-style-image 以自定义的 marker 图像 作为 li 的 marker


### 关于链接: a

1. a:link 未访问的链接
2. a:visited 访问过的链接
3. a:hover 鼠标光标停留的链接
4. a:active  鼠标点击的时间段的链接
