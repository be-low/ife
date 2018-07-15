var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    },
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    },
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}

function convertToArray(obj) {
    var arr = [];
    for (var i in obj) {
        var temp = [];
        temp.push(i);
        var objTemp = obj[i];
        for (var j in objTemp) {
            temp.push(objTemp[j]);
        }
        arr.push(temp);
    }
    return arr;
}

console.log("对象转数组");

console.log(scoreObject);
console.log(convertToArray(scoreObject));

var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];

function Menu(arr) {
    function recInsert(obj, id, name, path, pos, prefix) {
        const depth = path.length - 1;
        if (pos === depth) {
            obj[id] = {};
            obj[id].name = name;
        } else {
            let tag = prefix;
            if (pos === 0) {
                tag += path[pos];
            } else {
                tag += "-" + path[pos];
            }
            for (let index in obj) {
                let objTemp = obj[index];
                if (objTemp.name === tag) {
                    if (!objTemp.hasOwnProperty('subMenu')) objTemp.subMenu = {};
                    recInsert(obj[index].subMenu, id, name, path, pos + 1, tag);
                }
            }
        }
    }

    const prefix = 'Area';
    for (const item of arr) {
        const _path = item[1].substr(prefix.length).split('-');
        recInsert(this, item[0], item[1], _path, 0, prefix);
    }
}

console.log("数组转对象");
console.log(menuArr);
console.log(new Menu(menuArr));