<template>
  <div>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"> 
            
        </span>
    </div>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_OFF = 'off';
const CLS_HALF = 'half';

export default {
   
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        },
    },
    computed: {
        starType(){
            return 'star-' + this.size;
        },
        itemClasses(){
            let result = [];
            let score = Math.floor(this.score*2)/2;
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for (let i = 0; i < integer; i++){
                result.push(CLS_ON);
            }
            if (hasDecimal) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH){
                result.push(CLS_OFF);
            }  
            console.log(result)
            return result;
        }
    },
    created() {
        // console.log(this.)
    }

}
</script>

<style lang="scss" >
@import "../../common/sass/mixin.scss";
   .star{
       font-size: 0;
       .star-item{
           display: inline-block;
           width: 20px;
           height: 20px;
           background-repeat: no-repeat;
           @include bg-image("star48_on");
       }
       &.star-48{
           .star-item{
                width: 20px;
                height: 20px;
                margin-right: 20px;
                background-size: 20px 20px;
                &.on{
                    //    background-image: url("./star24_half@2x.png");
                    @include bg-image("star48_on");
                }
                &.half{
                    @include bg-image("star48_half");
                }
                &.off{
                    @include bg-image("star48_off");
                }
                &:last-child{
                    margin-right: 0;
                }
           }
       }
       &.star-36{
           .star-item{
               width: 15px;
                height: 15px;
                margin-right: 6px;
                background-size: 15px 15px;
                &.on{
                    @include bg-image("star36_on");
                }
                &.half{
                    @include bg-image("star36_half");
                }
                &.off{
                    @include bg-image("star36_off");
                }
                &:last-child{
                    margin-right: 0;
                        
                }
           }
           
       }
       &.star-24{
           .star-item{
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size: 10px 10px;
                &.on{
                    @include bg-image("star24_on");
                }
                &.half{
                    @include bg-image("star24_half");
                }
                &.off{
                    @include bg-image("star24_off");
                }
                &:last-child{
                    margin-right: 0;
                        
                }
           }
           
       }
     
   }
</style>
