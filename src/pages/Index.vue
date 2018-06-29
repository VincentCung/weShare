<template>
    <div>
        <el-container>
            <el-main>
                <img src="https://img.xiaopiu.com/userImages/img875164496eab78.jpg" alt="背景图" class='main-background'>
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
    methods:{
        start() {
            this.$router.push({path:'/square'})
        }
    }
};
</script>
<style>
.main-background {
  width: 100%;
  max-width: 100%;
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
}

/*-----------------------------------title-box------------------------------------*/
.title-box {
  position: fixed;
  right: 300px;
  top: 350px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}



.box-title-text {
    font-size: 45px;
}

.box-slogan {
    margin-bottom:25px; 
    font-size: 28px;
}

.box-start-button {
    font-size:20px;
    width: 160px;
    height: 60px;
}
</style>
