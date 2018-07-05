<template>
  <div>
    <div class="main-container">

      <el-row :gutter="20">
        <el-col :span="16">
          <div class="textarea-box">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="今天又有什么新鲜事.." v-model="context">
            </el-input>
            <div class="box-footer">
              <el-button type="primary" class='publish-btn'>发布</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="info-photo-box">
              <div class="info-photo-wrap">
                <img :src="avatarUrl" alt="头像" class="info-photo" width="60" height="60">
              </div>
            </div>
            <div class="info-name-wrap">
              <span class="info-name">{{userName}}</span>
            </div>
          </div>
          <user-side-bar :info='result' ></user-side-bar>
        </el-col>
      </el-row>
    </div>
  </div>

</template>
<script>
import UserSideBar from "@/components/UserSideBar";

export default {
  data() {
    return {
      userName: "用户名",
      context:'',
      avatarUrl: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg",
      result: {
        counter:{
          count_follow:0,
          count_fans:0,
          count_weibo:0
        },
        follow:[],
        interests:[]
      }
    };
  },
    components: {
    UserSideBar
  },
};
</script>
<style>
.main-container {
  width: 920px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}
/*---------------------------textarea-box-----------------*/
.textarea-box {
  background-color: #fff;
  margin: 0 0 10px 0;
  border-radius: 2px;
  padding: 15px 10px 10px;
}

.box-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.publish-btn {
  padding: 0 10px 0 10px;
  height: 28px;
  line-height: 29px;
  width: 60px;
  font-size: 14px;
  box-sizing: content-box;
}

/*--------------------info-box----------------------------*/

.info-box {
}

.info-photo-box {
  background-color: #5ba9a4;
  height: 75px;
  position: relative;
}
.info-photo-wrap {
  width: 60px;
  height: 60px;
  padding: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  margin-left: -30px;
  position: absolute;
  left: 50%;
  bottom: -20px;
}

.info-photo {
  border-radius: 50%;
}

.info-name-wrap {
  background-color: #fff;
  padding: 16px 16px 9px 16px;
}

.info-name {
  height: 24px;
  line-height: 24px;
  padding-top: 5px;
  max-width: 114px;
  display: inline-block;
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
