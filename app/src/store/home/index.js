import {reqCategoryList} from '@/api';
// home模块的小仓库
// state:仓库存储数据的地方
const state = {};
// mutations:修改state的唯一手段
const mutations = {};
// action:处理action，可以书写自己的逻辑，也可以处理异步
const actions = {
  // 这里可以书写业务逻辑，但是不能修改state
  // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList(){
    let result = await reqCategoryList()
    console.log(result)
  }

};
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

export default{
  state,
  mutations,
  actions,
  getters
}