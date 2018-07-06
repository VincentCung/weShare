<template>
  <div>
    <div class="main-container">
      <div class='header-wrap'>
        <main-header :name="userName" :follow-able="isOthers&&$store.state.is_login" @follow="follow" :is-follow="isFollow" :show-loading='followLoading' :image-url='avatarUrl'></main-header>
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
                <el-button type="primary" class='publish-btn'>发布</el-button>
              </div>
            </div>
            <!-- TODO:微博转发 -->
            <weibo v-for="weibo in weibos" :delete-able="!isOthers" :content='weibo.content' :key="weibo.id" :name='userName' :avatar-url='avatarUrl' :id='weibo.id'> </weibo>
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "黄金糕"
        },
        {
          value: "选项5",
          label: "双皮奶"
        },
        {
          value: "选项6 ",
          label: "蚵仔煎"
        }
      ],
      interests: []
    };
  },
  components: {
    MainHeader,
    Weibo,
    UserSideBar
  },
  created() {
    if (this.isOthers && this.$store.state.is_login) {
      this.getFollowInfo();
    }
    let blogId = this.$route.query.userId || this.$store.state.user.id; //当前页面主人的Id
    let params = { targetId: blogId };
    if (this.$store.state.is_login) {
      params.token = localStorage.getItem("loginToken");
    }
    this.getUserWeibos(params);
    this.getUserInfoList({ userId: blogId });
  },
  beforeRouteUpdate(to, from, next) {
    if (this.isOthers && this.$store.state.is_login) {
      this.getFollowInfo();
    }
    let blogId = this.$route.query.userId || this.$store.state.user.id; //当前页面主人的Id
    let params = { targetId: blogId };
    if (this.$store.state.is_login) {
      params.token = localStorage.getItem("loginToken");
    }
    this.getUserWeibos(params);
    this.getUserInfoList({ userId: blogId });
    next();
    //TODO: 请求其他信息
  },
  computed: {
    isOthers() {
      return !!this.$route.query.userId;
    }
  },
  methods: {
    getFollowInfo() {
      this.$_http
        .get("/message/follow", {
          params: {
            token: localStorage.getItem("loginToken"),
            followedId: this.$route.query.userId,
            followerId: this.$store.state.user.id
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
    follow() {
      this.followLoading = true;
      this.$_http
        .post("/message/follow", {
          token: localStorage.getItem("loginToken"),
          is_follow: !this.isFollow,
          followedId: this.$route.query.userId,
          followerId: this.$store.state.user.id
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
