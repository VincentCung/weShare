<template>
  <div class='main-page'>
    <div class="main-container">
      <div class='header-wrap'>
        <main-header :name="userName" :follow-able="isOthers&&$store.state.is_login" @follow="follow" :is-follow="isFollow" :show-loading='followLoading' :image-url='avatarUrl'></main-header>
      </div>
      <div class='body-wrap'>
        <el-row :gutter="20">
          <el-col :span="16">
            <!-- TODO:微博转发 -->
            <!-- TODO:没有微博的时候 -->
            <weibo v-for="weibo in weibos" :delete-able="!isOthers" :content='weibo.content' :key="weibo.id" :name='userName' :avatar-url='avatarUrl'> </weibo>
          </el-col>
          <el-col :span="8">
            <user-side-bar :info='result' :isOthers="isOthers"></user-side-bar>
          </el-col>
        </el-row>
      </div>

    </div>

  </div>

</template>
<script>
import MainHeader from "@/components/MainHeader";
import Weibo from "@/components/Weibo";
import UserSideBar from "@/components/UserSideBar";

export default {
  data() {
    return {
      isFollow: false,
      followLoading: false,
      userName: "",
      avatarUrl: "",
      weibos: [],
      result: {
        counter: {
          count_follow: 0,
          count_weibo: 0,
          count_fans: 0
        },
        interests: [
          {
            id: 1,
            photo: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg",
            name: "test"
          }
        ],
        follow: [
          {
            id: 1,
            photo: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg",
            name: "test"
          },
          {
            id: 2,
            photo: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg",
            name: "test"
          }
        ]
      }
    };
  },
  components: {
    MainHeader,
    Weibo,
    UserSideBar
  },
  methods: {
    follow() {
      this.followLoading = true;
      this.$_http
        .post("/message/follow", {
          token: this.$store.state.token,
          is_follow: !this.isFollow,
          followedId: this.$route.query.userId,
          followerId: this.$store.state.user.id
        })
        .then(response => {
          if (response.data.msg.success > 0) {
            console.log(response);
            this.isFollow = !this.isFollow;
            this.followLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    if (this.isOthers && this.$store.state.is_login) {
      this.$_http
        .get("/message/follow", {
          params: {
            token: this.$store.state.token,
            followedId: this.$route.query.userId,
            followerId: this.$store.state.user.id
          }
        })
        .then(response => {
          this.isFollow = !!response.data.msg.is_follow;
        })
        .catch(error => {
          console.log(error);
        });
    }
    let params = { targetId: this.$route.query.userId };
    if (this.$store.state.is_login) {
      params.token = this.$store.state.token;
    }
    this.$_http
      .get("/weibo/user", {
        params
      })
      .then(response => {
        console.log(response.data);
        let data = response.data.msg;
        this.weibos = data.weibos;
        this.userName = data.user.name;
        this.avatarUrl = data.user.photo;
      })
      .catch(error => {
        console.log(error);
      });
    //TODO: 请求其他信息
  },
  computed: {
    isOthers() {
      return !!this.$route.query.userId;
    }
  }
};
</script>
<style>
.main-page {
  background-color: #47bcc9;
}
.main-container {
  width: 920px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}

.body-wrap {
  margin-top: 20px;
}
</style>
