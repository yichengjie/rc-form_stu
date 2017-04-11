/**
 * @功能描述:责任链模式
 * @auth:yicj
 * @data:2016-12-20
 * @email:626659321@qq.com
 */
export var nextFlagStr = 'nextSuccessor' ;
var Chain = function(fn){
	this.fn = fn ;
	this.successor = null ;
};
Chain.prototype.setNextSuccessor = function(successor){
	return this.successor = successor ;
};
//执行func
Chain.prototype.passRequest = function(){
	var ret = this.fn.apply(this,arguments) ;
	if(ret === nextFlagStr){
		return this.successor && this.successor.passRequest.apply(this.successor,arguments) ;
	}
	return ret ;
};
//异步操作时专用
//手动指定successor，因为异步操作不知道什么时候传递个下一个successor
Chain.prototype.next = function(){
	return this.successor && this.successor.passRequest.apply(this.successor,arguments) ;
};
export default Chain ;
/**使用示例:
 * 1.定义函数
 *  *同步函数start
 *	*	* let  fn1 = new Chain(function(){
 *	*	* 	 if(xxx){
 *	*	* 		xxx
 *	*	*   }else{
 *	*	*     return nextFlagStr ;
 *	*	*   }
 *	*	* }) ;
 *	*	* let  fn2 = new Chain(function(){
 *	*	* 	 if(xxx){
 *	*	* 		xxx
 *	*	*   }else{
 *	*	*     return nextFlagStr ;
 *	*	*   }
 *	*	* }) ;
 *	*同步函数end
 *	*异步函数start
 *	*	* let fn3 = new Chain(function(){
 *	*	*     var _self = this ;
 *	*	* 	   setTimeout(function() {
 *	*	*         其他操作
 *	*	*		  _self.next.apply(_self) ;
 *	*	*     }, timeout);
 *	*	* }) ;
 *	* 异步函数end
 *2.配置执行顺序
 *	* fn1.setNextSuccessor(fn2) ;
 *	* fn2.setNextSuccessor(fn3) ;
 * 3.运行程序
 *	* fn1.passRequest() ; //这里可以传递参数
 */

