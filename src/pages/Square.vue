<template>
  <div>
    <div class="square-body">
      <div class="left-navbar">
        <ul>
          <li class='navbar-item'>
            <div class='navbar-item-block item-cur'>热门</div>
          </li>
          <li v-for='(item) in menuItems' :key='item.id' class='navbar-item'>
            <router-link :to="'/interest?id='+item.id" class='navbar-item-block'>{{item.name}}</router-link>
          </li>
          <li class='navbar-item'>
            <router-link to="/more" class='navbar-item-block'>更多</router-link>
          </li>
        </ul>
      </div>
      <div class="body-wrap">

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
  </div>
</template>


<script>
export default {
  data() {
    return {
      imgList: [
        require("../assets/image/1.jpg"),
        require("../assets/image/2.jpg"),
        require("../assets/image/3.jpg"),
        require("../assets/image/4.jpg"),
        require("../assets/image/5.jpg")
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
<style scoped>
.square-body {
  width: 1050px;
  margin: 16px auto 0;
}

.body-wrap {
  background-color: #fff;
  margin-left: 130px;
  min-height: 1000px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.left-navbar {
  position: fixed;
  width: 110px;
}

.navbar-item {
  margin-bottom: 3px;
}

.navbar-item-block {
  display: block;
  font-size: 18px;
  height: 40px;
  line-height: 42px;
  border-radius: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
}

.navbar-item-block:hover,
.item-cur {
  background-color: #fff;
  color: #5aa9a4;
}
</style>
