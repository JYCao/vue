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
  // 1. 初始化图表
  let myChart = echarts.init($('.pie')[0]);
  // 2. 配置项
  let option = {
    // 提示工具
    tooltip: {
      trigger: 'item', // 鼠标放到每一项上，然后提示。默认值就是它; 可选axis，表示鼠标放到轴线上触发
      // show: false,
      /**
       * {a} -- 表示series中的name
       * {b} -- 表示series里面的data里面的name
       * {c} -- 表示series里面的data里面的value
       * {d} -- 表示当前这项数据，在所有数据中的占比
       */
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: '点位分布',
        type: 'pie', // 图的类型，pie表示饼图；bar表示柱状图；line表示折线图
        radius: ['10%', '70%'],
        center: ['50%', '50%'],
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
        // 标签的设置
        label: {
          fontSize: 10  // 标签文字大小设置
        },
        labelLine: {
          length: 8, // 连接图形的线的长度
          length2: 10 // 连接文字的线的长度
        }
      }
    ],
    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
  };
  // 3. 生成图表
  myChart.setOption(option);
})();



// ------------------------------  用户总量统计（柱状图） ---------------------------
(function () {
  // 设置一个变量，表示单个柱子的设置
  let item = {
    value: 1200,
    // 柱子默认的颜色
    itemStyle: {
      color: '#254065'
    },
    // 鼠标放到柱子上的样式
    emphasis: {
      itemStyle: {
        color: '#254065'
      }
    },
    // 单个柱子的提示
    tooltip: {
      show: false
      // extraCssText: 'opacity: 0' // 允许自定义css样式来美化提示
    }
  };
  let option = {
    // 提示
    tooltip: {},
    // x轴
    xAxis: {
      type: 'category',
      data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
      // 坐标轴刻度设置
      axisTick: {
        // 设置刻度和柱子的对齐关系，true表示让刻度在柱子中间；false表示让柱子在两个刻度之间
        alignWithLabel: true,
        // 控制刻度是否显示
        show: false,
        // 坐标轴刻度颜色
        // lineStyle: {
        //   color: '#4c9bfd'
        // }
      },
      // x轴文字颜色设置
      axisLabel: {
        color: '#4c9bfd'
      }
    },
    // y轴
    yAxis: {
      type: 'value',
      // 坐标轴刻度设置
      axisTick: {
        // 设置刻度和柱子的对齐关系，true表示让刻度在柱子中间；false表示让柱子在两个刻度之间
        alignWithLabel: true,
        // 控制刻度是否显示
        show: false,
        // 坐标轴刻度颜色
        // lineStyle: {
        //   color: '#4c9bfd'
        // }
      },
      // x轴文字颜色设置
      axisLabel: {
        color: '#4c9bfd'
      },
      // 分割线
      splitLine: {
        lineStyle: {
          // color: ['red', 'green']
          color: 'rgba(0, 240, 255, 0.3)'
        }
      }
    },
    // 网格设置（grid） -- 主要设置图表的位置，线的颜色等等
    grid: {
      top: '3%',
      right: '3%',
      bottom: '3%',
      left: '0%',
      // 网格区域是否包含坐标轴的刻度标签。
      containLabel: true,
      borderColor: 'rgba(0, 240, 255, 0.3)',
      show: true
    },
    // 图表的数据
    series: [{
      data: [
        2100,
        1900,
        1700,
        1560,
        1400,
        item,
        item,
        item,
        900,
        750,
        600,
        480,
        240
      ],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)'
      },
      // 设置柱子的宽度
      barWidth: '60%'
    }],
    color: {
      type: 'linear', // linear表示线性渐变；radial表示径向渐变
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: '#00fffb' // 0% 处的颜色
      }, {
        offset: 1, color: '#0061ce' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }
  };

  let myChart = echarts.init($('.bar')[0]);
  myChart.setOption(option);
})();



