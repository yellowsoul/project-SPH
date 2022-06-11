// 当前这个模块：API进行统一管理
import requests from './request';

// 三级联动的接口
// /api/product/getBaseCategoryList  GET  无参数
// 发请求axios发请求返回结果Promise对象
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})
