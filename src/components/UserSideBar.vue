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
        </div>
        <div class="subscribe-list-box">
        </div>
    </div>
</template>
<style scoped>
.counter-box {
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
</style>
    
<script>
export default {
  props: {
    counter: {
      type: Object,
      required: true,
    }
  }
};
</script>

