<template>
  <div class="main">
    <div class="main-box">
      <weibo :content='weibo.content' :id="weibo.id" style="box-shadow:none" @comment='refreshComment' :name='weibo.user.name' :avatar-url='weibo.user.photo' :showLoading="weibo.showLoading" @thumb="thumb" :user-id="weibo.user.id" />
      <div class="textarea-box" v-if="isLogin">
        <h4 v-show='replyTo.name'>回复{{replyTo.name}}:</h4>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="写下你的评论（上限200字）" v-model="context" maxlength="200" ref="comment">
        </el-input>
        <div class="box-footer">
          <el-button type="primary" class='publish-btn' @click="postComment">发布</el-button>
        </div>
      </div>
      <div class="comment-box" v-for="comment in comments" :key="comment.id">
        <div class="comment-avatar">
          <img :src="comment.user.photo" alt="" width="30" height="30">
        </div>
        <div class="comment-detail">
          <div class="comment-user">
            <router-link :to="'/blogs?userId='+comment.user.id" class="comment-name">
              <div>{{comment.user.name}}</div>
            </router-link>
            <span v-if="comment.parent" style="margin: 0 15px">@</span>
            <router-link v-if="comment.parent" :to="'/blogs?userId='+comment.parent.id" class="comment-name">
              <div>{{comment.parent.name}}</div>
            </router-link>
          </div>
          <div class="comment-create-time">{{comment.create_time}}</div>
          <div class="comment-content">{{comment.context}}</div>
          <div class="box-footer">
            <el-button type='text' v-if="comment.user.id==userId" @click="deleteComment(comment.id)">删除</el-button>
            <el-button type='text' v-else @click="replyComment(comment.user)">回复</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Weibo from "@/components/Weibo";
export default {
  components: {
    Weibo
  },
  data() {
    return {
      userId: 0,
      isLogin: false,
      replyTo: {
        id: 0,
        name: ""
      },
      weibo: {
        id: 1,
        content: {
          create_time: '@date("yyyy年MM月dd日") @time("HH:mm")',
          context: "@string(7, 300)",
          read_count: 1,
          comment_count: 1,
          transmit_count: 1,
          thumb_count: 1,
          photos: []
        },
        user: {
          id: 1,
          photo: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg",
          name: "test"
        }
      },
      context: "",
      comments: []
    };
  },
  created() {
    if (localStorage.getItem("loginToken")) {
      this.isLogin = true;
      this.userId = JSON.parse(localStorage.getItem("user_info")).id;
    }
    this.getBlogDetail();
  },
  methods: {
    userGender(gender) {
      if (gender == 1) {
        return "男";
      } else if (gender == 2) {
        return "女";
      } else {
        return "";
      }
    },
    refreshComment() {
      this.replyTo = {
        name: "",
        id: 0
      };
    },
    postComment() {
      if (this.context) {
        let body = {
          token: localStorage.getItem("loginToken"),
          context: this.context,
          user_id: this.userId,
          weibo_id: this.weibo.id
        };
        if (this.replyTo.name) {
          body.parent_id = this.replyTo.id;
        }
        this.$_http
          .post("/weibo/comment", body)
          .then(response => {
            if (response.data.msg.success > 0) {
              let comment = {
                context: this.context,
                id: 999,
                user: {
                  id: this.userId,
                  photo:
                    "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg",
                  name: "123"
                },
                create_time: "now"
              };
              if (this.replyTo.name) {
                comment.parent = {};
                comment.parent.id = this.replyTo.id;
                comment.parent.name = this.replyTo.name;
              }
              this.comments.splice(0, 0, comment);
              this.context = "";
              this.refreshComment();
              //this.$router.go(this.$route.path);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$message({
          message: "评论内容不能为空！",
          type: "warning"
        });
      }
    },
    replyComment(target) {
      this.replyTo = {
        name: target.name,
        id: target.id
      };
      this.$refs.comment.focus();
    },
    deleteComment(targetId) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$_http
            .post("/weibo/del_comment", {
              token: localStorage.getItem("loginToken"),
              id: targetId
            })
            .then(response => {
              if (response.data.msg.success > 0) {
                let index = this.comments.findIndex(comment => {
                  return comment.id == targetId;
                });
                this.comments.splice(index, 1);
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
    },
    getBlogDetail() {
      let weibo_id = this.$route.params.id;
      let params = { weibo_id };
      if (this.isLogin) {
        params.token = localStorage.getItem("loginToken");
      }
      this.$_http
        .get("/weibo/detail", {
          params
        })
        .then(response => {
          let data = response.data.msg;
          this.weibo = data.weibo;
          this.weibo.showLoading = false;
          this.comments = data.comments;
          console.log(this.comments);
        })
        .catch(error => {
          console.log(error);
        });
    },
    thumb(value) {
      this.weibo.showLoading = true;
      this.$_http
        .post("/weibo/thumb", {
          token: localStorage.getItem("loginToken"),
          is_thumb: !this.weibo.content.is_thumb,
          weibo_id: this.weibo.id,
          user_id: this.userId
        })
        .then(response => {
          if (response.data.msg.success > 0) {
            if (this.weibo.content.is_thumb) {
              this.weibo.content.thumb_count--;
            } else {
              this.weibo.content.thumb_count++;
            }
            this.weibo.content.is_thumb = !this.weibo.content.is_thumb;
            this.weibo.showLoading = false;
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
.main-box {
  width: 600px;
  margin: 16px auto 0;
  padding: 25px 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  min-height: 1000px;
}

/*-----------------------textarea-box--------------------*/
.textarea-box {
  margin: 0 0 10px 0;
  border-radius: 2px;
  padding: 15px 10px 10px;
  border-bottom: 1px #d3d3d3 solid;
  border-top: 1px #d3d3d3 solid;
  text-align: start;
}
.textarea-box h4 {
  margin-top: 0;
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

/*-----------------------comment-box--------------------*/
.comment-box {
  text-align: start;
  display: flex;
  padding: 5px 0 7px;
  font-size: 12px;
  border-bottom: 1px #d3d3d3 solid;
}

.comment-detail {
  margin-left: 10px;
  width: 90%;
}

.comment-name {
  font-weight: 600;
  line-height: 23px;
  padding-bottom: 2px;
}

.comment-name :hover {
  color: #5ba9a4;
}

.comment-create-time {
  color: #b3dddc;
}
.comment-content {
  margin-top: 5px;
  word-wrap: break-word;
}

.comment-user {
  display: flex;
}
</style>
