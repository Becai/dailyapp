//获取滚动条当前位置
function getScrollTop() {
    let scrollTop = document.documentElement.scrollTop;
    return scrollTop;
}
//获取可视范围高度
function getClientHeight() {
    let clienHeight = document.documentElement.clientHeight;
    return clienHeight;
}
//获取文档完整高度
function getScrollHeight() {
    let scrollHeight = document.documentElement.scrollHeight;
    return scrollHeight;
}

function isLoad() {
    //误差范围
    let offset = 10;
    return getScrollTop() + getClientHeight() + offset >= getScrollHeight();
}

export{
    isLoad,
}