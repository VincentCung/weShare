<template>
    <div class="main">
        <div class="main-box">
            <img :src="notFound" alt="" width="400" height="400">
            <span class="box-tip"> 您可能还没登录呢，回到首页登录后重试</span>
            <el-button class='box-start-button' type="primary" @click="$router.replace('/square')">回到首页</el-button>
        </div>
    </div>
</template>
<style scoped>
.main-box {
  width: 600px;
  margin: 16px auto 0;
  padding: 25px 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-tip {
    margin-bottom: 20px;
}
.box-start-button {
  font-size: 20px;
  width: 160px;
  height: 60px;
}

</style>
<script>
export default {
  data() {
    return {
      notFound: require("../assets/image/404-01.png")
    };
  }
};
</script>
