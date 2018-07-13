# JS查找DOM

高级选择器确实是省事诶,比我不用要少写60%的 JS 代码

终于知道了原来 jQuery 的 query 是这个意思.

我觉得要注意的也就一点

1 querySeletorAll 返回的是 nodeList 类型的对象,这个对象不能再使用 query 方法,也没毛病,一个 List 做 query 也说不过去.

2 query 返回的是查询中第一个匹配的对象,所以还可以继续执行查询操作