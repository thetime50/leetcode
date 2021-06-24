/**
 * 374. 猜数字大小
 * 
 * 猜数字游戏的规则如下：
 * 
 * 每轮游戏，我都会从 1 到 n 随机选择一个数字。 请你猜选出的是哪个数字。
 * 如果你猜错了，我会告诉你，你猜测的数字比我选出的数字是大了还是小了。
 * 你可以通过调用一个预先定义好的接口 int guess(int num) 来获取猜测结果，返回值一共有 3 种可能的情况（-1，1 或 0）：
 * 
 * -1：我选出的数字比你猜的数字小 pick < num
 * 1：我选出的数字比你猜的数字大 pick > num
 * 0：我选出的数字和你猜的数字一样。恭喜！你猜对了！pick == num
 * 返回我选出的数字。
 * 
 * 1 <= n <= 231 - 1
 * 1 <= pick <= n
 * 
 */

 /** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
    if(guess(n)==0){
        return n
    }
    let l=1,r=n
    while(l<n-1){
        const middle = Math.floor( (l+r)/2)
        const g = guess(middle)
        if(g>0){
			l=middle
        }else if(g<0){
            r=middle
        }else{
            return middle
        }
    }
    return l
};

// let target = 1
// function guess(i){
//     return target - i
// }
// console.log(guessNumber(1))
// console.log(guessNumber(10))
// target = 2
// console.log(guessNumber(10))
// target = 3
// console.log(guessNumber(10))
// target = 4
// console.log(guessNumber(10))
// target = 5
// console.log(guessNumber(10))
// target = 6
// console.log(guessNumber(10))
// target = 2
// console.log(guessNumber(2))