// ------------------------------  订单量 ---------------------------
(function () {
  // 1. 准备数据
  var data = [
    { orders: '20,301,987', amount: '99834' },
    { orders: '301,987', amount: '9834' },
    { orders: '1,987', amount: '3834' },
    { orders: '987', amount: '834' }
  ];

  // 2. 单击标签的时候，完成标签切换效果
  $('.order a').click(function () {
    // 2.1) 切换当前的标签样式
    $(this).addClass('active').siblings().removeClass('active');
    // 2.2) 修改数据
    let i = $(this).index();
    $('.order h4').eq(0).text(data[i].orders); // 修改订单量
    $('.order h4').eq(1).text(data[i].amount); // 修改销售额
  });

  // 3. 加入定时器，让标签及内容自动切换
  let i = 0;
  setInterval(() => {
    i++;
    // 加入临界条件，因为i不能无限增大
    if (i === 4) i = 0; // 如果i是4，重置i为0
    $('.order a').eq(i).click();
  }, 2000);
})();


// ------------------------------  销售额（折线图） ---------------------------
(function () {
  var data = {
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
  // 1. 配置项
  let option = {
    // 网格设置
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true,// 显示边框
      // 让网格包括 x、y轴文字
      containLabel: true,
      borderColor: '#012f4a'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 设置轴线隐藏
      axisLine: {
        show: false
      },
      // 文字颜色
      axisLabel: {
        color: '#4c9bfd'
      },
      // 坐标轴两边的留白策略
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      // 设置轴线隐藏
      axisLine: {
        show: false
      },
      // 分割线
      splitLine: {
        lineStyle: {
          color: '#012f4a'
        }
      },
      // 文字颜色
      axisLabel: {
        color: '#4c9bfd'
      }
    },
    // 图例
    legend: {
      textStyle: {
        color: '#4c9bfd'
      }
    },
    series: [
      {
        name: '预期销售额',
        data: data.year[0],
        type: 'line',
        // smooth 设置为true，表示线使用平滑的线
        smooth: true,
        itemStyle: {
          color: '#00f2f1'
        }
      }, {
        name: '实际销售额',
        data: data.year[1],
        type: 'line',
        // smooth 设置为true，表示线使用平滑的线
        smooth: true,
        itemStyle: {
          color: '#ed3f35'
        }
      }
    ],
    // color: ['red', 'green']
    tooltip: {
      // 鼠标放到轴线上触发提示
      trigger: 'axis'
    }
  };

  // 2. 初始化
  let myChart = echarts.init($('.line')[0]);
  // 3. 生成图表
  myChart.setOption(option);

  // 给每个标签注册单击事件，点击的时候，切换数据
  $('.sales a').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    // 获取a标签的 data-type 自定义属性值
    // let key = $(this).attr('data-type');
    // let key = $(this).data('type');
    // dataset是h5中新增的属性，用于获取 data-xxx 属性值的
    // this 就是DOM对象  ===> $(this) 变成jQuery对象 ===> $(this)[0] 变成DOM对象
    let key = this.dataset.type;
    // console.log(key); // 输出的结果是： year  quarter month week
    // 更换图表中的数据
    option.series[0].data = data[key][0];
    option.series[1].data = data[key][1];
    // 配置项改变了。所以要重新生成图表
    myChart.setOption(option);
  });

  // 加入定时器，让图表自行切换
  let i = 0;
  let timer = setInterval(() => {
    i++;
    // 判断临界点
    if (i === 4) i = 0;
    $('.sales a').eq(i).click();
  }, 1000);

  // 鼠标移入到最大的 div.sales 中，清除定时器
  $('.sales').hover(function () {
    // 鼠标移入，清除定时器
    clearInterval(timer);
  }, function () {
    // 鼠标离开，继续执行定时器
    timer = setInterval(() => {
      i++;
      // 判断临界点
      if (i === 4) i = 0;
      $('.sales a').eq(i).click();
    }, 1000);
  });

})();


