<template>
  <div>
    <el-row class='nav-header' type="flex" align="middle" :gutter="10" :style="$route.path=='/'?'position: fixed;left: 0;top: 0;margin: 0;':''">
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
          <el-menu-item index="/user/interest">我的趣点</el-menu-item>
          <el-menu-item index="/user">我的微博</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span='5'>
        <el-button type="text" @click="dialogFormVisible = true">登陆</el-button>
        <span>  |  </span>
        <el-button type="text">注册</el-button>
      </el-col>
    </el-row>
    <el-dialog title="用户登录" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="ruleForm" status-icon :rules="rules" ref='ruleForm'>
        <el-form-item label="用户名/邮箱" :label-width="formLabelWidth" prop="name">
          <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <!-- todo-login -->
          <el-input v-model="ruleForm.password" type='password' auto-complete="off" @keyup.enter.native='login'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- todo-login -->
        <el-button @click="dialogFormVisible = false" class='login-button'>注 册</el-button>
        <el-button type="primary" @click="login" class='login-button'>登 录</el-button>
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
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      formLabelWidth: "100px"
    };
  },
  methods: {
    search(e) {
      console.log(e);
    },
    login(e) {
      let that = this
      let { name, password } = this.ruleForm;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$_http
            .post("/user/login", {
              name,
              password
            })
            .then(function(response) {
              console.log(response)
              if (!response.data.msg.success) {
                that.$alert("密码或用户名错误，请重试", "提示", {
                  confirmButtonText: "确定",
                  type:'error'
                });
              } else {
                that.dialogFormVisible= false 
                console.log(response.data.msg.user)
                console.log(that)
                that.$store.dispatch('login',response.data.msg.user)
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    }
  }
};
</script>

<style >
/*------------------------------navHeader-----------------------------------------------------------*/
.nav-header {
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
</style>


