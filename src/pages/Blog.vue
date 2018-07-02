<template>
  <div class='main-page'>
    <div class="main-container">
      <div class='header-wrap'>
        <main-header :name="'用户名'" :follow-able="followAble" @follow="follow" :is-follow="isFollow" :show-loading='followLoading'></main-header>
      </div>
    </div>

  </div>

</template>
<script>
import MainHeader from "@/components/MainHeader";

export default {
  data() {
    return {
      isFollow: false,
      followLoading: false,
      userName: null,
      followAble: false
    };
  },
  components: {
    MainHeader
  },
  methods: {
    follow() {
      this.followLoading = true;
      this.$_http
        .post("/message/follow", {
            is_follow:!this.isFollow,
            followedId: this.$route.query.userId,
            followerId: this.$store.state.user.id
        })
        .then(response => {
          if(response.data.msg.success>0){
            console.log(response)
            this.isFollow = !this.isFollow
            this.followLoading=false
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    if (this.$route.query.userId && this.$store.state.user.id) {
      this.followAble = true;
      this.$_http
        .get("/message/follow", {
          params: {
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
</style>
