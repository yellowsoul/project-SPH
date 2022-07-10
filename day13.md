1)个人中心完成
面试的时候：是否封装过组件、分页器、日历
个人中心当中：分页器


2）全局守卫

未登录访问，交易相关（trade）、支付相关（pay、paysuccess）、用户中心（center）相关跳转到  登录页面




3）路由独享守卫

只有从购物车界面才能跳转到交易页面（创建订单）
只有从交易页面（创建订单）页面才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面





4）图片懒加载
https://www.npmjs.com/package/vue-lazyload(注意：我在此版本中用的是低版本@1.3.1)





5)vee-validate基本使用

第一步：插件安装与引入
cnpm i vee-validate@2 --save 安装的插件安装 2版本的

import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate)


第二步：提示信息
VeeValidate.Validator.localize('zh_CN', {
  messages:{
    ...zh_CN.messages,
    is:(field) => `${field}必须与密码相同` // 修改内置规则的 message,让确认密码和密码相同
  },
  attributes: { // 给校验的 field 属性名映射中文名称
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'确认密码',
    isCheck:'协议'
  }
})

第三步：基本使用
<input
  placeholder="请输入你的手机号"
  v-model="phone"
  name="phone"
  v-validate="{ required:true, regex: /^1\d{10}$/ }"
  :class="{ invalid: errors.has('phone') }"
/>
<span class="error-msg">{{ errors.first("phone") }}</span>

const success = await this.$validator.validateAll(); //全部表单验证

VeeValidate.Validator.extend('agree', {
  validate: (value) => {
    return value;
  },
  getMessage: field => field + '必须同意'
})





6)路由懒加载
6.1 打包 npm run build

项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
有了 map 就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
所以该文件如果项目不需要是可以去除掉
vue.config.js 配置
productionSourceMap:false


6.2购买云服务器

1：阿里云 2：腾讯云 等等

2：设置安全组，让服务器一些端口号打开

3:利用xshell 6工具,登录服务器


3.1 打开Xftp 7工具，新建 -> 名称：我的服务器 --> 主机：腾讯云公网iP地址-->
3.2 打开xshell连接服务器 -> 新建 -> 名称：我的云云 --> 主机：http://82.156.11.187/ -->点击连接 -->请输入用户名：root --> 密码：'你的密码'
3.3 成功后你就可以通过一些linux指令操作你的服务器了。

linux /根目录
linux常用指令： cd跳转目录  ls查看  mkdir创建目录  pwd查看绝对路径





cd / -> 更改目录去根目录
ls -> 查看目录下其它目录列表 bin  boot data  dev  etc  home lib  lib64  lost+found  media  mnt  opt  proc  [root]  run  sbin  srv  sys [tmp]  usr  var

这里面只有[root]可以操作
cd /root -> 回到初始状态

在root下创建一个文件夹：mkdir hl空格后面跟上文件夹名
创建成功后继续在 hl 文件夹里创建 cd hl
ls查看文件夹里面内容，此时什么都没有，我们可以开始创建 mkdir www

创建好了结构为 hl -> www
cd www进入
再创建 mkdir shangpinhui
完成【hl -> www -> shangpinhui】 --->将来的dist文件直接放里头

4 打开桌面Xftp 7工具：传文件，把本地的文件上传到云服务器上
4.1新建会话属性，名称：我的大地，主机地址：82.156.11.187 -->点击连接
4.2弹出输入用户名：root 输入密码：***** 完成后-->远程服务器会显示你刚刚创建的【hl】文件夹 --->将来把地址放进里面的shangpinhui去就可以了

PS：如果不用linux指令，可以直接用Xftp 7可视化工具在刚刚创建的“我的在地”右击直接新建（^_^）...。刚刚那一顿操作只为简单了解linex基本使用。

（未完待续...）


6.5【nginx反向代理】
yum install nginx [etc]

location / {
  root  /root/hl/www/shangpinhui/dist;
  index index.html;
  try_files $url/ /index.html;
}

location /api {
  proxy_pass http://182.92.128.115;
}

service nginx start
service nginx restart
service nginx stop





6.6 nginx?
问题1：为什么访问服务器IP地址就可以访问到咱们项目？ ---配置一些东西
http://82.156.11.187/
刚刚在服务器上=> /root/hl/www/shangpinhui/dist


问题2：项目的数据来自于http://gmall-h5-api.atguigu.cn


解决：使用nginx 让购买的服务器IP地址可访问 -> 找本项目中使用的那个地址要数据

3：过程演示
3.1：Xshell：连接服务器，进入到根目录/etc
3.2：进入etc目录，这个目录下有一个nginx目录，进入到这个目录【已经安装过，如果没有安装过，只有四五个文件】
3.3：如果想安装nginx: yum install nginx
3.4：安装完nginx服务器以后，你会发现在nginx目录下，多了一个nginx.conf文件，在这个文件中进行配置
3.5：vim nginx.conf进行编辑，主要添加如下两项
按住【insert】编辑
// 解决第一个问题
location / {
  root  /root/hl/www/shangpinhui/dist;
  index index.html;
  try_files $url/ /index.html;
}
// 解决第二个问题，所谓反向代理：让nginx替咱们上线的这台服务器，去别的服务器要数据
location /api {
  proxy_pass http://gmall-h5-api.atguigu.cn;
}

【esc】退出
【wq】保存完成
3.6：nginx服务跑起来：
service nginx start


cd / -> 进入根目录，ls查看 里头有个[etc]
cd etc -> ls 查看(很多....)，可以看到etc下默认有一个目录 nginx 
cd nginx -> ls查看(四五个文件) ->安装：yum install nginx 
vim nginx.conf 进行编辑







复习：
昨天支付（ elementUI + qrcode ） + 个人中心（二级路由）