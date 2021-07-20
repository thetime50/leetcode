/**
 * LCP 07. 传递信息
 * 
 *小朋友 A 在和 ta 的小伙伴们玩传信息游戏，游戏规则如下：
 * 有 n 名玩家，所有玩家编号分别为 0 ～ n-1，其中小朋友 A 的编号为 0
 * 每个玩家都有固定的若干个可传信息的其他玩家（也可能没有）。传信息的关系是单向的（比如 A 可以向 B 传信息，但 B 不能向 A 传信息）。
 * 每轮信息必须需要传递给另一个人，且信息可重复经过同一个人
 * 给定总玩家数 n，以及按 [玩家编号,对应可传递玩家编号] 关系组成的二维数组 relation。返回信息从小 A (编号 0 ) 经过 k 轮传递到编号为 n-1 的小伙伴处的方案数；若不能到达，返回 0。
 * 
 * 2 <= n <= 10
 * 1 <= k <= 5
 * 1 <= relation.length <= 90, 且 relation[i].length == 2
 * 0 <= relation[i][0],relation[i][1] < n 且 relation[i][0] != relation[i][1]
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/chuan-di-xin-xi
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 
 * t:O(n*relation.len^2) m:O(relation.len^2)
 */
/**
 * @param {number} n
 * @param {number[][]} relation
 * @param {number} k
 * @return {number}
 */
var numWays = function(n, relation, k) {
    let oldScheme={} // 达到位置:方案数
    let newScheme={}
    let maps={} // from:[to]
    relation.forEach((v,i,a)=>{
        if(!maps[v[0]]){
            maps[v[0]] = []
        }
        maps[v[0]].push(v[1])
    })
    
    function checkAdd(scheme,key,val) {
        if(!scheme[key]){
            scheme[key]=val
        }else{
            scheme[key]+=val
        }
    }
    checkAdd(oldScheme,0,1)
    for(let i=0; i<k; i++){ // 传递几轮
        for(let f in oldScheme){ // 之前到达的点以及对应次数
            const tos = maps[f]
            if(!tos) continue
            for(let t of tos){// 对应每个点下一次到达的点
                checkAdd(newScheme,t,oldScheme[f])
            }
        }
        oldScheme = newScheme
        newScheme = {}
    }
    // console.log(maps,oldScheme)
    return oldScheme[n-1] || 0
};


let n, relation, k
n = 5; relation = [[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]]; k = 3 // 输出：3
console.log(numWays(n, relation, k))
n = 3, relation = [[0,2],[2,1]], k = 2 // 输出：0
console.log(numWays(n, relation, k))

