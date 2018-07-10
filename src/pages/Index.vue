<template>
  <div>
    <el-container>
      <el-main style="padding:0;">
        <img src="../assets/image/woman.jpg" alt="背景图" class='main-background'>
        <div class='button-box'>
          <el-button class='box-start-button' type="primary" @click="start">发 现</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    start() {
      this.$router.push({ path: "/square" });
    }
  }
};
</script>
<style scoped>
.main-background {
  width: 100%;
  z-index: -100;
  position: absolute;
  left: 0;
}

/*-----------------------------------title-box------------------------------------*/
.button-box {
  position: absolute;
  top: 600px;
  right: 20%;
  box-sizing: border-box;
}

.box-start-button {
  font-size: 20px;
  width: 160px;
  height: 60px;
}
</style>
