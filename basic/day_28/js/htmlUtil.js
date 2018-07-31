function htmlEncode(content) {
    if (content.length === 0) return "";
    return String(content)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function htmlDecode(content) {
    if (content.length === 0) return "";
    return String(content)
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

function printStrCode(str) {
    let codeStr = "";
    for (let i in str) {
        codeStr += str.charCodeAt(i) + " ";
    }
    console.log(codeStr);
}

// let c = "<input id=>'''\"&asc ,,<script>";
// console.log(htmlEncode(c));
// console.log(htmlDecode(htmlEncode(c)));