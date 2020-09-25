// 切换
$('.monitor').on('click', '.tabs a', function () {
    $(this).addClass('active').siblings().removeClass('active')
    $('.monitor .content').eq(this.dataset.index).show().siblings('.content').hide()
});
$('.marquee').each(function () {
    var $cloneList = $(this).children().clone()
    $(this).append($cloneList)
});
(function () {
    // 使用echarts的步骤（1. 初始化echarts  2. 编写配置项  3. 生成图表）
    var option = {
        // 提示
        tooltip: {
            // 提示的触发方式  item（鼠标放到图上提示）  axis（对于有轴的图形才有效）
            trigger: 'item',
            // {a} 表示 series里面的name
            // {b} 表示 series里面的data里面的name
            // {c} 表示 series里面的data里面的value
            // {d} 表示 当前数据 / 数据总和
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图标系列数据
        series: [
            {
                name: '半径模式',
                // type: 'pie' 表示它是饼图类型
                type: 'pie',
                // 半径 [30, 100]，用百分比更好一点，因为我们的项目考虑rem适配
                radius: ['10%', '70%'],
                // 圆心点的坐标
                center: ['50%', '50%'],
                // 饼图的体现数据的模式（radius表示半径模式； area表示面积模式）
                roseType: 'radius',
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
                // 设置标签上的文字
                label: {
                    fontSize: 10
                },
                labelLine: {
                    // length 连接图标的线
                    length: 8,
                    // length2 是连接文字的线
                    length2: 10
                }
            }
        ],
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
    };
    // var myChart = echarts.init(具有宽高的盒子的DOM对象);
    myChart = echarts.init($('.pie')[0]);
    myChart.setOption(option);
})();

// 柱状图,用户总量统计
(function () {
    let chart = echarts.init($('.bar')[0]);
    var item = {
        value: 1200,
        tooltip: {
            extraCssText: 'opacity:0',
        },
        itemStyle: {
            color: 'gray',
        },
        emphasis: {
            itemStyle: {
                color: 'gray',
            },
        },
    };
    let option = {
        tooltip: {
        },
        xAxis: {
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            axisLabel: {
                color: '#0068d0',

            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#0068d0',
            },
            // y轴分割线设置
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#0068d0',
                }
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        series: [{
            name: '用户统计',
            data: [2100, 1900, 1700, 1560, item, item, item, 1200, 900, 750, 600, 480, 240],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            },
            barWidth: '60%',
            itemStyle: {
                // 渐变颜色
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#00f8f9' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#0063ce' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
        }],
        grid: {
            show: true,
            top: '10%',
            right: '10%',
            bottom: '10%',
            left: '10%',
            containLabel: true,
            borderColor: '#0068d0',

        },

    };


    chart.setOption(option);
})();




// 订单量切换


(function () {
    let data = [
        { order: '100', eat: '400' },
        { order: '200', eat: '300' },
        { order: '300', eat: '200' },
        { order: '400', eat: '100' },

    ];
    $(".order a").click(function () {

        // 点击的按钮样式切换
        $(this).addClass("active").siblings().removeClass("active");
        // 下面内容的切换,这里实际上是上面两个曲线的的切换
        let i = $(this).index();
        $('.order h4').eq(0).html(data[i].order);
        $('.order h4').eq(1).html(data[i].eat);

    });

    // 定时器
    let i = 0

    var time = setInterval(() => {
        i++;
        if (i == 4) i = 0;
        $('.order a').eq(i).click();
    }, 1000)
    $('.order').hover(function () {
        clearInterval(time);
    }, function () {
        time = setInterval(() => {
            i++;
            if (i == 4) i = 0;
            $('.order a').eq(i).click();
        }, 1000)
    });

})();








// 折线图
(function () {

    let lineChart = echarts.init($('.line')[0]);

    let data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    };



    let option = {
        // 鼠标放入有提示
        tooltip: {
            // 鼠标放到轴线上触发提示
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: {
                show: false
            },
            axisLabel: {

                color: '#006dd1',
            },
            // 两端留白方式.默认为true
            boundaryGap: false,
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            // 设置轴线
            axisLine: {
                show: false
            },
            // 修改y轴分割线
            spliteLine: {
                lineStyle: {
                    color: 'red',
                },
            },
            // 修改轴上面文字颜色
            axisLabel: {

                color: '#006dd1',
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: '#006dd1',
                },
            },

        },
        // 添加图例
        legend: {
            // 系列里面要有名字,他就是图例显示的内容
            // 图例内容的颜色
            right: '20%',
            textStyle: {
                color: '#4c9bfd'
            }

        },
        series: [{
            name: '长生',
            data: data.year[0],
            type: 'line',
            // 线改成了 平滑的曲线
            smooth: true,
            // 他还能改变图例颜色
            itemStyle: {
                color: 'green'
            },
            // lineStyle: {
            //     color: 'green',
            // },
        },
        {
            name: '永久',
            data: data.year[1],
            type: 'line',
            // 线改成了 平滑的曲线
            smooth: true,
            // 他还能改变图例颜色
            itemStyle: {
                color: 'red'
            },
            // lineStyle: {
            //     color: 'green',
            // },
        },

        ],
        // 网格设置,与网格相关的
        grid: {
            show: true,
            top: '20%',
            right: '3%',
            bottom: '3%',
            left: '3%',
            containLabel: true,
            borderColor: '#0187d9',
        },
        // 可以统一配置颜色
        // color: ['red','green']
    };



    lineChart.setOption(option);

    // 添加切换效果

    $(".sales a").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        // 获取data-xxx 属性值的
        // 1. 用attr 获取
        let key = $(this).attr('data-type');
        // 2. 用data 获取
        // let key = $(this).data('type');
        // 3. 用dataset获取  他是html5新增的 属性
        // let key = this.dataset.type;
        option.series[0].data = data[key][0];
        option.series[1].data = data[key][1];
        // 配置数据改变,生成新的图表
        lineChart.setOption(option);
    });
    let i = 0
    let time = setInterval(() => {
        i++;
        if (i == 4) i = 0;
        $('.sales a').eq(i).click();
    }, 1000);

    // 鼠标移入 动态停止  鼠标离开继续执行定时器
    $('.sales').hover(function () {
        clearInterval(time);
    }, function () {
        time = setInterval(() => {
            i++;
            if (i == 4) i = 0;
            $('.sales a').eq(i).click();
        }, 1000);
    })
})();



// 一季度销售进度
(function () {

    let piechart = echarts.init($('.gauge')[0]);
    let all = 200;
    let bottom = all*0.5;
    let self = 50;
    let right = all*0.5-self;
    let option = {
        
        series: [
            {
                name: '访问来源',
                type: 'pie',
                // 改变圆的大小
                radius: ['110%', '130%'],
                // 改变圆心点
                center: ['48%', '80%'],
                avoidLabelOverlap: false,
                // 去除鼠标放上缩放的动画效果
                hoverAnimation: false,
                // 调角度
                startAngle: 180,
                // 去掉标签
                label: {
                    show: false,
                    position: 'center'
                },
                data: [
                    {
                        value: self, name: '直接访问', itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#01f3f8' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#006ad0' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    {
                        value: right, name: '邮件营销', itemStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    {
                        value: bottom, name: '联盟广告', itemStyle: {
                            opacity: 0,
                        },
                    },

                ],
            }
        ]
    };



    piechart.setOption(option);






})();
