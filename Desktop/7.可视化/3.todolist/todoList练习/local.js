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

let change = (idnex, c) => {
    let data = get();
    data.splice(index, 1, c)
    save(data);
    return data;
}
