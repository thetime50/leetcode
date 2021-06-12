/**
 * 1449. 数位成本和为目标值的最大数字
 * 
 * 给你一个整数数组 cost 和一个整数 target 。请你返回满足如下规则可以得到的 最大 整数：
 * 
 * 给当前结果添加一个数位（i + 1）的成本为 cost[i] （cost 数组下标从 0 开始）。
 * 总成本必须恰好等于 target 。
 * 添加的数位中没有数字 0 。
 * 由于答案可能会很大，请你以字符串形式返回。
 * 
 * 如果按照上述要求无法得到任何整数，请你返回 "0" 。
 * 
 * cost.length == 9
 * 1 <= cost[i] <= 5000
 * 1 <= target <= 5000
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/form-largest-integer-with-digits-that-add-up-to-target
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

/**
 * 动态规划 递归 哈希表
 * 完全背包问题
 * t:O(target*10) m:O(target*resultLen/2)
 * 
 * 累加target同时遍历规则选项
 * j: 目标target
 * dp[j]:加入的字符
 * 
 * 1. 循环次数和dp长度相等
 * 2. cost越大 循环次数越少
 * 3. 字符比较比较花时间
 * 
 * 如果cost数值少的时候 循环次数会更多 时间/内存消耗都会更多
 * 是不是用累加item的方式做时间复杂度也是一样的
 * 
 */

/**
 * @param {number[]} cost
 * @param {number} target
 * @return {string}
 */
var largestNumber1 = function(cost, target) {
    // let dp = new Map(cost.map((v,i)=>{
    //     return [v,String(i+1)]
    // }))
    let costMap = new Map(cost.map((v,i)=>{
        return [v,String(i+1)] // 同一个成本会被数值大的覆盖，都是不是最优的
    }))
    let dp = new Map()
    function getBig(a1,a2) {
        if(a1.length>a2.length){
            return a1
        }else if(a1.length<a2.length){
            return a2
        }
        for(let i=0;i<a1.length;i++){
            if(a1[i]>a2[i]){
                return a1
            }else if(a1[i]<a2[i]){
                return a2
            }
        }
        return a1
    }
    function travers(tg){
        if(tg<=0) return ''
        if(dp.has(tg)) return dp.get(tg)
        let res = '' // cost.includes(tg) ? String(cost.lastIndexOf(tg)+1) : ''
        // res.length = 0
        if(costMap.has(tg)){ // 如果数据在代价表中 则作为初始值
            res=costMap.get(tg) // res.length = 1
            costMap.delete(tg)
        }
        for(let i=0;i<cost.length;i++){ // 选取不同代价搭配剩余代价 取最大值 // 可以优化掉重复的,更优的cost
            let before = travers(tg-cost[i])
            // console.log('  ',tg, i,JSON.stringify(res),JSON.stringify( before))
            res = getBig(
                res, 
                before && before+(i+1) // res.length = old+1
            )
        }
        dp.set(tg,res)
        // console.log(tg,JSON.stringify(res))
        return res
    }

    const res = travers(target) || '0'
    // console.log(dp.size)
    return res
};


// todo 题解

var largestNumber = largestNumber1
// var largestNumber = largestNumber2

let test =[
    { cost : [4,3,2,5,6,7,2,5,5], target : 9 }, // "7772"
    { cost : [7,6,5,5,5,6,8,7,8], target : 12 }, // "85"
    { cost : [2,4,6,2,4,6,4,4,4], target : 5 }, // "0"
    { cost : [6,10,15,40,40,40,40,40,40], target : 47 }, // "32211"
]

console.log(largestNumber(test[0].cost,test[0].target))
console.log(largestNumber(test[1].cost,test[1].target))
console.log(largestNumber(test[2].cost,test[2].target))
console.log(largestNumber(test[3].cost,test[3].target))
