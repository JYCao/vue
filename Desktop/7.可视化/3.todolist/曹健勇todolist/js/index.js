// 入门函数
$(function () {
    // 数据增删改查
    // 存储数据
    let save = (a) => {
        localStorage.setItem('dataname', JSON.stringify(a));
    }
    // 获取数据
    let get = () => JSON.parse(localStorage.getItem('dataname')) || [];

    // 添加数据
    let add = (b) => {
        let data = get();
        data.push(b);
        save(data);
        return data;
    }


    // 删除数据
    let del = (index) => {
        let data = get();
        data.splice(index, 1);
        save(data);
        return data;
    }

    // 修改数据

    let change = (index, c) => {
        let data = get();
        data.splice(index, 1, c)
        save(data);
        return data;
    }

    // rem 适配
    function setFont() {
        let html = document.documentElement;
        let width = html.clientWidth;
        if (width < 1024) width = 1024;
        let fontSize = width / 80 + 'px';
        html.style.fontSize = fontSize;
    }
    setFont();
    window.onresize = function () {
        setFont();
    }

    // 存储数据
    $('#btn').click(() => {
        // 1. 从输入框获取数据
        let name = $('#name').val().trim();
        let score = $('#score').val().trim();
        let salary = $('#salary').val().trim();
        if (name === '' || score === '' || salary === '') {
            alert('必填项不能为空');
            return; // return会终止当前函数继续执行
        }
        // 设定传入的数据格式
        let newdata = {
            name: name,
            score: score,
            salary: salary,
        };
        //2.  将获取的数据添加到本地
        add(newdata);
        $('#name').val('');
        $('#score').val('');
        $('#salary').val('');
        renderHtml();
        getchart();
        lineChart();

    });
    // 把数据渲染到页面上
    let renderHtml = () => {

        let arr = get();
        let newarr = [];
        // 遍历数据,且将每一项都添加到得到的数组中
        arr.forEach((item, index) => {
            newarr.unshift(
                `
            <tr class = 'first'>
            <td>${item.name}</td>
            <td>${item.score}</td>
            <td>${item.salary}</td>

            <td >
                <a class="dele" href="javascript:" data-index = "${index}"><img style = "width:20px" src = 'imgs/del.png'></a>
                &nbsp; &nbsp;
                <a class="change" data = "${index}" href="javascript:"><img style = "width:20px" src = 'imgs/upd.png' ></a>
            </td>
        </tr>
        <tr class='second' style = "display:none">
        <td><input id = 'one' type ="text" value = '${item.name}'></td>
        <td><input id = 'two' type ="text" value = '${item.score}'></td>
        <td><input id = 'three' type ="text" value = '${item.salary}'></td>


        <td>
            <a class="yes" href="javascript:" data-index = "${index}"><img style = "width:20px" src = 'imgs/yes.png'></a>
            &nbsp; &nbsp;
            <a class="no" data = "${index}" href="javascript:"><img style = "width:20px" src = 'imgs/no.png' ></a>
        </td>
    </tr>`
            );
        });
        // 拼接字符串.并且将其移到页面上
        $('tbody').html(newarr.join(''));
    }

    renderHtml();
    let victory = false;
    // 添加删除功能
    $('body').on('click', '.dele', function () {
        if(victory) {
            alert("请先完成编辑");
            return ;
        }
        if (!confirm('是否确定删除')) {
            return;
        }

        // 找到索引
        let index = $(this).data('index');
        console.log(index);
        del(index); // 把本地存储中的数据删除
        getchart();
        lineChart();
        renderHtml(); // 重新渲染页面
    });




    // 柱状图
    let getchart = () => {
        // 将页面中的数据域图表联系到一起
        let data = get();    //获得了一个数组,承装者本地数据的数组
        // 分析需要一个数组把这些内容都给装进去
        // 遍历数组
        let arrN = [];
        let arrS = [];
        data.forEach((item, index) => {
            arrN.push(item.name);
            arrS.push(item.score);
        });
        arrN.reverse();
        arrS.reverse();


        // 图表
        // 1. 选定区域 初始化图表
        let mychart = echarts.init($('.top')[0]);
        // 2. 配置数据
        option = {
            title: {
                text: '评分图示',
                textStyle: {
                    color: '#fff'
                },

            },
            xAxis: {
                type: 'category',
                data: arrN,
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },

            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
            },
            series: [{
                data: arrS,
                type: 'bar',
                itemStyle: {
                    color: '#1e90ff'
                },

            }]
        };


        // 3. 数据域图表结合,生成图表
        mychart.setOption(option);


        // console.log(arrN);
        // console.log(arrS);

    }
    getchart();


    // 折线图
    let lineChart = () => {
        let data = get();    //获得了一个数组,承装者本地数据的数组
        // 分析需要一个数组把这些内容都给装进去
        // 遍历数组
        let arrN = [];
        let arrQ = [];
        data.forEach((item, index) => {
            arrN.push(item.name);
            arrQ.push(item.salary);
        });
        arrN.reverse();
        arrQ.reverse();

        // 折线图
        let linechart = echarts.init($('.bottom')[0]);

        let option = {
            title: {
                text: '薪资图示',
                textStyle: {
                    color: '#fff'
                },

            },
            xAxis: {
                type: 'category',
                data: arrN,
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
            },
            series: [{
                data: arrQ,
                type: 'line',
                itemStyle: {
                    color: '#1e90ff'
                },
            }]
        };



        linechart.setOption(option);
    }
    lineChart();


// 添加修改功能  
// 分析  1. 点击修改按钮 需要获取 动态标签 完成点击
// 进入编辑模式
$('body').on('click','.change',function(){
    if(victory) {
        alert("请先完成编辑");
        return ;
    }
    $(this).parents('.first').hide().next().show();
    victory = true;

});
// 退出编辑模式
$('body').on('click','.yes,.no',function(){
    $(this).parents('.second').hide().prev().show();
    victory = false;

});
// 修改数据,更新数据
let fix =  () => {
    $('body').on('click','.yes',function(){
        let index = $(this).data('index');
        let name = $(this).parents('tr').find('#one').val().trim();
        // let name = $(this).parent().siblings('#one').val();
        // 他的父元素是a  我一直理解错了
        let score = $(this).parents('tr').find('#two').val().trim();
        let salary = $(this).parents('tr').find('#three').val().trim();
        let obj = {
            name,
            score,
            salary,
        };
        change(index,obj);
        renderHtml();
        getchart();
        lineChart();
    
    });
}
fix();
// $('body').on('click','.yes',function(){
//     // 需要上传这个里面的数据
//     $(this).parent().val()
// })








































})