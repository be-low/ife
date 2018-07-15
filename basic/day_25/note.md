# 关于 Array.reduce()

发现 reduce 在没有赋初始值的时候， accumulator 初始化为 Array 的第一个元素， 回调执行 length-1 次，而只要给一个初始值， accumulator 会初始化为 所给的初始值， 回调 执行 length 次，也算是我偶然发现的。😄
被我用来把两个数组加一些字符串合并，效果还不错，少写了 2 行代码。😀