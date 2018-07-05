<template>
  <div>
    <div class="main-box ">
      <div class="box-title">
        <h2>发现趣点</h2>
      </div>
      <div class="box-body">
        <interest-block v-for="item of items" :key="item"></interest-block>
      </div>
    </div>
  </div>
</template>

<script>
import InterestBlock from "@/components/InterestBlock";

export default {
  data() {
    return {
      items: 14
    };
  },
  components: {
    InterestBlock
  }
};
</script>

<style scoped>
.box-title {
  color: #5aa9a4;
  margin-top:0;
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
}

.box-body {
  display: flex;
  flex-wrap: wrap;
}

</style>
