//获取窗口顶部到文档顶部的距离
function getScrollTop() {
    return document.documentElement.scrollTop;
}
//获取可视范围高度
function getClientHeight() {
    return document.documentElement.clientHeight;
}
//获取文档完整高度
function getScrollHeight() {
    return document.documentElement.scrollHeight;
}

function isLoad() {
    //误差范围
    let offset = 10;
    //由于scrollTop是一个浮点数，所以scrollTop + clientHeigth 会略小于scrollHeight,因此需要加上一个偏差值
    return getScrollTop() + getClientHeight() + offset >= getScrollHeight();
}

export {
    isLoad,
}