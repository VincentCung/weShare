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
            <weibo v-for="weibo in weibos" :delete-able="!isOthers" :content='weibo.content' :key="weibo.id" :name='userName' :avatar-url='avatarUrl'> </weibo>
          </el-col>
          <el-col :span="8">
            <div style="background-color:red">123</div>
          </el-col>
        </el-row>
      </div>

    </div>

  </div>

</template>
<script>
import MainHeader from "@/components/MainHeader";
import Weibo from "@/components/Weibo";

export default {
  data() {
    return {
      isFollow: false,
      followLoading: false,
      userName: '',
      avatarUrl:'',
      weibos: []
    };
  },
  components: {
    MainHeader,
    Weibo
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
        console.log(response.data)
        let data = response.data.msg
        this.weibos = data.weibos
        this.userName = data.user.name
        this.avatarUrl = data.user.photo
      })
      .catch(error => {
        console.log(error);
      });
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
