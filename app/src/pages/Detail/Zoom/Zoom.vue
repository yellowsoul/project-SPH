<template>
  <div class="spec-preview" ref="small">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigimg"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
      return {
        currentIndex:0
      }
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted(){
      // 全局事件总线：获取兄弟组件传递过来的索引值
      this.$bus.$on('getIndex',(index) => {
        // 修改当前响应式数据
        this.currentIndex = index;
      })
    },
    methods:{
      // 
      handler(event){
        let mask = this.$refs.mask;
        let maskW = mask.offsetWidth;
        let maskH = mask.offsetHeight;
        let left = event.offsetX - maskW / 2;
        let top = event.offsetY - maskH / 2;
       
        // 约束范围
        let samll = this.$refs.small
        let samllW = samll.offsetWidth;
        let samllH = samll.offsetHeight;
        let maxX = samllW - maskW;
        let maxY = samllH - maskH;

        if(left<=0)left = 0;
        if(left>=maxX)left = maxX;
        if(top<=0)top = 0;
        if(top>maxY) top = maxY;

        // 修改元素的left|top属性值
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'

        // 计算大图位置
        let big = this.$refs.bigimg;
        let bigW = big.offsetWidth;
        let rate = bigW / samllW;

        big.style.left = -left * rate + 'px'
        big.style.top = -top * rate + 'px'

      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>