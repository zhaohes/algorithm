/* 
判断一个数字是否是质数，请求给算法。
什么是质数（只能被1和自己本身整除的数就是质数，质数又叫做素数）
*/
function isPrime(num) {
    for (let index = 2; index < num; index++) {
        if (num % index === 0) {
            return false;
        }
    }
    return true;
}
/* 上一个性能较低，如果一个数字不是质数，那它肯定可以分解为一个小于等于自己的
平方根，另一个大于等于自己的平方根的数。所以只要判断在在这个平方根范围内的数字
能否被这个数整除就可以判断它是否是质数。 */
function isPrime2(num) {
    let temp = parseInt(Math.sqrt(num));
    for (let index = 2; index <= temp; index++) {
        if (num % index === 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime2(3))
console.log(isPrime2(11))
console.log(isPrime2(123))
console.log(isPrime2(41))