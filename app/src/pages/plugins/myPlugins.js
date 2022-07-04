// vue插件一定暴露一个对象
let myPlugins = {}

myPlugins.install = function(Vue,options){
  console.log('调用自定义插件...');
  // Vue.prototype.$bus:任何组件都可以使用
  // Vue.directive(); // 全局指令
  // Vue.component // 全局组件
  // Vue.filter.....

  // 自写一个自定义全局指令 v-upper
  // 参数：1.事件名 2.回调（元素,对象属性）
  Vue.directive(options.name, (element,params)=>{
    console.log('执行');
    element.innerHTML = params.value.toUpperCase(); // 把使用自定义指令v-upper的元素的属性值（小写转为大写）
    
    // console.log(params); => 里面有个modifiers{erha:true} 修饰符:v-upper.erha
  });
  
}

export default myPlugins;