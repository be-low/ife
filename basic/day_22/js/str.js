/* 实现一个字符串头尾去除空格的函数 注意需要去除的空格，包括全角、半角空格 暂时不需要学习和使用正则表达式的方式 */
function diyTrim(str) {
    while (str.startsWith(' ') || str.startsWith('　')) {
        str = str.substr(1);
    }
    while (str.endsWith(' ') || str.endsWith('　')) {
        str = str.substr(0, str.length - 1);
    }
    return str;
}
// 测试用例 
console.log(diyTrim(' a f b ')); // ->a f b 
console.log(diyTrim(' ffdaf ')); // ->ffdaf 
console.log(diyTrim('1     ')); // ->1 
console.log(diyTrim('　　f')); // ->f 
console.log(diyTrim(' 　 a f b 　　 ')); // ->a f b 
console.log(diyTrim(' ')); // -> 
console.log(diyTrim('　')); // -> 
console.log(diyTrim('')); // -> 


/* 去掉字符串str中，连续重复的地方 */
function removeRepetition(str) {
    if (str != null && str != "") {
        var ch = str[0];
        var result = ch;
        for (var i = 1; i < str.length; ++i) {
            if (str[i] != ch) {
                ch = str[i];
                result += ch;
            }
        }
        return result;
    } else {
        return "";
    }
}
// 测试用例 
console.log(removeRepetition("aaa")); // ->a 
console.log(removeRepetition("abbba")); // ->aba 
console.log(removeRepetition("aabbaabb")); // ->abab 
console.log(removeRepetition("")); // -> 
console.log(removeRepetition("abc")); // ->abc