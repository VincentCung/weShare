<template>
  <div>
    <div class="follow-box">
      <!-- 关注人的头像-->
      <div class="follow-avator">
        <img :src="avatarUrl" alt="头像" class="follow-avator-img">
      </div>
      <!-- 用户名和取关按钮 -->
      <div class="follow-detail">
        <el-button type="text" class="follow-detail-name">{{name}}</el-button>
        <el-button type="text" class="concelBtn">取消关注</el-button>
        <!--  <div class="concelBtn-wrap">
          <el-button class="concelBtn" :type="buttonType" @click='follow'>{{followText}}</el-button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
  .follow-box {
    float: left;
    width: 200px;
    height: 80px;
    border: 1.5px solid #b3dddc;
    background-color: rgb(255, 255, 255);
    position: relative;
    text-align: start;
    margin-bottom: 15px;
    margin-right: 19px;
    border-radius: 5%;
  }

  .follow-avator {
    position: absolute;
    left: 10px;
    top: 15px;
    width: 50px;
  }

  .follow-avator-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .follow-detail {
    position: absolute;
    top: 7px;
    margin-left: 70px;
  }

  .follow-detail-name {
    height: 30px;
    font-weight: bold;
    color: black;
    font-size: 14px;
  }

  .concelBtn-wrap {
    border: 0;
  }

  .concelBtn {
    border: 2px;
  }

</style>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: "用户名用户名"
      },
      avatarUrl: {
        type: String,
        default: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg"
      }/* ,
      isFollow: {
        type: Boolean,
        default: true
      }, */
    },
    methods: {
      follow() {
        this.$emit('follow')

      }
    },
    computed: {
      followText() {
        return this.isFollow ? '取消关注' : '关注'
      },
      followIcon() {
        return this.isFollow ? 'el-icon-close' : 'el-icon-plus'
      },
      buttonType() {
        return this.isFollow ? '' : 'primary'
      }
    }

  };

</script>
