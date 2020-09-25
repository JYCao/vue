// --------------- 存数据 -----------------
function save(data) {
    localStorage.setItem('list', JSON.stringify(data));
}
// 测试：
// save(students);

// --------------- 取数据 -----------------
// 有数据，得到非空数组；没有数据，希望得到空数组
function get() {
    return JSON.parse(localStorage.getItem('list')) || [];
}
// 测试
// console.log( get() )

// --------------- 添加数据 -----------------
/*
* @params newData [object]
*/
function add (newData) {
    // 1. 取出原有的数据
    let data = get(); // 得到数组
    // 2. 加入新数据
    data.push(newData);
    // 3. 把所有数据再存起来
    save(data);
}
// 测试
// add({id: 4, name: '宋江', age: 38, sex: '男'});

// --------------- 修改据 -----------------
function update(index, newData) {
    // 1. 取出所有数据
    let data = get();
    // 2. 修改数据
    data.splice(index, 1, newData)
    // 3. 把所有数据存起来
    save(data);
}
// 测试
// update(0, {id: 1, name: '典韦', age: 20, sex: '男'});

// --------------- 删除据 -----------------
// 参数：要删除的数据的索引
function del(index) {
    // 1. 取出所有数据
    let data = get();
    // 2. 根据索引，删除一条数据
    data.splice(index, 1);
    // 3. 把剩余的存起来
    save(data);
}
// 测试：把索引为2的数据删除掉
// del(2);