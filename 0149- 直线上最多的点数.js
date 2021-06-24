/**
 * 0149. 直线上最多的点数
 * 
 * 给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。
 * 
 * 遍历
 * t:O((n-1)!) m(n-1)
 * 
 * 任意两点确定一条直线
 * 
 * 1 <= points.length <= 300
 * points[i].length == 2
 * -104 <= xi, yi <= 104
 * points 中的所有点 互不相同
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function(points) {
    const len = points.length
    if(len<=2){
        return len
    }
    let max = 2
    for(let i=0; i<len-2; i++){
        if(len-i<=max){
            break
        }
        for(let j=i+1; j<len-1; j++){
            if(len-j<=max-1){
                break
            }
            const x1d = points[j][0] - points[i][0]
            const y1d = points[j][1] - points[i][1]
            let cnt = 2
            for(let k=j+1;k<len;k++){
            	const x2d = points[k][0] - points[i][0]
            	const y2d = points[k][1] - points[i][1]
                
                if(x2d*y1d == x1d*y2d){
                    cnt++
                }else{
                	if(len-k-1+cnt<=max){
                        console.log('*',i,j,k)
                	    break
                	}
                }
            }
            max = Math.max(max,cnt)
        }
    }
    return max
};

// let points1 = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]] // 4
// let points2 = [[1,1],[2,2],[3,3]] // 3
// let points3 = [[1,1],[2,2],[3,3],[4,1],[5,1],[6,1]] // 4

// console.log(maxPoints(points1))
// console.log(maxPoints(points2))
// console.log(maxPoints(points3))
