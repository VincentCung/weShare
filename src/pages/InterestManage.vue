<template>
  <div class="main">
    <div class="main-box ">
      <div class="box-title">
        <h2>我订阅的趣点</h2>
      </div>
      <div class="box-body">
        <interest-block v-for="item of interests" :key="item.id" :interest="item"></interest-block>
        <div class='nothing-tip' v-if='!interests.length'>
          <h3>你还没有订阅趣点呢..</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InterestBlock from "@/components/InterestBlock";

export default {
  data() {
    return {
      interests: []
    };
  },
  components: {
    InterestBlock
  },
  created() {
    this.$_http
      .get("/interest/look_list", {
        params:{
          user_id:JSON.parse(localStorage.getItem('user_info')).id
        }
      })
      .then(response => {
        this.interests = response.data.msg.interests;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.box-title {
  color: #5aa9a4;
  margin-top: 0;
  margin-left: 20px;
  margin-right: 20px;
  text-align: start;
  border-bottom: 3px #5aa9a4 solid;
}

.main-box {
  width: 1100px;
  margin: 16px auto 0;
  padding: 25px 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  min-height: 1000px;
}

.box-body {
  display: flex;
  flex-wrap: wrap;
}

.nothing-tip {
  margin:  15px auto 0;
  text-align: center;
}
</style>
