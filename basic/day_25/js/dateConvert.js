function datePrefixFormat(date, dateData) {
    var str = date.getFullYear().toString() + dateData[0];
    var dateArr = ['', (date.getMonth() + 1).toString(),
        date.getDate().toString()
    ];
    for (var i = 1; i < dateArr.length; ++i) {
        str += dateArr[i].padStart(2, '0') + dateData[i];
    }
    console.log(str + "||" + dateArr);
    return str;
}

function weekDayFormat(date, weekdayData) {
    return weekdayData[date.getDay()];
}

function timeFormat(date, timeData) {
    var timeArr = [date.getHours().toString(),
        date.getMinutes().toString(),
        date.getSeconds().toString()
    ];
    var str = "";
    for (var i in timeArr) {
        str += timeData[i] + timeArr[i].padStart(2, '0');
    }
    return str;
}

function dateFormat(date) {
    const dateData = ["年", "月", "日"];
    const weekdayData = ["星期天", "星期一", "星期二", "星期三", "星四", "星期五", "星期六"];
    const separator = [' ', ':', ':'];
    return datePrefixFormat(date, dateData) + weekDayFormat(date, weekdayData) + timeFormat(date, separator);
}

function dateFormat2(date) {
    const dateData = ["-", "-", " "];
    const weekdayData = ["Sunday", "Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday"];
    const separator = [' ', ':', ':'];
    return datePrefixFormat(date, dateData) + weekDayFormat(date, weekdayData) + timeFormat(date, separator);
}

function secondToDHMS(sec) {
    const minSec = 60;
    const houSec = minSec ** 2;
    const daySec = houSec * 24;

    let day = parseInt(sec / daySec);
    sec -= day * daySec;
    let hou = parseInt(sec / houSec);
    sec -= hou * houSec;
    let min = parseInt(sec / minSec);
    sec -= min * minSec;


    var arr = [day, hou, min, sec];
    var data = ['天', '小时', '分钟', '秒'];
    return arr.reduce((accu, val, index) => accu + val.toString() + data[index] + " ", "");
}