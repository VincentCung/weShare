<template>
  <div>
    <div>
      <div class="main-container">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-menu" type="border-card">
          <el-tab-pane label="我的关注" name="first">
            <!-- TODO:关注列表 -->
            <follow-blog v-for="follow in follows" :key="follow.id" :name="follow.name"></follow-blog>
          </el-tab-pane>
          <el-tab-pane label="个人资料" name="second">
            <el-form class="data-form">
              <el-form-item>
                <img :src='imgUrl' class="user-picture">
                <el-button type="warning" class="user-picture-button" size="small">更换</el-button>
              </el-form-item>
              <el-form-item>
                <el-input v-model="userName" class="input"></el-input>
              </el-form-item>
              <el-form-item>
                <el-radio-group v-model="gender">
                  <el-radio :label="0">不显示</el-radio>
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>

                <el-button type="primary" class="change-button">修改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="third">
            <el-form class="password-form" :model='passwordForm' :rules="rules" ref='passwordForm' status-icon>
              <el-form-item prop='oldPassword'>
                <el-input placeholder="请输入原密码" v-model="passwordForm.oldPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item prop='newPassword'>
                <el-input placeholder="请输入新密码" v-model="passwordForm.newPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item prop='checkPassword'>
                <el-input placeholder="请再次确认新密码" v-model="passwordForm.checkPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="change-button" @click="changePassword">修改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </div>

    </div>
  </div>
</template>

<script>
import FollowBlog from "@/components/FollowBlog";

export default {
  data() {
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      /**我的关注 */
      follows: [],
      /**我的关注 */
      isFollow: true,
      activeName: "first",
      userName: "",
      gender: 0,
      imgUrl: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg",
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        checkPassword: ""
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "原密码不能为空",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            required: true,
            validator: checkPass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    FollowBlog
  },
  created() {
    this.refreshInfo();
  },
  beforeRouteEnter(to, from, next) {
    next(vue => {
      vue.refreshInfo();
    });
  },
  methods: {
    // TODO:修改资料
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.refreshInfo();
      }
    },
    refreshInfo() {
      this.gender = this.$store.state.user.gender;
      this.userName = this.$store.state.user.name;
      this.imgUrl = this.$store.state.user.photo;
    },
    changePassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          let { oldPassword, newPassword } = this.passwordForm;
          this.$_http
            .post("/message/modify_pass", {
              id: this.$store.state.user.id,
              token: localStorage.getItem("loginToken"),
              old_password: oldPassword,
              new_password: newPassword
            })
            .then(respond => {
              console.log(respond);
              let { success } = respond.data.msg;
              if (success == 1) {
                this.$alert("修改成功", "提示", {
                  confirmButtonText: "确定",
                  type: "success"
                });
                this.$refs.passwordForm.resetFields();
              } else if (success == 0) {
                this.$alert("旧密码错误，请重试", "提示", {
                  confirmButtonText: "确定",
                  type: "error"
                });
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

<style scoped>
.main-container {
  width: 920px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}

.password-form {
  width: 400px;
  margin: 0 auto;
}

.input {
  width: 300px;
}

.change-button {
  width: 30%;
}

.user-picture {
  border-radius: 50%;
}
</style>
  