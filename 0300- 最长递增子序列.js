/**
 * 300. 最长递增子序列
 * 
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 
 * 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/longest-increasing-subsequence
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 1 <= nums.length <= 2500
 * -104 <= nums[i] <= 104
 * 
 * 你可以设计时间复杂度为 O(n2) 的解决方案吗？
 * 你能将算法的时间复杂度降低到 O(n log(n)) 吗?
 */

/**
 * 
 * 1. 遍历
 *      递归问题要想尽办法剪枝
 * 2. 动态规划
 * 
 * 
 */

// 遍历 t: O(n) m: O(n^2)
var lengthOfLIS1 = function(nums) {
    const len = nums.length
    if(len==1){
        return 1
    }
    let max = 1
    // return [min,len]
    function traverse(index){
        const now = nums[index]
        if(index<len-1){
            let res = traverse(index+1)
            let add = []
            res.forEach((v,i,a)=>{
                if(now<v[0]){
                    max = Math.max(max,v[1]+1)
                    add.push([now,v[1]+1])
                }
            })
            return res.concat(add)
        }else{
            return [[now,1]]
        }
    }
    traverse(0)
    return max
};

// 遍历2 t: O(n^2) m: O(n)
var lengthOfLIS2 = function(nums) {
    const len = nums.length
    if(len==1){
        return 1
    }
    let sel = []
    let max = 1
    // return [min,len]
    function traverse(index){
        const now = nums[index]
        const last = sel[sel.length-1]
        const maybe = len-index+sel.length
        // console.log(index,max,maybe,sel,now)
        if(now > last || (sel.length===0 && maybe>max)){ // 可使用当前项 // 优先使用
            max = Math.max(max,sel.length+1)
            // console.log(index,sel,now)
            if(index<len-1){
                sel.push(now)
                traverse(index+1)
                sel.pop()
            }
        }
        if(index<len-1 && maybe-1>max){ // 不使用当前项
            traverse(index+1)
        }
    }
    traverse(0)
    return max
};

/**
 * 动态规划
 * 
 * i: 选入元素 // lindex 
 * j: 目标子序列最个数 // 1<=j<=len
 * dp[i][j] 实际子序列最个数
 * if(i=1) dp[i][j] = 1
 * else max( 
 *          dp[i-1][j],
 *          dp[i-1][j-1]+1,
 *          )
 * 
 */
var lengthOfLIS3 = function(nums) {
    const len = nums.length
    if(len==1){
        return 1
    }

    let dp=Array.from({length:len+1},()=>[1,nums[0]]) // [cnt,max]
    dp[0]=0
    // for(let i=1;i<len;i++){
    //     const now = nums[i]
    //     for(let j=len;j>0;j--){
    //         const [cnt,max] = dp[j]
    //         if(now>max && cnt+1<=j){ // 是递增的
    //             dp[j] = [cnt+1,now]
    //         }
    //     }
    // }
    return dp[len][0]
};


// var lengthOfLIS = lengthOfLIS1
// var lengthOfLIS = lengthOfLIS2
var lengthOfLIS = lengthOfLIS3

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))//4
console.log(lengthOfLIS([0,1,0,3,2,3]))//4
console.log(lengthOfLIS([7,7,7,7,7,7,7]))//1
const {l1,l2} = require( "./data/t0300.js")
// const l1t = l1 // .slice(0,50) // Math.floor(l1.length/100))
// console.log(lengthOfLIS(l1t))
// const l2t = l2 // .slice(0,80)
// console.log(lengthOfLIS(l2t))
