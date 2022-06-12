<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view />
    <!-- 在Home、Search是显示的、在登录、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {};
  },
  mounted() {
    // 派发一个action||获取商品分类的三级数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
  methods: {},
};
</script>

<style scoped>
</style>
