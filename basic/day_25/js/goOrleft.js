// import {isNum} from "../../day_22/js/common";
function isNum(num) {
    if (typeof num === "number" && !isNaN(num))
        return true;
}

function Go() {
    console.log("Go");
}

function GoSteps(n) {
    if (n === undefined) n = 1;
    if (!isNum(n)) {
        if (typeof n === "string")
            n = parseInt("n");
        else if (typeof n === "boolean")
            n = n === true ? 1 : 0;
        else
            return;
    } else if (!Number.isInteger(n)) {
        n = parseInt(n);
    }
    n = n < 0 ? 0 : n;
    // console.log("n = " + n);
    for (let i = 0; i < n; ++i)
        Go();
}

console.log("10 times");
GoSteps(10); // Go 10次


console.log("1 times");
GoSteps(1); // Go 1次


console.log("1 times");
GoSteps(); // Go 1次，认为缺少参数时，默认参数为1


console.log("0 times");
GoSteps(0); // 0次


console.log("0 times");
GoSteps(-1); // 0次


console.log("1 times");
GoSteps(1.4); // Go 1次


console.log("1 times");
GoSteps(1.6); // Go 1次


console.log("0 times");
GoSteps(-1); // 0次


console.log("1 times");
GoSteps(true); // Go 1次


console.log("0 times");
GoSteps(false); // 0次


console.log("0 times");
GoSteps("Test"); // 0次


console.log("0 times");
GoSteps(NaN); // 0次


console.log("0 times");
GoSteps(null); // 0次