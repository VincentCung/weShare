<template>
  <div class="main">
    <div class="main-container">
      <el-row :gutter="20">
        <el-col :span="$store.state.is_login?16:24">
          <div class="header-box">
            <h1>{{interest.name}}</h1>
            <el-button v-if="$store.state.is_login" :icon="subscribeIcon" class='box-button' :type="subscribeType" @click='subscribe' size="small">{{subscribeText}}</el-button>
          </div>
          <div class="textarea-box" v-if="$store.state.is_login">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="今天又有什么新鲜事.." v-model="context">
            </el-input>
            <div class="box-footer">
              <el-button type="primary" class='publish-btn'>发布</el-button>
            </div>
          </div>
          <weibo v-for="weibo in weibos" :delete-able="!isOthers" :content='weibo.content' :key="weibo.id" :name='userName' :avatar-url='avatarUrl'> </weibo>
          <div class='nothing-tip' v-if='!weibos.length'>
            <h3>这个趣点还没有发过微博呢..</h3>
          </div>
        </el-col>
        <el-col :span="8" v-if="$store.state.is_login">
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
          <user-side-bar :info='result'></user-side-bar>
        </el-col>
      </el-row>
    </div>
  </div>

</template>
<script>
import UserSideBar from "@/components/UserSideBar";

export default {
  data() {
    //TODO:动态信息
    return {
      isSubscribe: true,
      userName: "",
      context: "",
      avatarUrl: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg",
      interest: {
        id: 1,
        name: "去你妈的点"
      },
      result: {
        counter: {
          count_follow: 0,
          count_fans: 0,
          count_weibo: 0
        },
        follow: [],
        interests: []
      },
      weibos: []
    };
  },
  components: {
    UserSideBar
  },
  computed: {
    subscribeText() {
      return this.isSubscribe ? "取消订阅" : "订阅";
    },
    subscribeIcon() {
      return this.isSubscribe ? "el-icon-close" : "el-icon-plus";
    },
    subscribeType() {
      return this.isSubscribe ? "" : "primary";
    }
  },
  methods: {
    subscribe() {}
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

.header-box {
  display: flex;
  align-items: flex-end;
  margin: 20px 0;
}

.header-box h1 {
  margin: 0;
}

.box-button {
  margin-left: 30px;
  padding: 0 10px;
  height: 28px;
  line-height: 29px;
  font-size: 14px;
  box-sizing: content-box;
}
/*---------------------------textarea-box-----------------*/
.textarea-box {
  background-color: #fff;
  margin: 0 0 10px 0;
  border-radius: 2px;
  padding: 15px 10px 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.box-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.publish-btn {
  padding: 0 10px;
  height: 28px;
  line-height: 29px;
  width: 60px;
  font-size: 14px;
  box-sizing: content-box;
}

/*--------------------info-box----------------------------*/

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
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
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

.nothing-tip {
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
</style>
