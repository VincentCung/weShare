<template>
    <div>
        <el-col :span='20' :offset='2' >
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-menu" type="border-card" >
            <el-tab-pane label="个人资料" name="first" >
                <el-form class="data-form" >
                   <el-form-item>
                        <img src="https://img.xiaopiu.com/userImages/img141644e3b5688.jpg" class="user_picture">
                        <el-button type="warning" class="user_picture_button">更换</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="userName" class="input" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-radio-group v-model="gender">
                          <el-radio :label="1">男</el-radio>
                          <el-radio :label="2">女</el-radio>
                          <el-radio :label="0">不显示</el-radio>
                        </el-radio-group>
                    </el-form-item>          
                    <el-form-item>
                        <el-button type="primary" class="change_button">修改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="second">
              <el-form class="password-form">
                <el-form-item>
                  <el-input placeholder="原密码" v-model="passwordForm.oldPassword" class="input" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="新密码" v-model="passwordForm.newPassword" class="input" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="确认新密码" v-model="passwordForm.newPassword2" class="input" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="change_button">修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="我的关注" name="third">
              
            </el-tab-pane>
        </el-tabs>
        </el-col>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      userName: "",
      gender: '0',
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        newPassword2: ""
      }
    };
  },
  created() {
    this.gender = this.$store.state.user.gender;
    this.userName = this.$store.state.user.name;
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
};
</script>

<style scoped>
.user_picture_button {
  width: 6%;
}
.input {
  width: 20%;
}
.change_button {
  width: 20%;
}
.user_picture {
  border-radius: 1000px;
}
</style>
