/* 
排序算法：
冒泡排序
选择排序
插入排序
快速排序
归并排序
计数排序:counting sort
基数排序（radix sort)
希尔排序
堆排序
桶排序
简单排序：冒泡排序，选择排序，插入排序
高级排序：希尔排序，快速排序
*/
class ArrayList {
    constructor() {
        this.array = [];
    }
    insert(val) {
        this.array.push(val);
    }
    toString() {
        return this.array.join('-');
    }
    swap(m, n) {
        let temp = this.array[m];
        this.array[m] = this.array[n];
        this.array[n] = temp;
    }
    //冒泡排序
    bubbleSort() {
        let length = this.array.length;
        //第一轮比较到arr[length-2]与arr[length-1],需要比较n-1次
        //第二轮比较是比较arr[length-3]与arr[length-2],需要比较n-2次
        //第n轮需要1次。所以总的比较次数是n^2/2,总的交换次数是n^2/4，根据大O表示法就是O(n^2)
        for (let j = length - 1; j >= 0; j--) {
            for (let i = 0; i < j; i++) {
                if (this.array[i] > this.array[i + 1]) {
                    this.swap(i, i + 1);
                }
            }
        }
    }
    selectionSort() {
        let length = this.array.length;
        for (let index = 0; index < length - 1; index++) {
            let min = index;
            //找出最小值的下标。
            for (let j = min + 1; j < length; j++) {
                if (this.array[min] > this.array[j]) {
                    min = j;
                }
            }
            this.swap(index, min);
        }
    }
    //插入排序
    insertionSort() {
        let length = this.array.length;
        for (let index = 1; index < length; index++) {
            let temp = this.array[index];
            let j = index;
            while (temp < this.array[j - 1] && j > 0) {
                this.array[j] = this.array[j - 1];
                j -= 1;
            }
            this.array[j] = temp;
        }
    }
    //希尔排序
    shellSort() {
        let length = this.array.length;
        let gap = Math.floor(length / 2);//get the gap of group
        while (gap >= 1) {
            for (let index = gap; index < length; index++) {
                let temp = this.array[index];
                let j = index;
                while (temp < this.array[j - gap] && j >= gap) {
                    this.array[j] = this.array[j - gap];
                    j -= gap;
                }
                this.array[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
    }
    quickSort() {
        this.array = this._quickSort(this.array.slice(0));
    }
    _quickSort(array) {
        if (array.length <= 1) {
            return array;
        }
        let length = array.length;
        let left = [];
        let right = [];
        let pivot = Math.floor(length / 2);
        let item = array[pivot];
        array.splice(pivot, 1);
        for (let index = 0; index < array.length; index++) {
            let one = array[index];
            if (one <= item) {
                left.push(one)
            } else {
                right.push(one);
            }
        }
        return this._quickSort(left).concat(item).concat(this._quickSort(right))
    }
}

var list = new ArrayList;
list.insert(66);
list.insert(88);
list.insert(12);
list.insert(87);
list.insert(100);
list.insert(5);
list.insert(566);
list.insert(23);
// console.log(list.toString())
// list.bubbleSort();
// list.quickSort();
// console.log(list.toString())

let arr = [3, 16, 2, 5, 4, 12, 9, 7, 10, 8];
function swap(arr, m, n) {
    let temp = arr[m];
    arr[m] = arr[n];
    arr[n] = temp;
}
//冒泡排序
function bubbleSort(arr) {
    let length = arr.length;
    for (let i = length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}
//选择排序,比较o(n^2),交换o(n)
function selectionSort(arr) {
    let length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        let min = i;
        for (let j = min + 1; j < length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        swap(arr, i, min);
    }
}
//插入排序,比较次数o(n^2),复制次数o(n^2)
function insertionSort(arr) {
    let length = arr.length;
    for (let j = 1; j < length; j++) {
        let temp = arr[j];
        let i = j;
        while (temp < arr[i - 1] && i > 0) {
            arr[i] = arr[i - 1];
            i--;
        }
        arr[i] = temp;
    }
}
//希尔排序,可变步长随意。
function shellSort(arr) {
    let length = arr.length;
    let gap = Math.floor(length / 2);
    while (gap >= 1) {
        for (let index = gap; index < length; index++) {
            let temp = arr[index];
            let j = index;
            while (temp < arr[j - gap] && j >= gap) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
}

function quickSort(arr, start, end) {
    if (start < end) {
        let l = start;
        let r = end;
        let temp = arr[start];
        while (l < r) {
            while (arr[r] >= temp && l < r) {
                r--;
            }
            if (l < r) {
                arr[l] = arr[r];
                l++;
            }
            while (arr[l] < temp && l < r) {
                l++;
            }
            if (l < r) {
                arr[r] = arr[l];
                r--;
            }
        }
        arr[l] = temp;
        quickSort(arr, start, l - 1)
        quickSort(arr, l + 1, end)
    }
}

quickSort(arr, 0, arr.length - 1);

console.log(arr);