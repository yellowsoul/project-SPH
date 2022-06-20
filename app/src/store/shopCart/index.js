import { reqCartList } from '@/api'
const state = {};
const mutations = {};
const actions = {
  // 获取购物车列表数据
  async getCartList({commit}){
    let result = await reqCartList();
    console.log(result)
    // if(result.code == 200){
    //   commit('GETCARTLIST')
    // }
  }

};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}