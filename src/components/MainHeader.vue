<template>
    <div>
        <div class='header-box'>
            <img :src="imageUrl" alt="头像" class='box-avatar'>
            <h2 class='box-name'>{{name}}</h2>
            <el-button v-if="subscribeAble" icon="el-icon-plus" class='box-button'>
                订阅
            </el-button>
        </div>
    </div>
</template>
<style>
    .header-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8)
    }
</style>
<script>
export default {
  props: {
    subscribeAble: Boolean,
    name:String,
    imageUrl:String,
  }
};
</script>


