// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store';
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
let router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})

// 全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to:可以获取到你要跳转到哪个路由信息
  // from:可以获取到你从哪个路由而来的信息
  // next：放行的函数  next()放行  next(path)旅行到指定的路由              next(false);
  // 为了测试先全部放行
  // next();
  // 用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token;
  // 用户信息
  let name = store.state.user.userInfo.name;
  // console.log(userInfo);
  // 用户已经登录了
  if(token){
    // 用户已经登了还想去login[不能去，停留在首页]
    if(to.path == '/login'){
      next('/home')
    }else{
      // 登录了，去的不是login【home|search|detail|shopcart】
      // 如果用户名已有
      if(name){
        next();
      }else{
        // 没有用户信息，派发actioni让仓库存储用户信息再跳转
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo');
          // 放行
          next();
        } catch (error) {
          // token失效了获取不到用户信息，重新登录
          // 清除token
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  }else{
    // 未登录暂时没有处理完毕，先这个样子后期再处理
    next();
  }
})

export default router;