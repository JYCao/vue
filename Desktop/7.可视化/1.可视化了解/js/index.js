// rem适配
(function(){
function setFont() {
    // jQuery写
    let html = $('html');
    let width = html.width();
    if(width<1024) {
      width = 1024;
    };
    if(width>1920) {
      widht = 1920;
    };
    // console.log(width);
    let rootFontSize = width/80 + 'px';
    // 设置根元素的font-size
    html.css('font-size','rootFontSize');
}
  setFont();
  // 添加事件
  $(window).resize(function(){
    setFont();
  })
})();

(function(){
  $('monitor a').click(function(){
    let i = $(this).index();
    $('.monitor .content').eq(i).show().siblings('.content').hide();
    $(this).addClass('active').siblings().removeClass('active')
    // 需要克隆一个新的content
    $(this).clone().append(document.querySelector('.marquee'));


  });

(function(){

// 用echarts
// 初始化图表
  let myChart = echarts.init($('.pie')[0]);
  // 写配置项,在官网找
  let option = {

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },


    series: [
        {
            name: '半径模式',
            type: 'pie',
            radius: [20, 110],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true
                }
            },
            data: [
                {value: 10, name: 'rose1'},
                {value: 5, name: 'rose2'},
                {value: 15, name: 'rose3'},
                {value: 25, name: 'rose4'},
                {value: 20, name: 'rose5'},
                {value: 35, name: 'rose6'},
                {value: 30, name: 'rose7'},
                {value: 40, name: 'rose8'}
            ]
        },

    ]
};

  // 根据配置,生成图表
  myChart.setOption(option);


})();


})();