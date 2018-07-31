var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }
        }
    }
}

function logWithDepth(val, dep) {
    console.log("    ".repeat(dep) + val);
}

function listTreeWithDepth(node, depth) {
    if (node !== undefined) {
        logWithDepth(node.name, depth);
        listTreeWithDepth(node.left, depth + 1);
        listTreeWithDepth(node.right, depth + 1);
    }
}

function listTree() {
    listTreeWithDepth(tree, 0);
}

listTree();


// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(name) {
    var queue = [tree];
    while (queue.length !== 0) {
        var i = queue.shift();
        if (i.name === name) {
            return i.id;
        } else {
            if (i.left !== undefined) {
                queue.push(i.left);
            }
            if (i.right !== undefined) {
                queue.push(i.right);
            }

        }
    }
    return undefined;
}

console.log(findIdByName("Saber")); // >> 12
console.log(findIdByName("Kai")); // >> 10

// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(id) {
    var queue = [tree];
    while (queue.length !== 0) {
        var i = queue.shift();
        if (i.id === id) {
            return i.name;
        } else {
            if (i.left !== undefined) {
                queue.push(i.left);
            }
            if (i.right !== undefined) {
                queue.push(i.right);
            }

        }
    }
    return undefined;
}

console.log(findNameById(12)); // >> Saber
console.log(findNameById(10)); // >> Kai


// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR() {
    var list = [];

    function DLR(node) {
        if (node === undefined) return;
        list.push(node.name);
        DLR(node.left);
        DLR(node.right);
    }

    DLR(tree);
    return list;
}

console.log(getListWithDLR());

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR() {
    var list = [];

    function LDR(node) {
        if (node === undefined) return;
        LDR(node.left);
        list.push(node.name);
        LDR(node.right);
    }

    LDR(tree);
    return list;
}

console.log(getListWithLDR());

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD() {
    var list = [];

    function LRD(node) {
        if (node === undefined) return;
        LRD(node.left);
        LRD(node.right);
        list.push(node.name);
    }

    LRD(tree);
    return list;
}

console.log(getListWithLRD());