// ------------------------------  一季度销售进度 ---------------------------
(function () {
  // 用变量表示数据
  let all = 200;
  let bottom = all * 0.5;
  let left = 80; // 真实的数据
  let right = all * 0.5 - left;

  let option = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['130%', '150%'], // 半径
        center: ['48%', '80%'], // 修改圆的圆心点
        // 调整起始角度
        startAngle: 180,
        hoverAnimation: false, // 是否开启 hover 在扇区上的放大动画效果。
        // hoverOffset: 0, // 高亮扇区的偏移距离。

        // 把 向触手 一样的标签去掉
        label: {
          show: false,
          position: 'center'
        },

        data: [
          {
            value: left,
            name: '直接访问',
            itemStyle: {
              color: {
                type: 'linear', // linear表示线性渐变；radial表示径向渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#00fffb' // 0% 处的颜色
                }, {
                  offset: 1, color: '#0061ce' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
          {
            value: right,
            name: '邮件营销',
            itemStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          {
            value: bottom,
            name: '联盟广告',
            itemStyle: {
              opacity: 0
            }
          }
        ]
      }
    ]
  };
  let myChart = echarts.init($('.gauge')[0]);
  myChart.setOption(option);
})();



// ------------------------------  排行榜 ---------------------------
(function () {
  let data = [
    { name: '可爱多', num: '9,086' },
    { name: '娃哈哈', num: '8,341' },
    { name: '喜之郎', num: '7,407' },
    { name: '八喜', num: '6,080' },
    { name: '小洋人', num: '6,724' },
    { name: '好多鱼', num: '2,170' },
  ];

  // 遍历数据，拼接 li 标签，最后，把拼接得到的 6 个li标签，放到 ul.sub 里面
  function showData() {
    /**
     * 箭头函数：
     *  = 和 > 之间不能有空格
     *  () 和 => 之间不能换行
     *  => 和 {} 之间可以换行
     *  如果只有一个形参，可以省略 ()
     *  函数体只有一行代码，可以省略大括号。并且表示返回函数体
     */
    // 先将 data 数组，打乱，然后再去遍历
    data = data.sort((a, b) => 0.5 - Math.random());
    let arr = [];
    data.forEach(item => {
      // 遍历一次，向数组中添加一个单元
      arr.push(`<li>
                  <span>${item.name}</span>
                  <span>${item.num} <s class="icon-up"></s></span>
                </li>`);
    });
    // console.log(arr.join(''))
    $('ul.sub').html(arr.join(''));
  }
  // showData();

  // 找到 标签（各个省份），注册鼠标移入事件
  $('ul.sup li').mouseenter(function () {
    $(this).addClass('active').siblings().removeClass('active');
    showData();
  });
  // 页面刷新，先触发第一个标签的鼠标移入事件
  $('ul.sup li').eq(0).mouseenter();


  // 加入定时器，实现自动切换
  let i = 0;
  let timer = setInterval(() => {
    i++;
    console.log(i)
    if (i === 5) i = 0;
    $('ul.sup li').eq(i).mouseenter();
  }, 2000);

  /**
   * 下面代码的问题：
   * 因为hover事件，相当于 mouseenter和mouseleave；
   * 当定时器走的时候，触发了 mouseenter事件，相当于触发了 hover事件
   * hover事件触发了，就会清除定时器。
   */
  // 最好，加一个鼠标移入，让定时器暂停
  // $('ul.sup').hover(function () {
  //   console.log('aa');
  //   clearInterval(timer);
  // }, function () {
  //   console.log('bb')
  //   timer = setInterval(() => {
  //     i++;
  //     if (i === 5) i = 0;
  //     $('ul.sup li').eq(i).mouseenter();
  //   }, 2000);
  // });

})();



(function () {
  let myChart = echarts.init( $('.geo')[0] );
  myChart.setOption(option);
})();