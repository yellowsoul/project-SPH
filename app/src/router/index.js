// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败的回调
// call||apply区别：
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location, resolve, reject){
  if(resolve && reject){
    originPush.call(this, location, resolve, reject);
  }else{
    originPush.call(this, location, ()=>{}, ()=>{});
  }
}

VueRouter.prototype.replace = function(location, resolve, reject){
  if(resolve && reject){
    originReplace.call(this, location, resolve, reject)
  }else{
    originReplace.call(this, location, () => {}, () => {})
  }
}


// 配置路由
export default new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})