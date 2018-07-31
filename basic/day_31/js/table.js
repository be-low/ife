class Select {
  constructor(json) {
    if (!(json === 'undefined' || json === undefined)) {
      let temp = JSON.parse(json);
      this.region = new Set(temp.region);
      this.product = new Set(temp.product);
    } else {
      this.region = new Set();
      this.product = new Set();
    }
  }

  toJson() {
    return JSON.stringify(this, (k, v) => {
      if (v instanceof Set)
        return [...v];
      else
        return v;
    });
  }

  save() {
    localStorage.setItem('select', this.toJson());
  }
}

function syncDom() {
  selectObj = new Select(localStorage.getItem('select'));
  for (let i in selectObj) {
    let e = selectObj[i], b = selectDom[i];
    let children = b.children;
    for (let j of children) {
      if (e.has(j.value)) {
        j.classList.add(ac);
      } else {
        j.classList.remove(ac);
      }
    }
  }
}

function syncObj() {
  for (let i in selectDom) {
    let children = selectDom[i].children;
    for (let j of children) {
      if (j.classList.contains(ac)) {
        selectObj[i].add(j.value);
      } else {
        selectObj[i].delete(j.value);
      }
    }
  }
}

function updateStyle(target) {
  let parent = null;
  for (let i in selectDom) {
    const e = selectDom[i];
    if (e === target.parentNode) {
      parent = e;
      break;
    }
  }
  const children = parent.children;
  if (target.value === 'full') {
    for (let j = 0; j < children.length; ++j) {
      if (target.classList.contains(ac)) {
        children[j].classList.remove(ac);
      } else {
        children[j].classList.add(ac);
      }
    }
  } else {
    target.classList.toggle(ac);
    let all = true;
    for (let j = 0; j < children.length - 1; ++j) {
      all = all && children[j].classList.contains(ac);
    }
    if (all) parent.lastElementChild.classList.add(ac);
    else parent.lastElementChild.classList.remove(ac);
  }
}

function dataFilter() {
  return sourceData.filter(elem => {
    let result = true;
    for (const key in selectObj) {
      if (selectObj[key] !== undefined)
        result = result && selectObj[key].has(elem[key]);
    }
    return result;
  });
}

function updateTBody() {
  let data = dataFilter();
  if (data.length > 0) {
    let templates = generateTemplate(data);
    tBody.innerHTML = templates.reduce((accu, elem, index) =>
                                           accu + elem.replace('&product',
                                                               data[index].product).
                                                       replace('&region',
                                                               data[index].region).
                                                       replace('&sale',
                                                               data[index].sale.reduce(
                                                                   (
                                                                       accu2,
                                                                       elem) => accu2 +
                                                                       '<td contenteditable="true">' +
                                                                       elem +
                                                                       '</td>',
                                                                   '')), '');
  } else
    tBody.innerHTML = '';
}

function generateTemplate(data) {
  let size = data.length || 0;
  let regionNum = selectObj.region.size || 0,
      productNum = selectObj.product.size || 0,
      templates = new Array(size || 0);
  const tempPR = '<tr><td contenteditable="true" rowspan="0">\&product</td><td contenteditable="true">\&region</td>\&sale</tr>',
      tempR = '<tr><td contenteditable="true">\&region</td>\&sale</tr>',
      tempRP = '<tr><td contenteditable="true" rowspan="0">\&region</td><td contenteditable="true">\&product</td>\&sale</tr>',
      tempP = '<tr><td contenteditable="true">\&product</td>\&sale</tr>';
  templates.fill('');
  if (productNum === 1) {
    templates = templates.map((elem, index) => {
      if (index === 0)
        return tempPR;
      else
        return tempR;
    });
  } else if (regionNum === 1) {
    templates = templates.map((elem, index) => {
      if (index === 0)
        return tempRP;
      else
        return tempP;
    });
  } else {
    //这里大概很复杂
    let templateTemp = '<tr><td contenteditable="true" rowspan="\&num">\&product</td><td contenteditable="true">\&region</td>\&sale</tr>';
    let index = 0,
        num = 1;
    for (let i = 1; i < size; ++i) {
      let node = data[i];
      if (node.product === data[index].product) {
        num++;
        templates[i] = tempR;
      } else {
        templates[index] = templateTemp.replace('&num', num);
        num = 1;
        index = i;
      }
    }
    templates[index] = templateTemp.replace('&num', num);
  }
  return templates;
}

function createElements(tag, texts, attributes) {
  let elems = [];
  for (const item of texts) {
    let elem = document.createElement(tag);
    elem.innerHTML = item;
    for (const attr in attributes) {
      elem[attr] = attributes[attr];
    }
    elems.push(elem);
  }
  return elems;
}

function updateTHead() {
  let isProductFirst = true;
  if (selectObj.product.size > 1 && selectObj.region.size === 1)
    isProductFirst = false;
  if (isProductFirst) {
    tHeadData[0] = '商品';
    tHeadData[1] = '地区';
  } else {
    tHeadData[0] = '地区';
    tHeadData[1] = '商品';
  }
  let nodes = tHead.children;
  for (let i = 0; i < nodes.length; ++i) {
    if (nodes[i].innerHTML !== tHeadData[i]) {
      nodes[i].innerHTML = tHeadData[i];
    }
  }
}