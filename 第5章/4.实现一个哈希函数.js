/* 哈希函数 */
function hashFunc(str, size) {
    let hashCode = 0;
    for (let index = 0, len = str.length; index < len; index++) {
        hashCode = hashCode * 37 + str.charCodeAt(index);
    }
    let index = hashCode % size;
    return index;
}
