/**
 * 剑指 Offer 52. 两个链表的第一个公共节点
 * 
 * 输入两个链表， 找出它们的第一个公共节点。
 * 本题与主站 160 题相同：https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    let p1 = headA, p2 = headB
    if (!headA || !headB){
        return null
    }
    let same = null
    while (true) {
        if(p1==p2){
            if(!same) same = p1
        }else{
            same = null
        }
        if (p1.next || p2.next){
            p1 = p1.next || headB
            p2 = p2.next || headA
        }else{
            break
        }
    }
    return same
};


