<template>
  <div>
    <el-row class='nav-header' type="flex" align="middle" :gutter="20" >
      <el-col :span='2' :offset="2">
        <router-link to='/'>
          <img src="../assets/logo.png" alt="test" width="80">
        </router-link>
      </el-col>
      <el-col :span='5'>
        <el-input :placeholder='"大家都在搜:"+hotContent' clearable @keypress.enter.native='search' class='search-bar'>
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span='12'>
        <el-menu :default-active="$route.path" class="nav-header-menu" mode="horizontal" :router='true' background-color="inherit">
          <el-menu-item index="/square">广场</el-menu-item>
          <el-menu-item index="/more">发现趣点</el-menu-item>
          <el-menu-item index="/user/interest" v-if='$store.state.is_login'>我的趣点</el-menu-item>
          <el-menu-item index="/blogs" v-if='$store.state.is_login'>我的微博</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span='2' v-if='!$store.state.is_login'>
        <el-button type="text" @click="dialogFormVisible = true">登 陆</el-button>
      </el-col>
      <el-col :span='2' v-if='$store.state.is_login'>
        <i class="el-icon-edit"></i>
        <el-button type="text" @click='redirectMyDetail'>{{$store.state.user.name}}</el-button>
      </el-col>
      <span> | </span>
      <el-col :span='2' v-if='!$store.state.is_login'>
        <el-button type="text" @click="register">注 册</el-button>
      </el-col>
      <el-col :span='2' v-if='$store.state.is_login'>
        <i class="el-icon-edit"></i>
        <el-button type="text" @click='logout'>注 销</el-button>
      </el-col>
    </el-row>
    <el-dialog title="用户登录" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="loginForm" status-icon :rules="rules" ref='loginForm'>
        <el-form-item prop="name">
          <el-input v-model="loginForm.name" placeholder='请输入用户名或邮箱'>
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type='password' auto-complete="off" @keyup.enter.native='login' placeholder='请输入密码'>
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="register" class='login-button'>注 册</el-button>
        <el-button type="primary" @click="login" class='login-button' :loading='showLoading'>登 录</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      hotContent: "世界杯",
      activeIndex: "/",
      dialogFormVisible: false,
      showLoading: false,
      loginForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    search(e) {
      console.log(e);
    },
    login(e) {
      let that = this;
      let { name, password } = this.loginForm;
      this.showLoading = true;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$_http
            .post("/user/login", {
              name,
              password
            })
            .then(response => {
              if (!response.data.msg.success) {
                that.$alert("密码或用户名错误，请重试", "提示", {
                  confirmButtonText: "确定",
                  type: "error"
                });
              } else {
                that.$refs.loginForm.resetFields();
                that.showLoading = false;
                that.dialogFormVisible = false;
                that.$store.dispatch("login", response.data.msg);
                this.$router.go(0);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    logout() {
      this.$store.dispatch("logout");
      this.$message({
        message: "注销成功",
        type: "success"
      });
      this.$router.push({ path: "/x" });
    },
    register() {
      this.dialogFormVisible = false;
      this.$router.push({ path: "/register" });
    },
    redirectMyDetail() {
      this.$router.push({ path: "/user/deta il" });
    }
  }
};
</script>

<style >
/*------------------------------navHeader-----------------------------------------------------------*/
.nav-header {
  z-index: 10000;
  position: fixed;
  left: 0;
  top: 0;
  margin: 0 !important;
  width: 100%;
  border-bottom: solid 1px #e6e6e6;
  background: rgba(255, 255, 255, 0.75);
}

.nav-header-menu {
  border: none;
}
.el-menu--horizontal {
  border: none;
}

.search-bar {
  border-radius: 50%;
}
/*------------------------------dialog-----------------------------------------------------------*/
.dialog-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100px;
}

.login-button {
  width: 100%;
}

.el-dialog__body {
  padding-bottom: 0;
}

.el-button + .el-button {
  margin-left: 0;
}
.el-dialog__footer {
  padding-top: 0;
}

.el-form--label-top .el-form-item__label {
  padding: 0;
}
</style>


