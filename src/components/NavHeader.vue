<template>
  <div>
    <el-row class='nav-header' type="flex" align="middle" :gutter="10">
      <el-col :span='2' :offset="2">
        <img src="../assets/logo.png" alt="test" height="50">
      </el-col>
      <el-col :span='5'>
        <el-input suffix-icon="el-icon-search" :placeholder='"大家都在搜:"+hotContent' clearable @keypress.enter.native='search' class='search-bar'></el-input>
      </el-col>
      <el-col :span='12'>
        <el-menu :default-active="$route.path" class="nav-header-menu" mode="horizontal" :router='true' background-color="inherit">
          <el-menu-item index="/">发现</el-menu-item>
          <el-menu-item index="/3">趣点广场</el-menu-item>
          <el-menu-item index="/4">我的趣点</el-menu-item>
          <el-menu-item index="/5">我的微博</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span='5'>
        <el-button type="text" class='header-button' @click="dialogFormVisible = true">登陆</el-button>
        <el-button type="text" class='header-button'>注册</el-button>
      </el-col>
    </el-row>
    <el-dialog title="用户登录" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名/邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <!-- todo-login -->
          <el-input v-model="form.password" auto-complete="off" @keyup.enter.native='search'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- todo-login -->
        <el-button type='danger' @click="dialogFormVisible = false" plain>取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" plain>确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      hotContent: "世界杯",
      activeIndex: "/",
      dialogFormVisible: false,
      form: {
        name: "",
        password:"",
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    search(e) {
      console.log(e);
    }
  }
};
</script>

<style >
.nav-header {
  border-bottom: solid 1px #e6e6e6;
  background: rgba(255, 255, 255, 0.8);
}

.nav-header-menu {
  border: none;
}

.header-button {
  color: #5aa9a4;
}

.search-bar {
  border-radius: 50%;
}
</style>


