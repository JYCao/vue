        // 存储数据
        let save = a => {
            localStorage.setItem('dataName', JSON.stringify(a));
        }

        //  获得数据
        let get = () => {
            return JSON.parse(localStorage.getItem('dataName')) || [];
        }


        // 添加数据
        let add = b => {
            // 1. 获取所有数据
            let data = get();
            // 添加数据到数组中
            data.push(b);
            save(data);
            return data;
        }


        // 删除数据
        let del = (index) => {
            // 获取数据
            let data = get();
            // 根据索引删除数据
            data.splice(index, 1);
            // 把这个数据保存到本地
            save(data);
            return data;
        }


        // 修改数据
        let change = (index, c) => {
            // 获取所有数据
            let data = get();
            // 删除数据,并在原来位置添加数据达到修改 的目的
            data.splice(index, 2, c)
            // 把这个数据保存到本地
            save(data);
            return data;
        }

