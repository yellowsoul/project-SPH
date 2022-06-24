// 当前这个模块：API进行统一管理
import requests from './request';
import mockRequests from './mockRequest';

// 三级联动的接口
// /api/product/getBaseCategoryList  GET  无参数
// 发请求axios发请求返回结果Promise对象
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起请求，获取咱们的三级菜单数据，当前咱们这个函数只需要把服务器返回结果返回即可。
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});
// 切记：当前函数执行需要把服务器返回结果返回

// 获取banner(Home首页轮播图接口) // mockRequests.get('/banner');
export const reqGetBannerList = () => mockRequests({url:'/banner', method:'get'});

// 获取floor数据
export const reqFloorList = () => mockRequests({url:'/floor',method:'get'}); // export const reqFloorList = () => mockRequests.get("/floor");


// 获取搜索模块数据 地址：/api/list  请求方式：post  参数：需要带参数
/**
 {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
// 当前这个函数需不需要接受外部传递参数
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数params【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post', data:params})


// 获取产品详情信息的接口： URL: /api/item/{ skuId }  请求方式：get

export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`, method:'get'})


// 将产品添加到购物车中（获取更新某一个产品的个数）URL: /api/cart/addToCart/{ skuId }/{ skuNum }

export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

// 获取购物车列表数据接口 URL: /api/cart/cartList
export const reqCartList = () => requests({url:'/cart/cartList', method:'get'})

// 删除购物车产品的接口 URL: /api/cart/deleteCart/{skuId}  method:delete
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})

//修改商品的选中状态 URL: /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'})

// 获取验证码  URL: /api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册 URL: /api/user/passport/register method:post  phone code password
export const reqUserRegister = (data) => requests({url:`/user/passport/register`, data, method:'post'})

// 登录 URL:/api/user/passport/login method:post phone password
export const reqUserLogin = (data) => requests({url:'/user/passport/login', data, method:'post'})

// 获取用户信息【需要带着用户的token向服务器要用户信息】 URL: /api/user/passport/auth/getUserInfo  method:get

export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo', method:'get'})