<template>
  <div class="main">
    <div class="main-container">
      <el-row :gutter="20">
        <el-col :span="isLogin?16:24">
          <div class="header-box">
            <h1>{{interest.name}}</h1>
            <el-button v-if="isLogin" :icon="subscribeIcon" class='box-button' :type="subscribeType" @click='subscribe' size="small" :loading="showLoading">{{subscribeText}}</el-button>
          </div>
          <div class="textarea-box" v-if="isLogin">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="今天又有什么新鲜事.." v-model="context">
            </el-input>
            <div class="box-footer">
              <el-button type="primary" class='publish-btn' @click="postWeibo">发布</el-button>
            </div>
          </div>
          <weibo v-for="weibo in weibos" :content='weibo.content' :key="weibo.id" :name='weibo.user.name' :avatar-url='weibo.user.photo' :id="weibo.id" :user-id="weibo.user.id" @thumb="thumb"> </weibo>
          <div class='nothing-tip' v-if='!weibos.length'>
            <h3>这个趣点还没有发过微博呢..</h3>
          </div>
        </el-col>
        <el-col :span="8" v-if="isLogin">
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
import Weibo from "@/components/Weibo";

export default {
  data() {
    //TODO:动态信息
    return {
      isLogin: false,
      userId: 0,
      isSubscribe: true,
      userName: "",
      context: "",
      avatarUrl: "",
      showLoading: false,
      interest: {
        id: 0,
        name: ""
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
    UserSideBar,
    Weibo
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
  created() {
    let params = { interest_id: this.$route.query.id };
    if (localStorage.getItem("loginToken")) {
      this.isLogin = true;
      this.userId = JSON.parse(localStorage.getItem("user_info")).id;
      params.token = localStorage.getItem("loginToken");
      this.getUserInfoList({ user_id: this.userId });
    }
    this.getInterestDetail(params);
  },

  beforeRouteUpdate(to, from, next) {
    let params = { interest_id: this.$route.query.id };
    if (localStorage.getItem("loginToken")) {
      this.isLogin = true;
      this.userId = JSON.parse(localStorage.getItem("user_info")).id;
      params.token = localStorage.getItem("loginToken");
      this.getUserInfoList({ user_id: this.userId });
    }
    this.getInterestDetail(params);
    next();
  },
  methods: {
    getUserInfoList(params) {
      this.$_http
        .get("/message/user", {
          params
        })
        .then(response => {
          let data = response.data.msg;
          let { user, counter, follow, interests } = data;

          this.result = { counter, follow, interests };
          this.userName = user.name;
          this.avatarUrl = user.photo;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getInterestDetail(params) {
      this.$_http
        .get("/weibo/look_interest", {
          params
        })
        .then(response => {
          this.weibos = response.data.msg.weibos;
          if (this.isLogin) {
            this.isSubscribe = response.data.msg.is_subs;
            this.interest = response.data.msg.interest;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    thumb(value) {
      let index = this.weibos.findIndex(weibo => {
        return weibo.id == value;
      });
      this.weibos[index].showLoading = true;
      this.$_http
        .post("/weibo/thumb", {
          token: localStorage.getItem("loginToken"),
          is_thumb: this.weibos[index].content.is_thumb ? 0 : 1,
          weibo_id: this.weibos[index].id,
          user_id: this.userId
        })
        .then(response => {
          if (response.data.msg.success > 0) {
            if (this.weibos[index].content.is_thumb) {
              this.weibos[index].content.thumb_count--;
            } else {
              this.weibos[index].content.thumb_count++;
            }
            (this.weibos[index].content.is_thumb = this.weibos[index].content
              .is_thumb
              ? 0
              : 1),
              (this.weibos[index].showLoading = false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    subscribe() {
      this.showLoading = true;
      this.$_http
        .post("/interest/add", {
          token: localStorage.getItem("loginToken"),
          is_sub: this.isSubscribe ? 0 : 1,
          interest_id: this.$route.query.id,
          user_id: this.userId
        })
        .then(response => {
          if (response.data.msg.success > 0) {
            (this.isSubscribe = this.isSubscribe ? 0 : 1),
              (this.showLoading = false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    postWeibo() {
      let is_banned = JSON.parse(localStorage.getItem("user_info")).is_banned;
      if (this.context && !is_banned) {
        this.$_http
          .post("/weibo/issue", {
            token: localStorage.getItem("loginToken"),
            context: this.context,
            user_id: this.userId,
            interest_ids: [this.$route.query.id]
          })
          .then(response => {
            if (response.data.msg.success > 0) {
              this.context = "";
              this.$router.go(this.$route.path);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (is_banned) {
        this.$message({
          message: "您被管理员禁言了,请跟管理员联系恢复",
          type: "warning"
        });
      } else {
        this.$message({
          message: "微博内容不能为空",
          type: "warning"
        });
      }
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
