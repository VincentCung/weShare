<template>
    <div >
        <interest-block v-for="item of items" :key="item" ></interest-block>
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

</style>
