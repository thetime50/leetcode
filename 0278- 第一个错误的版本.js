/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * 二分法
 * t:O(log2(n)) m:O(1)
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let l=1,r=n
        if(isBadVersion(1)) return 1
        while(l<r-1){
            const middle = Math.floor( (l+r)/2)
            if(isBadVersion(middle)){
                r=middle
            }else{
                l=middle
            }
        }
        return r
    };
};

