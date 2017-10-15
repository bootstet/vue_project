<template>
  <div class="goods">
        <div class="menu-wrapper" ref="menuwrapper">
          <ul>
            <li v-for="(item,index) in goods" class="menu-item" :key="index" :class="{'current':currentIndex===index}"
            @click="sclectMenu(index,$event)">
              <span class="text">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                {{item.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodswrapper">
          <ul>
            <li v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="(food,index) in item.foods" class="food-item" :key="index">
                  <div class="icon">
                    <img :src="food.icon" alt="" width="57" height="57">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span> <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data(){
    return{
      goods:[],
      listHeight:[],
      scrollY:0,
    }
  },
  computed:{
    currentIndex(){
      for(let i =0;i<this.listHeight.length;i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
           return i;
        }
      }
      return 0;
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
//       Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
// $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
      this.$nextTick(()=>{
        this._initScroll();
        this._calculateHeight();
      })
      
      console.log(this.goods)
    },err => {
      console.log(err);
    })
  },
  methods: {
    sclectMenu(index,evnet){
      if(!event._constructed){
        return;
      }
      console.log(index);
      let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el,500);
    },
    _initScroll(){
      this.menuScroll = new BScroll(this.$refs.menuwrapper,{
        click : true
      });
      this.foodsScroll = new BScroll(this.$refs.foodswrapper,{
        probeType : 3
      });
      this.foodsScroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight(){
      let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0; i<foodList.length;i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
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
         &.current{
           position: relative;
           margin-top: -1px;
           z-index: 10px;
           background: #fff;
           font-weight: 700;
           .text{
             border: none;
           }
         }
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
       .title{
         padding-left: 17px;
         height: 26px;
         line-height: 26px;
         border-left: 2px solid #d9dde1;
         font-size: 12px;
         color: rgb(147,153,159);
         background: #f3f5f7;
         
       }
       .food-item{
           display: flex;
           margin: 18px;
           padding-bottom: 18px;
           border-bottom: 1px solid rgba(1,17,27,0.1);
           &:last-child{
             border: none;
             margin-bottom: 0;
           }
           .icon{
             flex: 0 0 57px;
             margin-right: 10px;

           }
           .content{
             flex: 1;
             .name{
               margin: 2px  0 8px 0;
               height: 14px;
               line-height: 14px;
               font-size: 14px;
               color: rgb(7,17,27);
             }
             .desc{
               margin-bottom: 8px;
               line-height: 12px;
               font-size: 10px;
               color: rgb(147,153,159);
             }
             .extra{
               line-height: 10px;
               font-size: 10px;
               color:rgb(147,153,159);
               .count{
                 margin-right: 12px;

               }
             }
             .price{
               font-weight: 700;
               line-height: 24px;
               .now{
                 color: rgb(240,20,20);
                 margin-right: 8px;
                 font-size: 14px;
               }
               .old{
                 text-decoration: line-through;
                 font-size: 10px;
                 color:rgb(147,153,159);
               }
             }
           }
         }
     }
   }
</style>
