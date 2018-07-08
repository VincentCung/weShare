<template>
  <div class="main">
    <div class="tab-box">
      <el-tabs>
        <el-tab-pane label="找微博" name="0">
          <weibo v-for="weibo in weibos" :content='weibo.content' :key="weibo.id" style="background-color:#e1e1e1" :name="weibo.user.name" :avatar-url="weibo.user.photo" :id="weibo.id" :user-id="weibo.user.id" />
          <div class='nothing-tip' v-if='!weibos.length'>
            <h3>找不到微博呢..</h3>
          </div>
        </el-tab-pane>
        <el-tab-pane label="找人" name="1">
          <router-link v-for="item in users" :key="item.id" :to="'/blogs?userId='+item.id">
            <div class="user-card-box">
              <div class="box-avatar">
                <img :src="item.photo" alt="">
              </div>
              <div class="box-detail">
                <span>{{item.name}}</span>
                <span> {{userGender(item.gender)}}</span>
              </div>
            </div>
          </router-link>
        </el-tab-pane>
      </el-tabs>
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
      users: [],
      weibos: []
    };
  },
  methods: {
    userGender(gender) {
      if (gender == 1) {
        return "男";
      } else if (gender == 2) {
        return "女";
      } else {
        return "";
      }
    }
  },
  created() {
    this.$_http
      .get("/weibo/search", {
        params: {
          sort: 0,
          keyword: this.$route.query.keyword
        }
      })
      .then(response => {
        this.weibos = response.data.msg.weibos;
      })
      .catch(error => {
        console.log(error);
      });
    let params = {
      sort: 1,
      keyword: this.$route.query.keyword
    };
    if (localStorage.getItem("loginToken")){
      params.token = localStorage.getItem("loginToken")
    }
    this.$_http
      .get("/weibo/search", {
        params
      })
      .then(response => {
        this.users = response.data.msg.users;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
.tab-box {
  width: 600px;
  margin: 16px auto 0;
  padding: 25px 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  min-height: 1000px;
}

.nothing-tip {
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.user-card-box {
  border: 1.5px solid #fff;
  border-radius: 5px;
  width: 100%;
  display: flex;
  text-align: start;
  padding: 10px 15px;
  box-sizing: border-box;
}

.box-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.box-detail {
  margin-left: 20px;
  padding-top: 10px;
  text-decoration: none;
  color: #2c3e50;
  font-size: 20px;
  font-weight: 700;
}

.user-card-box:hover {
  border: 1.5px solid #b3dddc;
}
</style>
