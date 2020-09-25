/****************************** 本地存储数据操作 *****************************/
/**
 * 获取数据
 */
function get() {
    return JSON.parse(localStorage.getItem('project')) || [];
}

/**
 * 向本地存储中存入数据
 * @param {string} data 待存储的数据
 */
function save(data) {
    localStorage.setItem('project', JSON.stringify(data));
}

/**
 * 向本地存储的 project 中加入一条新数据
 * @param {object} newData 新增的一条数据，例如 {username: 'zs', score: 99, salary: 1.2}
 */
function add(newData) {
    let data = get();
    data.unshift(newData);
    save(data);
}

/**
 * 从本地存储的 project 中删除一条数据
 * @param {number} index 将被删除数据在所有数据中的位置
 */
function del(index) {
    let data = get();
    data.splice(index, 1);
    save(data);
}

/**
 * 修改本地存储 project 中的一条数据
 * @param {number} index 将被删除数据在所有数据中的位置
 * @param {object} newData 新增的一条数据，例如 {username: 'zs', score: 99, salary: 1.2}
 */
function update(index, newData) {
    let data = get();
    data.splice(index, 1, newData);
    save(data);
}


/****************************** echarts相关封装 ***********************************/

/**
 * 获取所有数据，并拆分成echarts图表所需的数据（x轴所需数据，柱状图所需数据，折线图所需数据）
 * @returns {object} 一个包括三项数据的对象
 */
function splitData() {
    let data = get();
    let xAxisData = [];
    let barData = [];
    let lineData = [];
    data.forEach(item => {
        xAxisData.push(item.username);
        barData.push(item.score);
        lineData.push(item.salary);
    });
    return { xAxisData, barData, lineData }
}

/**
 * 
 * @param {object} param0 一个包含盒子的DOM对象、图表类型、图表数据、标题的对象
 */
function createChart({ data, type, box, title }) {
    let option = {
        title: {
            text: title,
            textStyle: {
                color: '#fff'
            },
            left: '2%',
            top: '2%'
        },
        grid: {
            containLabel: true,
            top: '15%',
            right: '2%',
            bottom: '2%',
            left: '2%',
        },
        xAxis: {
            type: 'category',
            // 轴线设置（设置之后，文字也跟着变化）
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            data: splitData().xAxisData // 因为两个图表x轴标签一样，所以这里不设为形参
        },
        yAxis: {
            type: 'value',
            // 去掉 y轴 分割线
            splitLine: {
                show: false
            },
            // 轴线设置（设置之后，文字也跟着变化）
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [{
            data: data,
            type: type
        }],
        color: ' #2e90f9'
    };
    let myChart = echarts.init(box);
    myChart.setOption(option);
}


/****************************** 渲染页面的函数 *********************************/
function render() {
    let data = get();
    let arr = [];
    data.forEach((item, index) => {
        arr.push(`<tr class="noedit">
                    <td>${item.username}</td>
                    <td>${item.score}</td>
                    <td>${item.salary}</td>
                    <td>
                        <img src="imgs/upd.png" data-index="${index}" alt="">
                        <img src="imgs/del.png" data-index="${index}" alt="">
                    </td>
                </tr>
                <tr class="edit">
                    <td><input type="text" value="${item.username}" class="username"></td>
                    <td><input type="number" value="${item.score}" class="score"></td>
                    <td><input type="number" value="${item.salary}" class="salary"></td>
                    <td>
                        <img src="imgs/yes.png" data-index="${index}" alt="">
                        <img src="imgs/no.png" data-index="${index}" alt="">
                    </td>
                </tr>`
        );
    });
    $('tbody').html(arr.join(''));
    // 调用生成图表的函数。重新渲染页面，就要重新生成图表
    createChart({
        box: $('.bar')[0],
        type: 'bar',
        title: '评分图示',
        data: splitData().barData
    });
    createChart({
        box: $('.line')[0],
        type: 'line',
        title: '薪资图示',
        data: splitData().lineData
    });
}

// 调用render，初始化
render();


/****************************** 页面增删改操作 *********************************/

// 全局变量，表示是否为编辑模式（编辑模式不允许删除、新增、也不允许修改其他数据）
let isEdit = false;

// 新增数据
$('button').on('click', function () {
    // 判断是否为编辑模式
    if (isEdit) return alert('请先完成修改操作');
    // 获取三项数据
    let username = $('#username').val().trim();
    let score = $('#score').val().trim();
    let salary = $('#salary').val().trim();
    // 判断是否为空
    if (username == '' || score == '' || salary == '') {
        return alert('值不能为空');
    }
    // 添加到本地存储中
    add({ username, score, salary });
    // 清空输入框的值
    $('#username').val('');
    $('#score').val('');
    $('#salary').val('');
    // 重新渲染页面
    render();
});

// 删除数据
$('tbody').on('click', 'img[src*="del"]', function () {
    // 判断是否为编辑模式
    if (isEdit) return alert('请先完成修改操作');
    if (!confirm('你确定要删除吗？')) return;
    let index = $(this).data('index');
    del(index);
    render();
});

// 修改数据 -- 进入编辑模式
$('tbody').on('click', 'img[src*="up"]', function () {
    // 判断是否为编辑模式，用于控制不能进行其他数据的编辑
    if (isEdit) return alert('请先完成修改操作');
    // 设置为编辑模式
    isEdit = true;
    $(this).parents('tr').hide().next().show();
});

// 修改数据 -- 退出编辑模式
$('tbody').on('click', '.edit img', function () {
    isEdit = false;
    $(this).parents('tr').hide().prev().show();
});

// 修改数据 -- 确认修改
$('tbody').on('click', 'img[src*="yes"]', function () {
    // 获取索引
    let index = $(this).data('index');
    // 获取三项值
    let tr = $(this).parents('tr');
    let username = tr.find('.username').val().trim();
    let score = tr.find('.score').val().trim();
    let salary = tr.find('.salary').val().trim();
    // 判断值是否为空
    if (username == '' || score == '' || salary == '') {
        return alert('值不能为空');
    }
    // 修改本地存储中的数据
    update(index, { username, score, salary });
    // 重新渲染页面
    render();
});
