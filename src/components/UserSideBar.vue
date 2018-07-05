<template>
  <div>
    <div class="counter-box">
      <div class="counter-inner-wrap">
        <div class="counter-block">
          <span class='num-span'>{{info.counter.count_follow}}</span>
          <span>关注</span>
        </div>
        <div class="counter-block">
          <span class='num-span'>{{info.counter.count_fans}}</span>
          <span>粉丝</span>
        </div>
        <div class="counter-block">
          <span class='num-span'>{{info.counter.count_weibo}}</span>
          <span>微博</span>
        </div>
      </div>
    </div>
    <div class="follow-list-box">
      <div class="box-title">
        <h4>
          <!-- TODO:跳转到对应页面 -->
          <!-- TODO:没有到时候显示 -->
          <router-link v-if='!isOthers' to="/" class='box-title-text'>关注的人</router-link>
          <span v-else class='box-title-text'>他关注的人</span>
        </h4>
      </div>
      <div class='box-cards'>
        <router-link :to="'/blogs?userId='+user.id" v-for="user in info.follow" :key='user.id' class="box-card">
          <div class="box-card-img">
            <img :src="user.photo" alt="用户头像" width="50" height="50">
          </div>
          <div class='box-card-name'>
            <div class='box-card-name-text'>{{user.name}}</div>
          </div>
        </router-link>
        <div class="nothing-tip" v-if='!info.follow.length'>
          还没有关注别人呢..
        </div>
      </div>
    </div>
    <div class="subscribe-list-box">
      <div class="box-title">
        <h4>
          <!-- TODO:跳转到对应页面 -->
          <router-link v-if='!isOthers' to="/" class='box-title-text'>订阅趣点</router-link>
          <span v-else class='box-title-text'>他关注的趣点</span>
        </h4>
      </div>
      <div class='box-cards'>
        <router-link :to="'/interest?id='+interest.id" v-for="interest in info.interests" :key='interest.id' class="box-card ">
          <div class="box-card-img">
            <img :src="interest.photo" alt="趣点图片" width="50" height="50">
          </div>
          <div class='box-card-name'>
            <div>{{interest.name}}</div>
          </div>
        </router-link>
        <div class="nothing-tip" v-if='!info.interests.length'>
          还没有订阅趣点呢..
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* ---------------------main---------------------- */
.counter-box,
.follow-list-box,
.subscribe-list-box {
  background-color: #fff;
  font-size: 12px;
  margin-bottom: 16px;
}
/* ---------------------counter---------------------- */
.counter-inner-wrap {
  width: 100%;
  padding: 12px 0;
  display: flex;
  justify-content: space-around;
}

.counter-block {
  display: flex;
  flex-direction: column;
}

.num-span {
  margin: 2px 0 6px;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  display: block;
  line-height: 14px;
}
/* ---------------------list---------------------- */
.box-title {
  position: relative;
  height: 38px;
  padding: 0 16px;
  line-height: 38px;
  text-align: start;
  border-bottom: 1px #2c3e50 solid;
}

.box-title-text {
  text-decoration: none;
  color: #2c3e50;
  font-size: 14px;
  font-weight: 700;
}

.box-title-text:hover {
  color: #5ba9a4;
}

.box-cards {
  padding: 10px 20px 0;
}

.box-card {
  padding-bottom: 10px;
  padding-top: 10px;
  display: flex;
  position: relative;
  font-size: 20px;
  text-decoration: none;
  color: #333;
  font-size: 20px;
  font-weight: 400;
}

.box-card:hover {
  color: #5ba9a4;
}

.box-card::after {
  content: "";
  width: 100%;
  position: absolute;
  bottom: 0;
  border-bottom: 1px #d3d3d3 solid;
}

.box-card:last-child::after {
  display: none;
}

.box-card-img {
  margin-right: 15px;
}

.box-card-img img {
  border-radius: 50%;
}

.box-card-name {
  display: flex;
  align-items: flex-end;
}

.nothing-tip {
  padding-bottom: 10px;
  height: 20px;
  line-height: 20px;
  padding-top: 5px;
  overflow: hidden;
  font-size: 16px;
}
</style>
    
<script>
export default {
  props: {
    isOthers: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      required: true
    }
  }
};
</script>

