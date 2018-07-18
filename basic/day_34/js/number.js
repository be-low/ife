function isNum(numStr) {
    if (typeof numStr === 'number' && !isNaN(numStr)) return true;
    else if (typeof numStr === 'string') {
        let dot = 0;
        for (let i = 0; i < numStr.length; i++) {
            const s = numStr[i];
            if (s === '.') {
                dot++;
                continue;
            }
            if (s < '0' || s > '9' || dot > 1) return false;
        }
        return dot <= 1;
    }
    else return false;
}

// console.log(isNum('10'));
// console.log(isNum(10));
// console.log(isNum(100.101002));
// console.log(isNum('100.1024378.'));
// console.log(isNum(NaN));
// console.log(isNum('abcde'));