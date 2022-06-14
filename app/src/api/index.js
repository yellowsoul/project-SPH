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
export const reqFloorList = () => mockRequests({url:'/floor',method:'get'});