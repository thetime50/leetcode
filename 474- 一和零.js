/**
 * 474. 一和零
 * 
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
 * 请你找出并返回 strs 的最大子集的大小，该子集中 最多 有 m 个 0 和 n 个 1 。
 * 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 * 
 * 1 <= strs.length <= 600
 * 1 <= strs[i].length <= 100
 * strs[i] 仅由 '0' 和 '1' 组成
 * 1 <= m, n <= 100
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/ones-and-zeroes
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 1. 递归遍历 大于剪枝
 * // t:O(max!) m:O(max!)
 * 
 * 2. 动态规划 01背包问题
 * 
 * i 为输入数组元素数量
 * j 为0的个数
 * k 为1的个数
 * 
 * dp[i][j][k] 为最大子集的大小
 * if(i=0) maxsetsize = 0
 * 
 */
var findMaxForm = function(strs, m, n) {
    let max = 0
    const getZerosOnes = (str) => {
        const zerosOnes = new Array(2).fill(0);
        const length = str.length;
        for (let i = 0; i < length; i++) {
            zerosOnes[str[i].charCodeAt() - '0'.charCodeAt()]++;
        }
        return zerosOnes;
    
    }
    function traverse(index) { // 返回满足条件的 0/1 的数量 [[cnt0,cnt1,itemcnt],[cnt0,cnt1,itemcnt]]
        let s = strs[index]
        const [c0,c1] = getZerosOnes(s)
        let res = []
        if(index < strs.length-1){
            res = traverse(index+1)
        }
        if(c0<=m && c1<=n){
            if(res.length){
                let add = []
                res.forEach((v,i,a)=>{
                    let s0=v[0]+c0,s1=v[1]+c1
                    if(s0<=m && s1<=n){
                        max = Math.max(max,v[2]+1)
                        add.push([s0,s1,v[2]+1])
                    }
                })
                res = res.concat(add)
            }
            max = Math.max(max,1)
            res =  res.concat([[c0,c1,1]])
        }
        if(index===0){
            console.table(res)
        }
        
        return res
    }
    traverse(0)
    return max
};
// console.log(findMaxForm(["10","0001","111001","1","0"],5,3)) // 4
// console.log(findMaxForm( ["10", "0", "1"], 1, 1)) // 2
// console.log(findMaxForm( ["10","0001","111001","1","0"],4,3)) // 3
// console.log(findMaxForm( ["111","1000","1000","1000"],9,3)) // 3
// const l = ["0","11","1000","01","0","101","1","1","1","0","0","0","0","1","0","0110101","0","11","01","00","01111","0011","1","1000","0","11101","1","0","10","0111"]
// console.log(findMaxForm( l,9,80))//
