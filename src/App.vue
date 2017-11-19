<template>
  <div class="app">
        <v-header :seller="seller"></v-header>
        <div class="tab">
             <div class="tab-item">
                  <router-link to="/goods">商品</router-link> 
             </div>  
             <div class="tab-item">
                   <router-link to="/ratings">评价</router-link>
             </div>  
             <div class="tab-item">
                  <router-link to="/seller">商家</router-link>
             </div>  
        </div>
         <router-view :seller="seller"></router-view>
        <div class="content">
              <!-- im content -->
        </div>
        
  </div>
</template>

<script>
//引入header组件
import header from './components/header/header.vue'
export default {
      data() {
            return {
                  seller: {}
            }
      },
      created () {
            this.$http.get('../data.json').then(response => {
                  this.seller = response.body.seller
            },error => {
                  console.log(error)
            })
      },
      components:{
            'v-header':header,
            // star
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
                  // border-bottom: 1px solid #ddd;
                  .tab-item{
                        flex:1;
                        text-align: center;
                        a{
                              display: block;
                              font-size:16px;
                              color:rgb(77,85,93);
                              border-bottom:1px solid rgba(77,85,93,0.1);
                        }
                        .active{
                               color: rgb(240,20,20);
                               border-bottom: none;
                              }
                  }
            }
      }
</style>
