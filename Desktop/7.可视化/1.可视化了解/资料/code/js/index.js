// ------------------------------  rem 适配 ---------------------------
(function () {
  function setFont() {
    // 获取html
    let html = $('html');
    let width = html.width();
    // 判断临界点
    if (width < 1024) width = 1024;
    if (width > 1920) width = 1920;
    // console.log(width)
    let rootFontSize = width / 80 + 'px';
    // 设置根元素（html）的font-size
    html.css('font-size', rootFontSize);
  }
  setFont();
  // 当窗口改变大小的时候，重新设置html的font-size
  $(window).resize(function () {
    setFont();
  });
})();


// ------------------------------  休息休息 ---------------------------
(function () {

})();