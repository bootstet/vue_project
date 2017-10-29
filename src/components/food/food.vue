<template>
    <div v-show="showFlag" class="food">

    </div>
</template>
<script>
export default {
    data(){
        return{
            showFlah:true
        }
    },
    props:{
        food:{
            type:Object
        }
    },
    methods:{

    }
}
</script>
<style lang="scss">
    .food{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
    }
</style>

