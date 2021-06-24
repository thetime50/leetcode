/**
 * 15. 二进制中1的个数
 * 
 * 请实现一个函数，输入一个整数（以二进制串形式），输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。
 * 
 * 输入必须是长度为 32 的 二进制串 。
 * 注意：本题与主站 191 题相同：https://leetcode-cn.com/problems/number-of-1-bits/
 * 
 * t:O(log2(n)) m:O(1) 
 * 
 */
 
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let pow2=1
    let cnt=0
    // console.log(parseInt(n).toString(2))
    while(n && pow2){
    	// console.log(pow2,n,n%pow2)
        if(n&pow2){
            n=n & ~pow2
            cnt++
        }
        pow2 = pow2<<1
    }
    if(!pow2 && n){
        cnt++ 
    }
    return cnt
};

// // parseInt('10',2).toString('10')
// console.log(hammingWeight(0)) // 0
// console.log(hammingWeight(9)) // 2
// console.log(hammingWeight(10)) // 2
// console.log(hammingWeight(8)) // 1
// console.log(hammingWeight(32145)) // 9
// console.log(hammingWeight(2147483648)) // 1
// console.log(hammingWeight(2147483647)) // 31
// console.log(hammingWeight(2147483649)) // 2
// // 0100 0000 0000 0000 0000 0000 0000 0000
// console.log(hammingWeight(1073741824)) // 1