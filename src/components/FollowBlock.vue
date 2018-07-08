<template>
  <div>
    <div class="follow-box">
      <!-- 关注人的头像-->
      <div class="follow-avator">
        <img :src="avatarUrl" alt="头像" class="follow-avator-img">
      </div>
      <!-- 用户名和取关按钮 -->
      <div class="follow-detail">
        <el-button type="text" class="follow-detail-name" @click="redirectToUser">{{user.name+" "+userGender(user.gender)}}</el-button>
        <el-button type="text" class="concelBtn" @click="cancel">取消关注</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.follow-box {
  box-sizing: border-box;
  width: 200px;
  height: 80px;
  border: 1.5px solid #b3dddc;
  background-color: rgb(255, 255, 255);
  text-align: start;
  margin: 0 12.5px 15px;
  border-radius: 5%;
  padding: 10px 15px;
  display: flex;
}

.follow-avator {
  width: 50px;
}

.follow-avator-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.follow-detail {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.follow-detail-name {
  font-weight: bold;
  color: black;
  font-size: 14px;
  text-align: start;
}

.concelBtn {
  border: 2px;
  text-align: start;
}
</style>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    avatarUrl: {
      type: String,
      default: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg"
    }
  },
  methods: {
    redirectToUser() {
      this.$router.push("/blogs?userId=" + this.user.id);
    },
    userGender(gender) {
      if (gender == 1) {
        return "男";
      } else if (gender == 2) {
        return "女";
      } else {
        return "";
      }
    },
    cancel(){
      this.$emit('cancel',this.user.id)
    }
  },
  computed: {
    followText() {
      return this.isFollow ? "取消关注" : "关注";
    },
    followIcon() {
      return this.isFollow ? "el-icon-close" : "el-icon-plus";
    },
    buttonType() {
      return this.isFollow ? "" : "primary";
    }
  }
};
</script>
