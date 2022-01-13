(function () {
    function getStyle(dom, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(dom, false)[attr];
        }
        return dom.currentStyle[attr];
    }
    function getParentWidth(dom) {
        let parent = dom.parentNode;
        if (parent.nodeType !== 1) {
            return null;
        }
        let style = getStyle(parent, false);
        let paddingLeft = parseFloat(style['paddingLeft']);
        let paddingRight = parseFloat(style['paddingRight']);
        let width = parent.clientWidth - (paddingLeft + paddingRight);
        return width;
    }
    let init = function () {
        return function (selectorString) {
            let oWrap = document.querySelector(selectorString);
            if (!oWrap) {
                console.warn('参数必须是dom selector string');
                return;
            }
            let wrapStyle = getStyle(oWrap, false);
            let paddingLeft = parseFloat(wrapStyle['paddingLeft']);
            let paddingRight = parseFloat(wrapStyle['paddingRight']);
            let maxWidth = oWrap.clientWidth - (paddingLeft + paddingRight);
            let imgs = oWrap.querySelectorAll('img');
            if (imgs.length < 1) { return false }
            for (let idx = 0, len = imgs.length; idx < len; idx++) {
                let img = imgs[idx];
                if (img.loaded) {
                    continue;
                }
                let parentWidth = getParentWidth(img) || maxWidth;
                let ratio = parseFloat(img.getAttribute('ratio')) || 1;
                let parentHeight = parentWidth * ratio;
            }
        }
    }
    let lazyImg = init();
    window.lazyImg = lazyImg;
})();