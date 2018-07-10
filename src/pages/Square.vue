<template>
  <div class="main main-body">
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
        <weibo v-for="weibo in weibos" :content='weibo.content' :key="weibo.id" :id="weibo.id" :name="weibo.user.name" :user-id="weibo.user.id" :avatar-url="weibo.user.photo" @thumb="thumb" :show-loading="weibo.showLoading"> </weibo>
        <div class='nothing-tip' v-if='!weibos.length'>
          <h3>找不到微博呢..</h3>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import Weibo from "@/components/Weibo";
export default {
  components: {
    Weibo
  },
  data() {
    return {
      weibos: [],
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
    thumb(value) {
      let index = this.weibos.findIndex(weibo => {
        return weibo.id == value;
      });
      this.weibos[index].showLoading = true;
      this.$_http
        .post("/weibo/thumb", {
          token: localStorage.getItem("loginToken"),
          is_thumb: this.weibos[index].content.is_thumb ? 0 : 1,
          weibo_id: this.weibos[index].id,
          user_id: this.userId
        })
        .then(response => {
          if (response.data.msg.success > 0) {
            if (this.weibos[index].content.is_thumb) {
              this.weibos[index].content.thumb_count--;
            } else {
              this.weibos[index].content.thumb_count++;
            }
            (this.weibos[index].content.is_thumb = this.weibos[index].content
              .is_thumb
              ? 0
              : 1),
              (this.weibos[index].showLoading = false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.$_http
      .get("/weibo/look_hot", {
        params: {}
      })
      .then(response => {
        this.weibos = response.data.msg.weibos;
        this.weibos.forEach(weibo => {
          weibo.showLoading = false;
          return weibo;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.main-body {
  min-height: 1000px;
}
.square-body {
  width: 1050px;
  margin: 16px auto 0;
}

.body-wrap {
  margin-left: 130px;
}

/*------------------------------------nav----------------------*/
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

.carousel-block {
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin-bottom: 10px;
}

.nothing-tip {
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
</style>
