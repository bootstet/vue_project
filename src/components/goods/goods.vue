<template>
  <div class="goods">
        <div class="menu-wrapper">
          <ul>
            <li v-for="item in goods" class="menu-item">
              <span class="text">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                {{item.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      goods:[]
    }
  },
  props:{
    seller:{
      type: Object
    }
  },
  created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee'];
    this.$http.get("../data.json").then(response => {
      this.goods = response.body.goods;
      console.log(this.goods)
    },err => {
      console.log(err);
    })
  }
}
</script>

<style lang="scss">
@import "../../common/sass/mixin.scss";
   .goods{
     display: flex;
     position: absolute;
     top: 174px;
     bottom: 46px;
     width: 100%;
     overflow: hidden;
     .menu-wrapper{
       flex: 0 0 80px;
       width: 80px;
       background-color: #f3f5f7;
       .menu-item{
         display: table;
         height: 54px;
         width: 56px;
         line-height: 14px;
         padding: 0 12px;
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease{
                  @include bg-image("decrease_3");
            }
            &.discount{
                  @include bg-image("discount_3");
            }
            &.guarantee{
                  @include bg-image("guarantee_3"); 
            }
            &.invoice{
                  @include bg-image("invoice_3");      
            }
            &.special{
                  @include bg-image("special_3"); 
            }
          }
          .text{
            display: table-cell;
            width: 56px;
            font-size: 12px;
            vertical-align: middle;
            border-bottom: 1px solid rgba(1,17,27,0.1);
          }
       }
     }
     .foods-wrapper{
       flex: 1;
     }
   }
</style>
