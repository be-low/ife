function isNum(num) {
    if (num != "" && !isNaN(num)) {
        return true;
    } else {
        console.log(num + " not a num");
        return false;
    }
}
//num, bit 为 String
//返回将 num 四舍五入小数点后 bit 位的 String
function approximate(num, bit) {
    if (isNum(bit) && isNum(num)) {
        bit = parseInt(bit);
        var nums = num.split(".");
        if (bit > 0) {
            var dec = nums[1].substr(0, bit + 1);
            if (parseInt(dec[bit]) > 5) {
                dec = dec.substr(0, bit - 1) + String(parseInt(dec[bit - 1]) + 1);
            }
            return nums[0] + "." + dec.substr(0, bit);
        } else {
            return nums[0];
        }
    }
}

function replaceAll(str, rep, repTo) {
    while (str.indexOf(rep) != -1) {
        str = str.replace(rep, repTo);
    }
    return str;
}