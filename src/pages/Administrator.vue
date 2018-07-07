<template>
    <div class="main">
        <div class="menu-body">
            <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                <el-tab-pane label="用户管理" name="first">
                    <div class="search-bar-box">
                        <el-input placeholder="输入用户名/邮箱/用户ID" clearable @keypress.enter.native='search'>
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-table :data="currentUserData" stripe align="left" :row-class-name="tableRowClassName">
                        <el-table-column label="用户ID" prop="id"></el-table-column>
                        <el-table-column label="用户名" prop="name"></el-table-column>
                        <el-table-column label="邮箱" prop="email"></el-table-column>
                        <el-table-column label="评论数" prop="commentNum"></el-table-column>
                        <el-table-column label="微博数" prop="weiboNum"></el-table-column>
                        <el-table-column label="粉丝数" prop="fansNum"></el-table-column>
                        <el-table-column label="被点赞数" prop="likeNum"></el-table-column>
                        <el-table-column label="禁言" prop="is_banned">
                            <template slot-scope="scope">
                                <el-button type="danger" v-if='!currentUserData[scope.$index].is_banned'>禁言</el-button>
                                <el-button type="success" v-else>取消</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination :page-size="10" layout="prev, pager, next" :total="userData.length" @current-change="tabUserPage">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="微博管理" name="second">
                    <div class="search-bar-box">
                        <el-input placeholder="输入微博内容/用户名" clearable @keypress.enter.native='search'>
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-table :data="currentWeiboData" :row-class-name="tableRowClassName" align="left">
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
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination :page-size="10" layout="prev, pager, next" :total="weiboData.length" @current-change="tabWeiboPage">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="评论管理" name="third">
                    <div class="search-bar-box">
                        <el-input placeholder="输入评论内容/用户名" clearable @keypress.enter.native='search'>
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <div class="comment-box" v-for="comment in currentComments" :key="comment.id">
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
                                <el-button type='danger'>删除</el-button>
                            </div>
                        </div>
                    </div>
                    <el-pagination :page-size="10" layout="prev, pager, next" :total="comments.length" @current-change="tabCommentsPage">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="趣点管理" name="forth">
                    <div class="search-bar-box">
                        <el-input placeholder="输入趣点名" clearable @keypress.enter.native='search'>
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-table :data="currentInterestData" stripe align="left" :row-class-name="tableRowClassName">
                        <el-table-column label="趣点名" prop="interestName"></el-table-column>
                        <el-table-column label="微博数" prop="weiboNum"></el-table-column>
                        <el-table-column label="被订阅数" prop="subsNum"></el-table-column>
                        <el-table-column label="删除">
                            <template slot-scope="scope">
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination :page-size="10" layout="prev, pager, next" :total="interestData.length" @current-change="tabInterestPage"> </el-pagination>

                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      weiboData: [
        {
          userName: "狗东西",
          read_count: 1,
          comment_count: 1,
          transmit_count: 1,
          thumb_count: 1,
          context: "你妈死了"
        }
      ],
      comments: [
        {
          id: 1,
          user: {
            id: 1,
            name: "我是孤儿",
            photo: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg"
          },
          create_time: '@date("yyyy年MM月dd日") @time("HH:mm")',
          context:
            "@string(7, 300)sadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddxdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
        },
        {
          id: 1,
          user: {
            id: 1,
            name: "我是孤儿",
            photo: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg"
          },
          create_time: '@date("yyyy年MM月dd日") @time("HH:mm")',
          context: "@string(7, 300)"
        }
      ],
      activeName: "first",
      userData: [
        {
          id: 132,
          name: "a",
          email: "123@123.com",
          commentNum: 50,
          weiboNum: 200,
          fansNum: 250,
          likeNum: 88,
          is_banned: false
        }
      ],
      interestData: [
        {
          interestName: "Music",
          weiboNum: 20,
          subsNum: 10
        }
      ],
      currentUserData: [],
      currentInterestData: [],
      currentComments: [],
      currentWeiboData: [
        {
          userName: "狗东西",
          read_count: 1,
          comment_count: 1,
          transmit_count: 1,
          thumb_count: 1,
          context:
            "@string(7, 300)sadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddxdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    search(e) {
      console.log(e);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "even-row";
      }
      return "";
    },
    tabUserPage(page) {
      this.currentUserData = this.userData.slice(
        (page - 1) * 10,
        page * 10 - 1
      );
    },
    tabInterestPage(page) {
      this.currentInterestData = this.interestData.slice(
        (page - 1) * 10,
        page * 10 - 1
      );
    },
    tabCommentsPage(page) {
      this.currentComments = this.comments.slice(
        (page - 1) * 10,
        page * 10 - 1
      );
    },
    tabWeiboPage(page) {
      this.currentWeiboData = this.weiboData.slice(
        (page - 1) * 10,
        page * 10 - 1
      );
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
</style>
