/**
 * 0518. 零钱兑换 II
 * 
 * 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。 
 * 
 * 0 <= amount (总金额) <= 5000
 * 1 <= coin (硬币面额) <= 5000
 * 硬币种类不超过 500 种
 * 结果符合 32 位符号整数
 */

/**
 * 动态规划 完全背包问题
 * t: O(amount×n) m: O(amount)
 * 
 * i: 面值种类 // index
 * j: 目标金额
 * dp[i][j] 方案数量
 * 
 * if(i=0) if(amount%coins[i] == 0) dp[i][j] = 1
 *         else dp[i][j] = 0
 * else ccnt = floor(amount/coins[i])
 *      rcnt = 0
 *      while(m=0;m<=ccnt;m+=coins[i]){
 *          rcnt += dp[i-1][j-m]
 *      }
 *      dp[i][j] = rcnt
 * 
 */

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
 var change1 = function(amount, coins) {
    const len = coins.length

    let dp=Array.from({length:amount+1},(v,j)=>{
        if(j==0) return 1
        return j%coins[0]===0?1:0
    })

    // console.log(dp)

    for(let i=1;i<len;i++){
        const coin = coins[i]
        for(let j=amount;j>=coin;j--){
            let rcnt = 0
            for(let add=0;add<=j;add+=coin){
                rcnt += dp[j-add]
            }
            dp[j]=rcnt
        }
        // console.log(i,coin,dp)
    }
    return dp[amount]
};

// t: O(amount×n) m: O(amount)
var change2 = function(amount, coins) {
    const len = coins.length

    let dp=Array(amount+1).fill(0);

    dp[0]=1

    for(let i=0;i<len;i++){
        const coin = coins[i]
        for(let j=coin;j<=amount;j++){ // 可以重复利用本次的计数结果 硬币是可以复用累加的
            dp[j]+=dp[j-coin]
        }
        // console.log(i,coin,dp)
    }
    return dp[amount]
};

var change = change2

// console.log(change(5,[1, 2, 5])) // 4
// console.log(change(3,[2])) // 0
// console.log(change(10,[10])) // 1