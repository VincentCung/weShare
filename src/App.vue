<template>
  <div id="app">
    <nav-header id='page-main'></nav-header>
    <keep-alive>
      <router-view class="router-view-wrap" id="page-main" />
    </keep-alive>
  </div>
</template>

<script>
import NavHeader from "./components/NavHeader";

export default {
  name: "App",
  components: {
    NavHeader
  },
  methods: {}
};
</script>

<style>
body,
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router-view-wrap {
  padding-top: 65px;
  background-color: #b3dddc;
}

.clearfix::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>

