//引包
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
 // 注册使用
Vue.use(VueRouter)
Vue.use(VueResource)
import App from './App.vue'

// 设置路由
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

import '../statics/css/reset.css'
import '../src/common/sell-icon/style.css'

// 创建并设置路由
const router = new VueRouter({
      routes:[
            {path:'/',component:goods},
            {path:'/goods',component:goods},
            {path:'/ratings',component:ratings},
            {path:'/seller',component:seller},
      ],
      linkActiveClass:'active'
})
new Vue({
      el:"#app",
      router:router,
      render:function(createElement){
                //这里的写法有很多，如果我们是直接导入单文件组件，就像下面这样写
                return createElement(App)
            }
})