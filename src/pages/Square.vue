<template>
  <div class="square-fram">
    <div class="left_nav_div">
      <el-menu default-active="0" class="left_nav_menu" @open="handleOpen" @close="handleClose">
        <el-menu-item  index="0" >
          <span slot="title" class="left_nav_item">热门</span>
        </el-menu-item>
        <el-menu-item v-for='(item,index) in menuItems' :index="index+1" :key='item.id'>
          <span slot="title" class="left_nav_item">{{item.name}}</span>
        </el-menu-item>
        <el-menu-item  :index="menuItems.length+1" >
          <span slot="title" class="left_nav_item">更多</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="square-body">
      <div class="carousel-block">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in imgList" :key="item">
            <h3>
              <img :src="item" alt="图片">
            </h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      imgList: [
        require("../assets/1.jpg"),
        require("../assets/2.jpg"),
        require("../assets/3.jpg"),
        require("../assets/4.jpg"),
        require("../assets/5.jpg")
      ],
      menuItems: [
        {
          name: "世界杯",
          id: 1
        },
        {
          name: "游戏",
          id: 2
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.square-fram {
  background: #b3dddc;
  margin: 0;
}

.square-body {
  width: 920px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
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
  position: fixed;
  top: 120px;
}
</style>
