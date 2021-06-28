/**
 * 752. 打开转盘锁
 * 
 * 你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
 * 锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。
 * 列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。
 * 字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。
 * 
 * 每一次旋转可以旋转任何转盘加减一个值或循环
 * 寻路，如果target被某种形式分隔或包围则无法达到
 * 
 * 最快 o0->t0 ... o3->t3
 * 如果被阻挡？ 如何最优？
 * 递归调用？ 动态规划？
 * 
 * ********************
 * 每确定一个数减一维
 * 往下选一个点 如果阻挡选择对等路径
 * 如果一个点下面对等路径选完返回上一层选上一层的对待路径
 * 
 * ********************
 * i: 选入deadends的元素
 * j: 选入target的元素
 * dp[i][j] 达到的步数
 * 
 */

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    const tlen = target.length
    let maps= Array.from({length:10},()=>
        Array.from({length:10},()=>
            Array.from({length:10},()=>
                Array(10).fill(Number.MAX_VALUE)
            )
        )
    )
    function setMaps(index,val){
        maps[index[0]][index[1]]
        	[index[2]][index[3]] = val
    }

    function getMaps(index,val){
        return maps[index[0]][index[1]]
        	[index[2]][index[3]]
    }
    function loopAdd(val,add){
        if(val==9&&add>0){
            return 0
        }
        if(val==0&&add<0){
            return 9
        }
        return val+add
    }

    deadends.forEach((v,i,a)=>{
        setMaps(v,-1)
    })
    // 深度优先
    // 因为是深度优先 所以在第一个循环中会尽量把格子填满
    // 所以递归深度=10000 所以容易爆栈
    let now = [0,0,0,0]
	function toNext(step){
        console.log(now.join(''),step)
        setMaps(now,step)
        now[0]=loopAdd(now[0],1)
        if(getMaps(now)>step+1){// 之前的走法步数更多 刷新路径
			toNext(step+1)
        }
        now[0]=loopAdd(now[0],-1)
        now[1]=loopAdd(now[1],1)
        if(getMaps(now)>step+1){// 之前的走法步数更多 刷新路径
			toNext(step+1)
        }
        now[1]=loopAdd(now[1],-1)
        now[2]=loopAdd(now[2],1)
        if(getMaps(now)>step+1){// 之前的走法步数更多 刷新路径
			toNext(step+1)
        }
        now[2]=loopAdd(now[2],-1)
        now[3]=loopAdd(now[3],1)
        if(getMaps(now)>step+1){// 之前的走法步数更多 刷新路径
			toNext(step+1)
        }
        now[3]=loopAdd(now[3],-1)
        ////

        now[0]=loopAdd(now[0],-1)
        if(getMaps(now)>step+1){// 之前的走法步数更多 刷新路径
			toNext(step+1)
        }
        now[0]=loopAdd(now[0],1)
        now[1]=loopAdd(now[1],-1)
        if(getMaps(now)>step+1){// 之前的走法步数更多 刷新路径
			toNext(step+1)
        }
        now[1]=loopAdd(now[1],1)
        now[2]=loopAdd(now[2],-1)
        if(getMaps(now)>step+1){// 之前的走法步数更多 刷新路径
			toNext(step+1)
        }
        now[2]=loopAdd(now[2],1)
        now[3]=loopAdd(now[3],-1)
        if(getMaps(now)>step+1){// 之前的走法步数更多 刷新路径
			toNext(step+1)
        }
        now[3]=loopAdd(now[3],1)
    }
    toNext(0)
    let ret = getMaps(target)
    return ret//>=10000?-1:ret
};

let deadends1 = ["0201","0101","0102","1212","2002"], target1 = "0202" // 6
let deadends2 = ["8888"], target2 = "0009" // 1
let deadends3 = ["8887","8889","8878","8898","8788","8988","7888","9888"], target3 = "8888" // -1
let deadends4 = ["0000"], target4 = "8888" // -1


console.log(openLock(deadends1,target1))
console.log(openLock(deadends2,target2))
console.log(openLock(deadends3,target3))
console.log(openLock(deadends4,target4))

