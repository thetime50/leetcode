/**
 * 1049. 最后一块石头的重量 II
 * 
 * 有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。
 * 
 * 每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：
 * 
 * 如果 x == y，那么两块石头都会被完全粉碎；
 * 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
 * 最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。
 * 
 * 1 <= stones.length <= 30
 * 1 <= stones[i] <= 100
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/last-stone-weight-ii
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

/**
 * 
 * 动态规划问题
 * t:O(n⋅sum) m:O(sum)
 * 
 * 分两堆 
 * 参考0 和 1 个数问题 (./0474- 一和零.js)
 * 有加有减的非线性问题转化为sum 只有加法的neg 的线性问题
 * 取最接近sum/2的数 01背包问题
 * 
 * i: 输入的石头个数 i>=1 // 减去石头会产生新的石头要怎么处理
 * j: 选中石头目标重量和 0<=j<=neg
 * dp[i][j] 不超过j的最大重量
 * 
 * if(i=1) dp[i][j] = 0
 * if(i=2) dp[i][j] = max( // 重量<j的最大值
 *                          db[i-1][j-stones[i]] + stones[i], // 使用该项， 使用该项 取上一个规则 和为扣除该项的最大值
 *                          db[i-1][j] // 不使用该项
 *                      )
 * 
 */

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
    let smax = 0
    const len = stones.length
    const sum = stones.reduce((t,v)=>{
        smax = Math.max(smax,v)
        return t+v
    },0)
    if(smax*2 > sum){
        return smax*2 - sum
    }

    const half = Math.floor(sum/2)
    let db = Array.from({length:half+1},()=>0)

    for(let i=0;i<len;i++){
        const item = stones[i]
        for(let j=half;j>=item;j--){
            db[j] = Math.max(
                db[j-item] + item, // db[j-item] <= j-item // db[j]<=j  
                db[j],
            )
        }
        // console.log(sum,half,i,item,db)
    }
    return sum - 2*db[half]
};

// console.log(lastStoneWeightII([2,7,4,1,8,1]))//1
// console.log(lastStoneWeightII([31,26,33,21,40]))//5
// console.log(lastStoneWeightII([1,2]))//1
