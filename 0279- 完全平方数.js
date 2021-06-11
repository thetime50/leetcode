/**
 * 0279. 完全平方数
 * 
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 * 
 * 给你一个整数 n ，返回和为 n 的完全平方数的 最少数量 。
 * 
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 * 
 * 1 <= n <= 104
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/perfect-squares
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

/**
 * @param {number} n
 * @return {number}
 */

/**
 * 1. 找数
 * 2. 动态规划
 * t: O(n*n^.5) m: O(n)
 * 
 * i: 选入的完全平方数个数 // index
 * j: target number 
 * db[i][j] 最小个数
 * 
 * liet=[1,4,9,16...]
 * 
 * if(i=0) db[i][j]=j // list[0] = 1
 * 
 * if(j<list[i]) db[i][j]=db[i-1][j]
 * else          db[i][j]=min(
 *                               db[i-1][j], // 不使用当前值 即是之前的策略
 *                               db[i][j-list[i]]+1 // 使用当前值
 *                          )
 * 
 */

var numSquares1 = function(n) {
    let list = []
    let len=1, square=1
    while(square < n){
        list.push(square)
        len++
        square = len**2
    }
    if(square == n) return 1
    len-- 
    let dp=Array.from({length:n+1},(v,j)=>j)

    for(let i=1;i<len;i++){
        const listi = list[i]
        for(let j=listi;j<=n;j++){
            dp[j]=Math.min(
                dp[j],
                dp[j-listi]+1
            )
        }
        // console.log(i,listi,dp)
    }

    return dp[n]
};

/**
 * 数学方法 四平方和定理
 * t: O(log4(n)+n**0.5) m: 1
 * https://baike.baidu.com/item/%E5%9B%9B%E5%B9%B3%E6%96%B9%E5%92%8C%E5%AE%9A%E7%90%86
 * 
 * 任意一个正整数都可以被表示为至多四个正整数的平方和
 * 当 n!=4**k*(8m+7)时，n 可以被表示为至多三个正整数的平方和
 * 
 */

var numSquares2 = function(n) {
    const sqrt = Math.floor(Math.sqrt(n))
    if(sqrt**2 == n){
        return 1
    }
    // n==4**k*(8m+7)
    let x=n
    while (x%4===0) {
        x/=4
    }
    if(x%8==7){
        return 4
    }
    // x**2+y**2==n
    for(x=1;x<=sqrt;x++){
        const y = Math.floor( Math.sqrt( n-x*x))
        if(x*x+y*y ==n ) return 2
    }
    return 3
};
// var numSquares = numSquares1
var numSquares = numSquares2

// console.log(numSquares(12))//3
// console.log(numSquares(11))//3
// console.log(numSquares(2))//2
