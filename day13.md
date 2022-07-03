1)个人中心完成
面试的时候：是否封装过组件、分页器、日历
个人中心当中：分页器


2）全局守卫

未登录访问，交易相关（trade）、支付相关（pay、paysuccess）、用户中心（center）相关跳转到  登录页面




3）路由独享守卫
只有从购物车界面才能跳转到交易页面（创建订单）
只有从交易页面（创建订单）页面才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面

4）图片懒加载
https://www.npmjs.com/package/uve-lazyload





5)vee-validate基本使用

第一步：插件安装与引入
cnpm i vee-validate@2 --save 安装的插件安装 2版本的

import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validete/dist/locale/zh_CN'
Vue.use(VeeValidate)

第二步：提示信息
VeeValidate.Validator.localize('zh_CN', {

})














复习：
昨天支付（ elementUI + qrcode ） + 个人中心（二级路由）