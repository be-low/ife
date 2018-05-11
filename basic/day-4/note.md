# 第四天

关于 CSS

### 背景: background

1. background-color

   color 我觉得没什么好记的，可选的值就是 #FFFFFF rgb(255,255,255)  or white, yellow 这种表示颜色的值。

   CSS 的 color 属性好像都是这样，以后就直接略过了

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

   ......

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
2. list-style-image

### 链接: a
