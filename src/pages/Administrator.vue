<template>
  <div class="main">
    <div class="menu-body">
      <el-tabs v-model="activeName" type="border-card" :loading="showLoading">
        <el-tab-pane label="用户管理" name="first">
          <div class="search-bar-box">
            <el-input placeholder="输入用户名/邮箱/用户ID" clearable @keypress.enter.native='searchUser' v-model="userSearchContext">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-table :data="userData" stripe align="left" :row-class-name="tableRowClassName">
            <el-table-column label="用户ID" prop="id"></el-table-column>
            <el-table-column label="用户名" prop="name"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="评论数" prop="comment_count"></el-table-column>
            <el-table-column label="微博数" prop="weibo_count"></el-table-column>
            <el-table-column label="粉丝数" prop="fans_count"></el-table-column>
            <el-table-column label="被点赞数" prop="thumb_count"></el-table-column>
            <el-table-column label="禁言" prop="is_banned">
              <template slot-scope="scope">
                <el-button type="danger" v-if='!userData[scope.$index].is_banned' @click='userManage(userData[scope.$index])'>禁言</el-button>
                <el-button type="success" v-else @click='userManage(userData[scope.$index])'>取消</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :page-size="10" layout="prev, pager, next" :total="userNum" @current-change="tabUserPage">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="微博管理" name="second">
          <div class="search-bar-box">
            <el-input placeholder="输入微博内容/用户名" clearable @keypress.enter.native='searchWeibo' v-model="weiboSearchContext">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-table :data="weiboData" :row-class-name="tableRowClassName" align="left">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="context-box">
                  <span>微博内容：{{ props.row.context }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="用户名" prop="userName">
            </el-table-column>
            <el-table-column label="阅读数" prop="read_count">
            </el-table-column>
            <el-table-column label="点赞数" prop="thumb_count">
            </el-table-column>
            <el-table-column label="评论数" prop="comment_count">
            </el-table-column>
            <el-table-column label="转发数" prop="transmit_count">
            </el-table-column>
            <el-table-column label="删除">
              <template slot-scope="scope">
                <el-button type="danger" @click="deleteSomething(weiboData[scope.$index].id,'weibo')">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :page-size="10" layout="prev, pager, next" :total="weiboNum" @current-change="tabWeiboPage">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="评论管理" name="third">
          <div class="search-bar-box">
            <el-input placeholder="输入评论内容/用户名" clearable @keypress.enter.native='searchComment' v-model="commentSearchContext">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="comment-box" v-for="comment in commentData" :key="comment.id">
            <div class="comment-avatar">
              <img :src="comment.user.photo" alt="" width="30" height="30">
            </div>
            <div class="comment-detail">
              <router-link :to="'/blogs?userId='+comment.user.id" class="comment-name">
                <div>{{comment.user.name}}:</div>
              </router-link>
              <div class="comment-create-time">{{comment.create_time}}</div>
              <div class="comment-content">{{comment.context}}</div>
              <div class="box-footer">
                <el-button type='danger' @click="deleteSomething(comment.id,'comment')">删除</el-button>
              </div>
            </div>
          </div>
          <el-pagination :page-size="10" layout="prev, pager, next" :total="commentNum" @current-change="tabCommentsPage">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="趣点管理" name="forth">
          <div class="search-bar-box">
            <el-button type="success" style="margin-right:20px" @click="dialogFormVisible = true">创建趣点</el-button>
            <el-dialog title="创建趣点" :visible.sync="dialogFormVisible" width="25%">
              <el-form :model="interestForm" status-icon :rules="rules" ref='interestCreateForm'>
                <el-form-item prop="name">
                  <el-input v-model="interestForm.name" placeholder='请输入趣点名'>
                    <i slot="prefix" class="el-input__icon el-icon-message"></i>
                  </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createInterest" class='login-button' :loading="dialogLoading">创 建</el-button>
              </div>
            </el-dialog>
            <el-input placeholder="输入趣点名" clearable @keypress.enter.native='searchInterest' v-model="interestSearchContext">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-table :data="interestData" stripe align="left" :row-class-name="tableRowClassName">
            <el-table-column label="趣点名" prop="name"></el-table-column>
            <el-table-column label="微博数" prop="weibo_count"></el-table-column>
            <el-table-column label="被订阅数" prop="sub_count"></el-table-column>
            <el-table-column label="删除">
              <template slot-scope="scope">
                <el-button type="danger" @click="deleteSomething(interestData[scope.$index].id,'interest')">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :page-size="10" layout="prev, pager, next" :total="interestNum" @current-change="tabInterestPage"> </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    let isAdimini = JSON.parse(localStorage.getItem("user_info")).is_admini;
    if (isAdimini) {
      next();
    } else {
      next("/404");
    }
  },
  data() {
    return {
      activeName: "first",
      showLoading: false,
      dialogLoading: false,
      userData: [],
      userNum: 0,
      userSearchContext: "",
      weiboData: [],
      weiboNum: 0,
      weiboSearchContext: "",
      commentData: [],
      commentNum: 0,
      commentSearchContext: "",
      interestData: [],
      interestNum: 0,
      interestSearchContext: "",
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: "趣点不能为空", trigger: "blur" }]
      },
      interestForm: {
        name: ""
      }
    };
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "even-row";
      }
      return "";
    },
    searchUser(e) {
      this.showLoding = true;
      this.$_http
        .get("/system/user/search", {
          params: {
            token: localStorage.getItem("loginToken"),
            page: 1,
            keyword: e.target.value
          }
        })
        .then(response => {
          this.showLoding = false;
          let data = response.data.msg;
          this.userNum = data.user_count;
          this.userData = data.users;
        })
        .catch(error => {
          console.log(error);
        });
    },
    tabUserPage(page) {
      this.showLoding = true;
      this.$_http
        .get("/system/user/search", {
          params: {
            token: localStorage.getItem("loginToken"),
            page: page,
            keyword: this.userSearchContext
          }
        })
        .then(response => {
          console.log(response);
          this.showLoding = false;
          let data = response.data.msg;
          this.userNum = data.user_count;
          this.userData = data.users;
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchWeibo(e) {
      this.showLoding = true;
      this.$_http
        .get("/system/weibo/search", {
          params: {
            token: localStorage.getItem("loginToken"),
            page: 1,
            keyword: e.target.value
          }
        })
        .then(response => {
          console.log(response);
          this.showLoding = false;
          let data = response.data.msg;
          this.weiboNum = data.weibo_count;
          this.weiboData = data.weibos;
        })
        .catch(error => {
          console.log(error);
        });
    },
    tabWeiboPage(page) {
      this.showLoding = true;
      this.$_http
        .get("/system/weibo/search", {
          params: {
            token: localStorage.getItem("loginToken"),
            page: page,
            keyword: this.weiboSearchContext
          }
        })
        .then(response => {
          this.showLoding = false;
          let data = response.data.msg;
          this.weiboNum = data.weibo_count;
          this.weiboData = data.weibos;
        })
        .catch(error => {
          console.log(error);
        });
    },

    searchComment(e) {
      this.showLoding = true;
      this.$_http
        .get("/system/comment/search", {
          params: {
            token: localStorage.getItem("loginToken"),
            page: 1,
            keyword: e.target.value
          }
        })
        .then(response => {
          this.showLoding = false;
          let data = response.data.msg;
          this.commentNum = data.comment_count;
          this.commentData = data.comments;
        })
        .catch(error => {
          console.log(error);
        });
    },
    tabCommentsPage(page) {
      this.showLoding = true;
      this.$_http
        .get("/system/comment/search", {
          params: {
            token: localStorage.getItem("loginToken"),
            page: page,
            keyword: this.commentSearchContext
          }
        })
        .then(response => {
          this.showLoding = false;
          let data = response.data.msg;
          this.commentNum = data.comment_count;
          this.commentData = data.comments;
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchInterest(e) {
      this.showLoding = true;
      this.$_http
        .get("/system/interest/search", {
          params: {
            token: localStorage.getItem("loginToken"),
            page: 1,
            keyword: e.target.value
          }
        })
        .then(response => {
          console.log(response);
          this.showLoding = false;
          let data = response.data.msg;
          this.interestNum = data.interest_count;
          this.interestData = data.interests;
        })
        .catch(error => {
          console.log(error);
        });
    },
    tabInterestPage(page) {
      this.showLoding = true;
      this.$_http
        .get("/system/interest/search", {
          params: {
            token: localStorage.getItem("loginToken"),
            page: page,
            keyword: this.in
          }
        })
        .then(response => {
          console.log(response);
          this.showLoding = false;
          let data = response.data.msg;
          this.interestNum = data.interest_count;
          this.interestData = data.interests;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteSomething(targetId, target) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$_http
            .post("/system/" + target + "/delete", {
              token: localStorage.getItem("loginToken"),
              id: targetId
            })
            .then(response => {
              if (response.data.msg.success > 0) {
                this[target + "Num"]--;
                let index = this[target + "Data"].findIndex(item => {
                  return item.id == targetId;
                });
                this[target + "Data"].splice(index, 1);
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
    userManage(targetUser) {
      this.$confirm("确认这样做吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$_http
            .post("/system/user/banned", {
              token: localStorage.getItem("loginToken"),
              id: targetUser.id,
              is_banned: targetUser.is_banned ? 0 : 1
            })
            .then(response => {
              if (response.data.msg.success > 0) {
                (targetUser.is_banned = targetUser.is_banned ? 0 : 1),
                  this.$message({
                    type: "success",
                    message: "操作成功!"
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
    createInterest() {
      this.dialogLoading = true;
      this.$_http
        .post("/system/interest/add", {
          token: localStorage.getItem("loginToken"),
          name: this.interestForm.name
        })
        .then(response => {
          if (response.data.msg.success > 0) {
            this.dialogLoading = false;
            this.interestNum++;
            this.$message({
              type: "success",
              message: "创建成功!"
            });
            this.interestData.splice(this.interestData.length, 1);
            this.interestData.splice(0, 0, {
              id: 999,
              name: this.interestForm.name,
              weibo_count: 0,
              sub_count: 0
            });
            this.dialogFormVisible = false;
            this.$refs.interestCreateForm.resetFields();
          }
        });
    }
  }
};
</script>

<style >
.menu-body {
  width: 1200px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}

.el-table .even-row {
  background-color: #e2e2e2;
}

.search-bar-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
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
  box-sizing: border-box;
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
  padding-bottom: 5px;
}

.box-footer {
  display: flex;
  justify-content: flex-end;
}

.context-box {
  text-align: left;
  word-wrap: break-word;
}

/*------------------------------dialog-----------------------------------------------------------*/
.dialog-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100px;
}

.login-button {
  width: 100%;
}

.el-dialog__body {
  padding-bottom: 0;
}

.el-button + .el-button {
  margin-left: 0;
}
.el-dialog__footer {
  padding-top: 0;
}

.el-form--label-top .el-form-item__label {
  padding: 0;
}
</style>
