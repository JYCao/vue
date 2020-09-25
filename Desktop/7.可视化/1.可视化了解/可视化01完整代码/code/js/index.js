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


// ------------------------------  监控区域 ---------------------------
(function () {
  // 标签切换效果
  $('.monitor a').click(function () {
    let i = $(this).index();
    // console.log(i);
    $('.monitor .content').eq(i).show().siblings('.content').hide();
    $(this).addClass('active').siblings().removeClass('active');
  });

  // 把每个内容区的行（.row） 克隆一份。克隆之后，放到 div.marquee 中
  $.each($('.monitor .marquee'), function (i, item) {
    // item -- dom对象
    // console.log(this === item); // true
    // $(this) // 表示每一个 div.marquee 的jQuery对象
    let row10 = $(this).children().clone();
    $(this).append(row10);
  });
})();



// ------------------------------  点位监控区（饼图） ---------------------------
(function () {
  // 使用echarts的步骤（3步）
  // 1. 根据元素，初始化echarts
  // let myChart = echarts.init(显示图表的div);
  let myChart = echarts.init($('.pie')[0]);
  // 2. 编写配置项
  let option = {
    // 鼠标移入到图形上的提示
    tooltip: {
      // trigger: 'item', // 触发方式（明天再说）
      // {a} -- series 系列中的name
      // {b} -- series 系列中的 data 里面的 name
      // {c} -- series 系列中的 data 里面的 value
      // {d} -- 当前数据在所有数据中的占比
      formatter: '{b} = {c} ({d}%)'
    },

    // 颜色设置
    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],

    // 数据系列
    series: [
      {
        name: '分布统计',
        type: 'pie', // pie 表示图表的类型是饼图
        radius: ['10%', '70%'], // 半径
        center: ['50%', '50%'], // 圆心点
        roseType: 'radius', // 值为 radius，表示半径模式； area表示面积模式
        data: [
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '江苏' },
          { value: 25, name: '浙江' },
          { value: 30, name: '四川' },
          { value: 42, name: '湖北' }
        ],
        label: {
          fontSize: 10
        },
        labelLine: {
          length: 8, // 连接图形的线
          length2: 10 // 连接文字的线
        }
      }
    ]
  };
  // 3. 根据配置项，生成图表
  myChart.setOption(option);
})();