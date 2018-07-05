<template>
    <div class="main-page">
        <div class="box ">
            <div class="clearfix">
                <interest-block v-for="item of items" :key="item" ></interest-block>
            </div>   
        </div>
    </div>
</template>

<script>
import InterestBlock from "@/components/InterestBlock";

export default {
  data() {
      return {
          items :14
      }
},
  components: {
    InterestBlock
  }
};
</script>

<style scoped>
.box {
    width: 1125px;
    margin: 0 auto;
    margin-top: 16px;
    padding: 25px 0 0 0;
    padding-left: 15px;
    background-color: #fff;
}
</style>
