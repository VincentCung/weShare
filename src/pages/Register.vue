<template>
    <div>
        <el-main class='main-box'>
            <div class='background-crop'>
                <img src="https://img.xiaopiu.com/userImages/img381644e6c6908.jpg" alt="背景图" class='background'>
            </div>

            <el-form status-icon class="register-form" :model='registerForm' :rules="rules" ref='registerForm'>
                <h1 class='register-title'>注册</h1>
                <el-form-item prop='name'>
                    <el-input v-model="registerForm.name" placeholder="请输入用户名">
                        <i slot="prefix" class="el-input__icon el-icon-message"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop='email'>
                    <el-input v-model="registerForm.email" placeholder="请输入邮箱">
                        <i slot="prefix" class="el-input__icon el-icon-message"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input v-model="registerForm.password" type='password' placeholder="请输入密码">
                        <i slot="prefix" class="el-input__icon el-icon-message"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop='checkPass'>
                    <el-input v-model="registerForm.checkPass" type='password' placeholder="请再次输入密码">
                        <i slot="prefix" class="el-input__icon el-icon-message"></i>
                    </el-input>
                </el-form-item>
                <el-button type="primary" class='register-button' @click='register'>注 册</el-button>
            </el-form>
        </el-main>
    </div>
</template>
<script>
export default {
  data() {
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, message: "长度不少于 3 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        checkPass: [{ required: true, validator: checkPass, trigger: "blur" }]
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        checkPass: ""
      }
    };
  },
  methods: {
    register() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          let { name, password, email } = this.registerForm;
          this.$_http
            .post("/user/register", {
              name,
              password,
              email
            })
            .then(respond => {
              this.$refs.registerForm.resetFields();
              this.$router.push({ path: "/square" });
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
<style scoped>
.main-box {
  margin: 15px 25px;
  position: relative;
}
.background {
  width: 100%;
  z-index: -100;
}
.background-crop {
  max-width: 100%;
  height: 0;
  padding-bottom: 700px;
  background-color: #fff; /*背景色*/
  overflow: hidden;
}

.register-title {
  color: #5aa9a4;
}

.register-form {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  width: 400px;
  padding: 0 25px 20px 25px;
  top: 100px;
  right: 10%;
  border-radius: 15px;
}

.register-button {
  width: 80%;
}
.el-form-item {
  margin-bottom: 40px;
}
</style>
