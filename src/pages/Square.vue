<template>
  <div class="square_fram">
    <el-container style="overflow: visible">
      <el-aside width="200px" style="overflow: visible">
        <div class="left_nav_div">
          <el-row class="left_nav">
            <el-col :span="2">
              <el-menu default-active="1" class="left_nav_menu" @open="handleOpen" @close="handleClose">
                <el-menu-item index="1">
                  <span slot="title" class="left_nav_item">热门</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <span slot="title" class="left_nav_item">世界杯</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <span slot="title" class="left_nav_item">NBA</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <span slot="title" class="left_nav_item">海贼王</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <span slot="title" class="left_nav_item">音乐</span>
                </el-menu-item>
                <el-menu-item index="6">
                  <span slot="title" class="left_nav_item">更多</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-aside>
      <el-main width="800px">
        <div class="block">
          <el-carousel trigger="click" height="400px">
            <el-carousel-item v-for="item in imgList" :key="item">
              <h3>
                <img :src="item" ait="">
              </h3>
            </el-carousel-item>
          </el-carousel>
        </div>

      </el-main>
    </el-container>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        imgList: [
          require('../assets/1.jpg'),
          require('../assets/2.jpg'),
          require('../assets/3.jpg'),
          require('../assets/4.jpg'),
          require('../assets/5.jpg')
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>
<style>
  .square_fram {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .left_nav_menu {
    width: 150px;
  }

  .left_nav_item {
    font-size: 20px;
  }

  .left_nav_div {
    width: 150px;
    margin-top: 20px;
    position: sticky;
    top: 120px;
  }

  .block {
    width: 800px;
    margin-top: -17px;
  }

</style>
