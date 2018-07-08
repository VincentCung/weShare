<template>
  <div>
    <div>
      <div class="main-container">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-menu" type="border-card">
          <el-tab-pane label="我的关注" name="first">
            <div class="follow-list-box">
              <div class='nothing-tip' v-if='!follows.length'>
                <h3>还没关注别人呢..</h3>
              </div>
              <follow-block v-for="user in follows" :key="user.id" :user="user" :avatar-url="user.photo" @cancel="cancelFollow"></follow-block>
            </div>
          </el-tab-pane>
          <el-tab-pane label="个人资料" name="second">
            <el-form class="data-form" :model='detailForm' :rules="detailRules" ref='detailForm' status-icon>
              <el-form-item>
                <img :src='imgUrl' class="user-picture">
                <el-button type="warning" class="user-picture-button" size="small">更换</el-button>
              </el-form-item>
              <el-form-item label="用户名:" prop='userName'>
                <el-input v-model="detailForm.userName" class="input"></el-input>
              </el-form-item>
              <el-form-item label="性别:">
                <el-radio-group v-model="gender">
                  <el-radio :label="0">不显示</el-radio>
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="change-button" @click="modifyDetail">修改</el-button>
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
import FollowBlock from "@/components/FollowBlock";

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
      follows: [],
      isFollow: true,
      activeName: "first",
      gender: 0,
      userId: 0,
      imgUrl: "",
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        checkPassword: ""
      },
      detailForm: {
        userName: ""
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
      },
      detailRules: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    FollowBlock
  },
  created() {
    this.refreshInfo();
    this.getfollowList();
  },
  beforeRouteEnter(to, from, next) {
    next(vue => {
      vue.refreshInfo();
    });
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 1) {
        this.refreshInfo();
      }
    },
    refreshInfo() {
      let user = JSON.parse(localStorage.getItem("user_info"));
      this.gender = user.gender;
      this.detailForm.userName = user.name;
      this.imgUrl = user.photo;
      this.userId = user.id;
    },
    getfollowList() {
      this.$_http
        .get("/message/followeds", {
          params: {
            user_id: this.userId,
            token: localStorage.getItem("loginToken")
          }
        })
        .then(response => {
          let data = response.data.msg;
          this.follows = data.users;
        })
        .catch(error => {
          console.log(error);
        });
    },

    changePassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          let { oldPassword, newPassword } = this.passwordForm;
          this.$_http
            .post("/message/modify_pass", {
              id: this.userId,
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
    },
    modifyDetail() {
      this.$refs.detailForm.validate(valid => {
        if (valid) {
          this.$_http
            .post("/message/modify", {
              id: this.userId,
              token: localStorage.getItem("loginToken"),
              name: this.detailForm.userName,
              gender: this.gender
            })
            .then(respond => {
              let { success } = respond.data.msg;
              if (success == 1) {
                this.$alert("修改成功", "提示", {
                  confirmButtonText: "确定",
                  type: "success"
                });
                let user = JSON.parse(localStorage.getItem("user_info"));
                console.log(user);
                user.gender = this.gender;
                user.name = this.detailForm.userName;
                localStorage.setItem("user_info", JSON.stringify(user));
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    cancelFollow(targetId) {
      this.$confirm("是否取消对该用户的关注?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$_http
            .post("/message/follow", {
              token: localStorage.getItem("loginToken"),
              is_follow: false,
              followedId: targetId,
              followerId: this.userId
            })
            .then(response => {
              if (response.data.msg.success > 0) {
                console.log(this.follows)
                let index = this.follows.findIndex(user => {
                  return user.id == targetId;
                });
                this.follows.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "取消关注成功!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.main-container {
  width: 940px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}
.data-form,
.password-form {
  width: 400px;
  margin: 0 auto;
  min-height: 400px;
}

.input {
  width: 300px;
}

.change-button {
  width: 60%;
}

.user-picture {
  border-radius: 50%;
}
.follow-list-box {
  width: 900px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-height: 400px;
}
</style>
  