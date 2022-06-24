<template>
  <div>
    <!-- 三级联动的全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- Floor这个组件：自己在组件内部是没有发请求的，数据是父组件给的 -->
    <Floor 
      v-for="(floor, index) in floorList" :key="floor.id"
      :list="floor"
    />
    <Brand/>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';

import {mapState} from 'vuex';
export default {
  name:'',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  data () {
    return {}
  },
  mounted(){
    // 第一次书写Swiper的时候，在mounted当中书写是不可以的，但是为什么现在这里可以了？
    // 因为第一次书写轮播图的时候，是在当前组件的内部发请求、动态渲染结构【前提至少服务器的数据需要回来】，因此当年的写法在这里不行
    // 现在的这种写法为什么可以：因为请求是父组件发的，父组件通过props传递过来的，而且结构都已经有了的情况下执行mounted
    this.$store.dispatch("getFloorList");

    // 获取用户信息在首页展示
    this.$store.dispatch("getUserInfo");
  },
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  }
}
</script>

<style scoped>
</style>
