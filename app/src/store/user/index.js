// 登录与注册的模块
import { reqGetCode, reqUserLogin, reqUserRegister } from '@/api'
const state = {
  code: "",
  token:""
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token){
    state.token = token
  }
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的这个接口,把验证码返回,但是正常情况,后台把验证码发到用户手机上【省钱】
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    console.log(result)
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },

  // 登务业务【token】
  async userLogin({ commit }, data){
    let result = await reqUserLogin(data);
    // 服务器下发token，用户唯一标识符(uuid)
    // 将来经常通过带token找服务器要用户信息进行展示
    if(result.code == 200){
      commit('USERLOGIN',result.data.token);
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
