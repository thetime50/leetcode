/**
 * 494. 目标和
 * 
 * 给你一个整数数组 nums 和一个整数 target 。
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 * 
 * 1 <= nums.length <= 20
 * 0 <= nums[i] <= 1000
 * 0 <= sum(nums[i]) <= 1000
 * -1000 <= target <= 100
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/target-sum
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

/**
 * nums 元素和 sum
 * 选取-号元素和 neg
 * 有 sums-2neg = target 有 sums-target = 2neg sums-target是偶数
 * 
 * 现在要计算目标值neg的方案数
 * neg 把有加有减的问题转化为 累加neg个数的问题
 * 
 * i 表示选取前i个元素
 * j 表示组合的目标值(neg)
 * dp[i][j] 表示有效组合的方案数
 * 
 * if(i=0) if(j=0) 1 // 选中数组为 [] 满足和为0
 *         else 0    // 元素个数为0 和只能为0
 * 
 * if(nums[i])>j   dp[i-1][j] // 当前数值不能选 选数方案为上一个数的方案 // 
 * else           dp[i-1][j] + // 不选当前方案的情况 选数方案和上一个数的方案相同
 *                dp[i-1][j-nums[i]] // 当前选中的方案 1* 剩余条件-剩余值 的方案
 * 
 * 外层循环为 i 内层位 j 每次遍历一组数据的不同值
 * 动态规划问题经常包含不选择的情况 x和y方向上的取值都是 [0,xlen] [0,ylen]
 */

 var findTargetSumWays = function(nums, target) {
    const sum = nums.reduce((t,v)=>{return t+v},0)
    let neg = sum-target
    const len = nums.length
    if(neg<0 || neg%2){
        return false
    }
    // if(neg === 0){
    //     return 1
    // }
    neg=neg/2 // [0,neg]
    // let dp = Array.from({length:len+1},
    //         ()=> Array.from({length:neg+1},()=>0)
    // )
    // dp[0][0]=1
    // for(let i=1;i<len+1;i++){
    //     const num = nums[i-1]
    //     for(let j=0;j<neg+1;j++){
    //         if(num>j){
    //             dp[i][j] = dp[i-1][j]
    //         } else {
    //             dp[i][j] = dp[i-1][j] + dp[i-1][j-num]
    //         }
    //     }
    // }
    // console.table(dp)
    // return dp[len-1][neg-1]
    let dp = Array.from({length:neg+1},()=>0)
    dp[0]=1
    for(let i=1;i<len+1;i++){
        const num = nums[i-1]
        for(j=neg;j>=num;j--){ // 从后面往前更新
            dp[j] = dp[j] + dp[j-num] // j>num num>=0
        }
        // console.log(dp)
    }
    return dp[neg]
};

// console.log(findTargetSumWays([1,1,1,1,1],3)) // 5
// console.log(findTargetSumWays([1],1)) // 1
// console.log(findTargetSumWays([1,0],1)) // 2
