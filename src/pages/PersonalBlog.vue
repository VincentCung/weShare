<template>
  <div>
    <div class="main-container">
      <div class='header-wrap'>
        <main-header :name="userName" :follow-able="isOthers&&isLogin" @follow="follow" :is-follow="isFollow" :show-loading='followLoading' :image-url='avatarUrl'></main-header>
      </div>
      <div class='body-wrap'>
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="textarea-box" v-if='!isOthers'>
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="今天又有什么新鲜事.." v-model="context" />
              <div class="box-footer">
                <el-select v-model="interests" multiple placeholder="请选择趣点(最多为5个)" :multiple-limit='5' class='box-select'>
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" class='publish-btn' @click="postWeibo">发布</el-button>
              </div>
            </div>
            <!-- TODO:微博转发 -->
            <weibo v-for="weibo in weibos" :delete-able="!isOthers" :content='weibo.content' :key="weibo.id" :name='userName' :avatar-url='avatarUrl' :id='weibo.id' :show-loading="weibo.showLoading" @thumb="thumb" @delete="deleteWeibo" :user-id="blogId"> </weibo>
            <div class='nothing-tip' v-if='!weibos.length'>
              <h3>{{isOthers?'他':'你'}}还没有发过微博呢..</h3>
            </div>
          </el-col>
          <el-col :span="8">
            <user-side-bar :info='result' :is-others="isOthers"></user-side-bar>
          </el-col>
        </el-row>
      </div>

    </div>

  </div>

</template>
<script>
import MainHeader from "@/components/MainHeader";
import Weibo from "@/components/Weibo";
import UserSideBar from "@/components/UserSideBar";

export default {
  data() {
    return {
      userId: 0,
      isLogin: false,
      context: "",
      isFollow: false,
      followLoading: false,
      userName: "",
      avatarUrl: "",
      weibos: [],
      result: {
        counter: {
          count_follow: 0,
          count_fans: 0,
          count_weibo: 0
        },
        follow: [],
        interests: []
      },
      options: [],
      interests: []
    };
  },
  components: {
    MainHeader,
    Weibo,
    UserSideBar
  },
  created() {
    if (!!localStorage.getItem("loginToken")) {
      this.isLogin = true;
      this.userId = JSON.parse(localStorage.getItem("user_info")).id;
    }
    if (this.isOthers && this.isLogin) {
      this.getFollowInfo();
    }
    // let blogId = this.$route.query.userId || this.userId; //当前页面主人的Id
    let params = { targetId: this.blogId };
    if (this.isLogin) {
      params.token = localStorage.getItem("loginToken");
    }
    this.getUserWeibos(params);
    this.getUserInfoList({ userId: this.blogId });
    this.getInterestList();
  },
  beforeRouteUpdate(to, from, next) {
    if (!!localStorage.getItem("loginToken")) {
      this.isLogin = true;
      this.userId = JSON.parse(localStorage.getItem("user_info")).id;
    }
    if (this.isOthers && this.isLogin) {
      this.getFollowInfo();
    }
    // let blogId = this.$route.query.userId || this.userId; //当前页面主人的Id
    let params = { targetId:this.blogId};
    if (this.isLogin) {
      params.token = localStorage.getItem("loginToken");
    }
    this.getUserWeibos(params);
    this.getUserInfoList({ userId: this.blogId });
    this.getInterestList();
    next();
  },
  computed: {
    isOthers() {
      return !!this.$route.query.userId;
    },
    blogId() {
      return Number(this.$route.query.userId || this.userId)
    }
  },
  methods: {
    getFollowInfo() {
      this.$_http
        .get("/message/follow", {
          params: {
            token: localStorage.getItem("loginToken"),
            followedId: this.$route.query.userId,
            followerId: this.userId
          }
        })
        .then(response => {
          this.isFollow = !!response.data.msg.is_follow;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUserWeibos(params) {
      this.$_http
        .get("/weibo/user", {
          params
        })
        .then(response => {
          let data = response.data.msg;
          this.weibos = data.weibos;
          this.weibos.forEach(weibo => {
            weibo.showLoading = false;
            return weibo;
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
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
    getInterestList() {
      this.$_http
        .get("/weibo/interests")
        .then(response => {
          let data = response.data.msg;
          data.interests.forEach(option => {
            option.label = option.name;
            option.value = option.id;
            return option;
          });
          this.options = data.interests;
        })
        .catch(error => {
          console.log(error);
        });
    },
    follow() {
      this.followLoading = true;
      this.$_http
        .post("/message/follow", {
          token: localStorage.getItem("loginToken"),
          is_follow: !this.isFollow,
          followedId: this.$route.query.userId,
          followerId: this.userId
        })
        .then(response => {
          if (response.data.msg.success > 0) {
            this.isFollow = !this.isFollow;
            this.followLoading = false;
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
          is_thumb: !this.weibos[index].content.is_thumb,
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
            this.weibos[index].content.is_thumb = !this.weibos[index].content.is_thumb;
            this.weibos[index].showLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    postWeibo() {
      this.$_http
        .post("/weibo/issue", {
          token: localStorage.getItem("loginToken"),
          context: this.context,
          user_id: this.userId,
          interest_ids: this.interests
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
    },
    deleteWeibo(value) {
      this.$confirm("此操作将永久删除该微博, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$_http
            .post("/weibo/delete", {
              token: localStorage.getItem("loginToken"),
              id: value
            })
            .then(response => {
              if (response.data.msg.success > 0) {
                let index = this.weibos.findIndex(weibo => {
                  return weibo.id == value;
                });
                this.weibos.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!"
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
  width: 920px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}

.body-wrap {
  margin-top: 20px;
}
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

.box-select {
  width: 100%;
  margin-right: 10px;
}

.publish-btn {
  padding: 0 10px 0 10px;
  height: 38px;
  line-height: 29px;
  width: 60px;
  font-size: 16px;
  box-sizing: content-box;
}

.nothing-tip {
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
</style>
