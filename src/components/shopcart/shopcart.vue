<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totleCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight':totleCount>0}"></i>
                    </div>
                    <div class="num" v-show="totleCount>0">
                        {{totleCount}}
                    </div>
                </div>
                <div class="price" :class="{'highlight':totleCount>0}"> ¥{{totlePrice}}</div>
                <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="boll-container">
            <transition v-for="(ball,index) in balls" :key="index" v-show="ball.show" name="drop" class="ball"
            @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                <div class="inner inner-hook"></div>
            </transition>
        </div>      
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content"  ref="listContent">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span class="">¥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list-mask" v-show="listShow"></div>
    </div> 
    
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol.vue";
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
      // listShow:false
    };
  },
  computed: {
    totlePrice() {
      let totle = 0;
      this.selectFoods.forEach(food => {
        totle += food.price * food.count;
      });
      return totle;
    },
    totleCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totlePrice === 0) {
        return `¥${this.minPrice}元起送`;
      } else if (this.totlePrice < this.minPrice) {
        let diff = this.minPrice - this.totlePrice;
        return `还差¥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totlePrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      if (!this.totleCount) {
        this.fold = true;
        return false;
      }
      console.log(444)
      let show = !this.fold;
      console.log(show);
      if (show) {
        console.log(this.$refs.listContent);
        console.log(222222);
        this.$nextTick(() => {
          if (!this.scroll) {
            console.log(111);
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            console.log(222);
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.displíay = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    },
    toggleList() {
      if (!this.totleCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty(){
        this.selectFoods.forEach((food)=> {
            food.count = 0;
        })
    }
  },
  // transitions:{
  //     drop: {
  //         beforeEnter(el){
  //             let count = this.balls.length;
  //             while (count--){
  //                 let ball = this.balls[count];
  //                 if(ball.show){
  //                     let rect = ball.el.getBoundingClientRect();
  //                     let x = rect.left -32;
  //                     let y = -(window.innerHeight - rect.top -22);
  //                     el.style.display = '';
  //                     el.style.wekitTransform = `translate3d(0,${y},0)`;
  //                     el.style.transform = `translate3d(0,${y},0)`;
  //                     let inner = el.getElementsByClassName("inner-hook")[0];
  //                     inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
  //                     inner.style.tranform = `translate3d(${x}px,0,0)`;
  //                 }
  //             }
  //         },
  //         enter(el){
  //             /* eslint-disable no-unused-vars */
  //             let rf = el.offsetHeight;
  //             this.$nextTick(()=>{
  //                 el.style.wekitTransform = 'translate3d(0,0,0)';
  //                 el.style.transform = 'translate3d(0,0,0)';
  //                 let inner = el.getElementsByClassName("inner-hook")[0];
  //                 inner.style.webkitTransform = 'translate3d(0,0,0)';
  //                 inner.style.tranform = 'translate3d(0,0,0)';
  //             })
  //         },
  //         afterEnter(el){
  //             let ball = this.dropBalls.shift();
  //             if(ball){
  //                 ball.show = false;
  //                 el.style.display = 'none';
  //             }
  //         }
  //     }
  // }
  components: {
    cartcontrol
  }
};
</script>
<style lang="scss">
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
          &.highlight {
            background: rgb(0, 160, 220);
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        background: #2b333b;
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 32px;
      z-index: 200;
      &.drop-transition {
        transition: all 0.4s;
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all 0.4s;
        }
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-100%);
    z-index: -1;
    width: 100%;
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(8, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}
</style>

