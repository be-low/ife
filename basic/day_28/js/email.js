var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var input = document.getElementById("email-input");
var sense = document.getElementById("email-sug-wrapper");
//上次输入内容的拷贝
//用于与当前输入内容对比
var lastInContent = null;
//当前选中项的索引
var currentPos = 0;
//init
input.focus();
input.oninput = function (e) {
    let inContent = input.value.trim();
    if (inContent != lastInContent) {
        lastInContent = inContent;
        removeChilds(sense);
        if (inContent != "") {
            if (inContent.includes('@')) {
                let emailArr = inContent.split("@");
                let prefix = emailArr[0];
                let filter = emailArr[1];
                addInteliSense(prefix, filter);
            } else {
                addInteliSense(inContent);
            }
        }
    }
}

input.onkeyup = function (e) {
    // console.log(e.key);
    switch (e.key) {
        case 'ArrowUp':
            currentPos = currentPos > 0 ?
                currentPos - 1 : sense.childElementCount - 1;
            toHover(currentPos);
            break;
        case 'ArrowDown':
            currentPos = currentPos < sense.childElementCount - 1 ?
                currentPos + 1 : 0;
            toHover(currentPos);
            break;
        case 'Enter':
            enterSense(sense.children[currentPos]);
            break;
        case 'Escape':
            input.select();
            break;
        default:
            currentPos = 0;
            toHover(currentPos);
            break;
    }

}
sense.onclick = function (e) {
    enterSense(e.target);
    input.focus();
}

sense.onmouseover = function (e) {
    toHover(e.target)
}

function enterSense(target) {
    if (target != undefined) {
        input.value = htmlDecode(target.innerHTML);
        sense.classList.add("d-none");
    }
}
//target 可以接受索引或对象类型的参数
function toHover(target) {
    let childs = sense.children;
    if (childs.length > 0) {
        for (var i = 0; i < childs.length; ++i) {
            //如果为对象，在这判断并添加样式，并与当前选中的索引同步
            if (childs[i] === target) {
                currentPos = i;
                target.classList.add("hover");
            } else {
                childs[i].classList.remove("hover");
            }
        }
        if (Number.isInteger(target) && target <= childs.length) {
            childs[target].classList.add("hover");
        }
    }
}


function removeChilds(parent) {
    while (parent.childNodes.length > 1) {
        parent.removeChild(parent.childNodes[1]);
    }
}


function addInteliSense(prefix, filter) {
    prefix = htmlEncode(prefix);
    if (filter) {
        let senseArr = postfixList.filter(elem =>
            elem.includes(filter)).map(elem =>
            prefix + "@" + elem
        );
        addNodes(sense, senseArr);
    } else {
        let senseArr = postfixList.map(elem => prefix + "@" + elem);
        addNodes(sense, senseArr)
    }
    sense.classList.remove("d-none");
    sense.children[currentPos].classList.add("hover");
}

function addNodes(parent, arr) {
    for (let item of arr) {
        let node = document.createElement("li");
        node.innerHTML = item;
        parent.appendChild(node);
    }
}