<template>
    <div>
      <div class="main-box">
            <el-tabs type="border-card">
                <el-tab-pane label="我的订阅">
                    <interest-block v-for="item of items" :key="item"></interest-block>
                </el-tab-pane>
            </el-tabs>
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
.main-box {
  width: 1140px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}
</style>
