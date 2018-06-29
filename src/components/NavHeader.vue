<template>
  <div>
    <el-row class='nav-header' type="flex" align="middle"  :gutter="10">
      <el-col :span='2' :offset="2">
        <img src="../assets/logo.png" alt="test" height="50">
      </el-col>
      <el-col :span='5' >
        <el-input suffix-icon="el-icon-search" :placeholder='"大家都在搜:"+hotContent' clearable @keypress.enter.native='search' class='search-bar'></el-input>
      </el-col>
      <el-col :span='6' :offset='4'>
        <el-menu :default-active="$route.path" class="nav-header-menu" mode="horizontal" :router='true' active-text-color='#5aa9a4' background-color="inherit">
          <el-menu-item index="/">发现</el-menu-item>
          <el-menu-item index="/3">趣点广场</el-menu-item>
          <el-menu-item index="/4">我的趣点</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span='5'>
        <el-button type="text" class='header-button'>登陆</el-button>
        <el-button type="text" class='header-button'>注册</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotContent: "世界杯",
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods:{
    search(e) {
      console.log(e)
    }
  }
};
</script>

<style >
  .nav-header {
    border-bottom:solid 1px #e6e6e6;
    background: rgba(255,255,255,0.8)
  }

  .nav-header-menu {
    border:none;
  }


  .header-button {
    color:#5aa9a4;
  }

  .search-bar {
    border-radius: 50%;
  }
</style>


