<template>
    <div>
        <el-container>
            <el-main style="padding:0">
                <img src="https://img.xiaopiu.com/userImages/img835164495cb9b8.jpg" alt="背景图" class='main-background'>
                <div class='title-box'>
                    <h1 class='box-title-text'>WeShare</h1>
                    <span class="box-slogan">slogan</span>
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
.title-box {
  position: absolute;
  left: 0;
  top: 350px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 50px 200px 50px 300px;

}

.box-title-text {
  font-size: 45px;
}

.box-slogan {
  margin-bottom: 25px;
  font-size: 28px;
}

.box-start-button {
  font-size: 20px;
  width: 160px;
  height: 60px;
}
</style>
