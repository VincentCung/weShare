<template>
  <div class='main-page'>
    <div class="main-container">
      <div class='header-wrap'>
        <main-header :name="'用户名'" :follow-able="isOthers" @follow="follow" :is-follow="isFollow" :show-loading='followLoading'></main-header>
      </div>
      <div class='body-wrap'>
        <el-row :gutter="20">
          <el-col :span="16">
            <weibo v-for="weibo in weibos" :delete-able="!isOthers" :content='weibo.content' :key="weibo.id"> </weibo>
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
import Weibo from "@/components/Weibo"

export default {
  data() {
    return {
      isFollow: false,
      followLoading: false,
      userName: null,
      weibos:[
        {
          id:"!@3",
          content:{
            name:"用户名",
            create_time:'5月6日 22:30',
            context:"111111111111111111111111111111111111",
            read_count:12,
            comment_count:12,
            transmit_count:12,
            thumb_count:30,
          }
        }
      ]
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
    if (this.isOthers) {
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
  },
  computed: {
    isOthers() {
      return !!(this.$route.query.userId && this.$store.state.user.id);
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
  margin-top:20px;
}
</style>
