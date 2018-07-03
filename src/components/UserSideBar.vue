<template>
    <div>
        <div class="counter-box">
            <div class="counter-inner-wrap">
                <div class="counter-block">
                    <span class='num-span'>{{counter.count_follow}}</span>
                    <span>关注</span>
                </div>
                <div class="counter-block">
                    <span class='num-span'>{{counter.count_fans}}</span>
                    <span>粉丝</span>
                </div>
                <div class="counter-block">
                    <span class='num-span'>{{counter.count_weibo}}</span>
                    <span>微博</span>
                </div>
            </div>
        </div>
        <div class="follow-list-box">
            <div class="box-title">
                <h4 >
                    <router-link to="/" class='box-title-text'>{{followListText}}</router-link>
                </h4>
            </div>
        </div>
        <div class="subscribe-list-box">
        </div>
    </div>
</template>
<style scoped>
.counter-box,.follow-list-box,.subscribe-list-box{
  background-color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
  margin-bottom: 16px;
}

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
    color:#5ba9a4;
}
</style>
    
<script>
export default {
  props: {
    isOthers: {
      type: Boolean,
      default: false
    },
    counter: {
      type: Object,
      required: true
    }
  },
  computed: {
    followListText() {
      return this.isOthers ? "他关注的人" : "关注的人";
    },
    subscribeListText() {
      return this.isOthers ? "他订阅的趣点" : "订阅趣点";
    }
  }
};
</script>

