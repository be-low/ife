# 这天的笔记

## keyup, keypress, keydown 和 input 四个事件的异同

当在 input 中输入时，触发顺序为

 1 keydown,2 keypress,3 input,4 keyup

其实可以按照这些单词的字面意思来理解，keydown 键按下，keypress 键按住，keyup 键松开，input 输入。但是又发现按住一个键不松开时，会循环触发 keydown 和 keypress,或许这是键盘的触发机制？

就实现监控输入而言，用 input 应该更好，当然用别的也完全可以，只是有点不配。(划掉)

keyup ,keypress ,keydown ,用来做那种根据不同的按键做不同的处理比较适合，比如根据游戏中角色根据上下左右走不同的方向，按不同的键释放不同的技能这些。keypress 还可以做需要蓄力的技能。

又发现 input 其实是不监听删除操作的，所以还得加一个 keydown 的监听，专用来判断输入为空时，清空提示。（划掉）

哇，遇坑了，keydown 触发得太快，输入内容还没有更新，所以用 keydown 监听时会有出人意料的效果。比如我把 input的内容删完了，但是监听事件获取的 input.value 其实是我最后一个删的字符，并清空提示内容，非得再 keydown 一下才能清空。显然这是不合适的。

经过测试，发现 keypress 事件也有一样的问题。所以只好用 keyup 了。所以现在可以理解这四个事件的触发顺序了，input 在 keypress 之后触发，这时候 input 才获取到按键的值，而 keyup 当然也 OK。其实到这里我才明白为什么按键键输入的事件要有三个（划掉。刚才是以为删除是不触发 input 的。是我错了。其实只要绑定 input 事件就行了。

上面是我的踩坑操作，不过也有一定的价值，最少我大概是忘不了他们的触发顺序和区别了。