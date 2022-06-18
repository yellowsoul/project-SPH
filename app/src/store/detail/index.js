import { reqGoodsInfo } from '@/api'
const state = {
  goodsInfo:{}
};
const mutations = {
  GETGOODSINFO(state,goodsInfo){
    state.goodsInfo = goodsInfo;
  }
};
const actions = {
  // 获取产品信息的action
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if(result.code == 200){
      commit('GETGOODSINFO',result.data);
    }
  }
};
// 简化数据而生
const getters = {
  // 路径导航简化的数据
  categoryView(state){
    // 比如：state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    // 当前计算出的categoryView属性值至少是一个空对象，“假的报错”就不会有了。
    return state.goodsInfo.categoryView || {};
  },
  // 简化产品信息的数据
  skuInfo(state){
    return state.goodsInfo.skuInfo || {};
  },
  // 产品的售卖属性的简化
  spuSaleAttrList(state){
    return state.goodsInfo.spuSaleAttrList || [];
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}