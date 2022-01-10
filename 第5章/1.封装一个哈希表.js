class HashTable {
    constructor(limit) {
        this.storage = [];//store the data
        this.count = 0;//当前已经存的数据个数
        this.limit = limit;//该哈希表的限制容量
    }
    hashFunc(str, size) {
        let hashCode = 0;
        for (let index = 0, len = str.length; index < len; index++) {
            hashCode = hashCode * 37 + str.charCodeAt(index);
        }
        let index = hashCode % size;
        return index;
    }
    put(key, value) {
        //将一个数据存入到哈希表
        //1.先使用哈希函数算出对于的下标。
        let index = this.hashFunc(key, this.limit);
        //2.找出对应下标的桶
        let bucket = this.storage[index];
        if (!bucket) {
            bucket = [];
            this.storage[index] = bucket;
        }
        for (let index = 0, len = bucket.length; index < len; index++) {
            let tuple = bucket[index];
            if (tuple[0] === key) {
                tuple[1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.count += 1;
        this.grow();
    }
    get(key) {
        //获取hashcode
        let index = this.hashFunc(key, this.limit);
        //2.找出对应的桶
        let bucket = this.storage[index];
        if (!bucket) return null;
        for (let idx = 0, len = bucket.length; idx < len; idx++) {
            let tuple = bucket[idx];
            if (tuple[0] === key) {
                return tuple[1];
            }
        }
        return null;
    }
    shrink() {
        //缩容
        let loadFactor = this.count / this.limit;
        if (loadFactor < 0.25 && this.limit > 7) {
            //需要缩容
            let size = Math.parseInt(this.limit / 2);
            let prime = this.getPrime(size);
            this.resize(prime);
        }
    }
    grow() {
        //扩容
        let loadFactor = this.count / this.limit;
        if (loadFactor > 0.75) {
            //需要缩容
            let prime = this.getPrime(this.limit * 2)
            this.resize(prime);
        }
    }
    delete(key) {
        //1.通过hashfunc获取index
        let index = this.hashFunc(key, this.limit);
        let bucket = this.storage[index];
        if (!bucket) return null;
        for (let idx = 0, len = bucket.length; idx < len; idx++) {
            let tuple = bucket[idx];
            if (tuple[0] === key) {
                bucket.splice(idx, 1);
                this.count -= 1;
                this.shrink();
                return tuple[1];
            }
        }
        return null;
    }
    isPrime(num) {
        let temp = Math.parseInt(Math.sqrt(num));
        for (let index = 2; index <= temp; index++) {
            if (num % index === 0) {
                return false;
            }
        }
        return true;
    }
    getPrime(num) {
        while (!this.isPrime(num)) {
            num += 1;
        }
        return num;
    }
    //扩容
    resize(newLimit) {
        let oldStorage = this.storage;
        this.storage = [];
        this.count = 0;
        this.limit = newLimit;
        for (let index = 0, len = oldStorage.length; index < len; index++) {
            let bucket = oldStorage[index];
            if (!bucket) {
                continue;
            }
            for (let idx = 0, size = bucket.length; idx < size; idx++) {
                let tuple = bucket[idx];
                this.put(tuple[0], tuple[1]);
            }
        }
    }
    //判断hashTable是否为空
    isEmpty() {
        return this.count === 0;
    }
    //获取hashTable内元素的个数
    size() {
        return this.count;
    }
}

let hashtable = new HashTable(7);
hashtable.put('age', 18);
hashtable.put('name', "周周");


let value = hashtable.delete('name');
// console.log(value)


