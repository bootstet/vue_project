<template>
  <div class="app">
        <v-header></v-header>
        <div class="tab">
             <div class="tab-item">
                  <router-link to="/goods">商品</router-link> 
             </div>  
             <div class="tab-item">
                   <router-link to="/ratings">评论</router-link>
             </div>  
             <div class="tab-item">
                  <router-link to="/seller">结构</router-link>
             </div>  
        </div>
         <router-view></router-view>
        <div class="content">
              im content
        </div>
        
  </div>
</template>

<script>
//引入header组件
import header from './components/header/header.vue'
export default {
      components:{
            'v-header':header
      }
}
</script>

<style lang="scss">
      .app{
            .tab{
                  display: flex;
                  width:100%;
                  height:40px;
                  line-height:40px;
                  .tab-item{
                        flex:1;
                        text-align: center;
                        a{
                              display: block;
                              font-size:16px;
                              color:rgb(77,85,93);
                        }
                        .active{
                                    background-color: yellow;
                              }
                  }
            }
      }
</style>
