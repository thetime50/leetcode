/**
 * 474. 一和零
 * 
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
 * 请你找出并返回 strs 的最大子集的大小，该子集中 最多 有 m 个 0 和 n 个 1 。
 * 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/ones-and-zeroes
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * 
 * 1. 遍历法 t:O(2^n)
 * 剪枝条件
 * cnt0>m || cnt1>n
 * cnt item:have+remain<max
 * 
 * 
 * 2. 排序
 * 
 * 3. 动态规划 01背包问题
 * 
 * 
 */
var findMaxForm = function(strs, m, n) {
    let l=0;r=0;
    let sum0=0,sum1=0
    let sum0s=[],sum1s=[]
    let max=0
    {
        let s0 = strs[0].replace('1','').length
        let s1 = strs[0].length-s0
        sum0=s0
        sum1=s1
        sum0s.push(s0)
        sum1s.push(s1)
    }
    while (r<strs.length) {
        if(sum0<=m && sum1<=n){
            max = Math.max(max,r-l+1)
            if(r<strs.length-1){
                r++
                let s0 = strs[r].replace('1','').length
                let s1 = strs[r].length-s0
                sum0+=s0
                sum1+=s1
                sum0s.push(s0)
                sum1s.push(s1)
            }else{
                break
            }
        }else{
            sum0-=sum0s[l]
            sum1-=sum1s[l]
            l++
            if(l>r){
                if(r<strs.length-1){
                    r++
                    let s0 = strs[r].replace('1','').length
                    let s1 = strs[r].length-s0
                    sum0+=s0
                    sum1+=s1
                    sum0s.push(s0)
                    sum1s.push(s1)
                }else{
                    break
                }
            }
        }
    }
    return max
};
console.log(findMaxForm(["10","0001","111001","1","0"],5,3)) // 4
console.log(findMaxForm( ["10", "0", "1"], 1, 1)) // 2
