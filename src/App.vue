<template>
  <div id="app">
    <h1>{{message}}</h1>
    <template v-if ="seen">
      <h1>god</h1>
      </template> 
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "Hello World!",
      seen: "seen"
      };
  }
}
</script>

<style>
</style>

