<template>
    <div>
        <el-col :span="20" :offset="2">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs-menu" type="border-card">
                <el-tab-pane label="用户管理" name="first">
                    <el-raw >
                    <el-col :span="5" :offset="18">
                    <el-input placeholder="输入用户名/邮箱/用户ID" clearable @keypress.enter.native='search' >
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input></el-col></el-raw>
                    <el-table :data="dataTable" stripe align="center">
                        <el-table-column label="用户ID" prop="id" ></el-table-column>
                        <el-table-column label="用户名" prop="name"></el-table-column>
                        <el-table-column label="邮箱" prop="email"></el-table-column>
                        <el-table-column label="评论数" prop="commentNum"></el-table-column>
                        <el-table-column label="微博数" prop="weiboNum"></el-table-column>
                        <el-table-column label="粉丝数" prop="fansNum"></el-table-column>
                        <el-table-column label="被点赞数" prop="likeNum"></el-table-column>
                        <el-table-column label="禁言" prop="is_banned">
                            <template slot-scope="scope">
                                <el-button type="danger" v-if='!dataTable[scope.$index].is_banned'>禁言</el-button>
                                <el-button type="success" v-else>取消</el-button>
                            </template>                          
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="博文管理" name="second">
                    
                </el-tab-pane>
                <el-tab-pane label="评论管理" name="third">

                </el-tab-pane>
                <el-tab-pane label="趣点管理" name="forth">
                    <el-raw >
                    <el-col :span="5" :offset="18">
                    <el-input placeholder="输入趣点名" clearable @keypress.enter.native='search' >
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input></el-col></el-raw>
                    <el-table :data="interestTable" stripe align="center">
                        <el-table-column label="趣点名" prop="interestName" ></el-table-column>
                        <el-table-column label="微博数" prop="weiboNum"></el-table-column>
                        <el-table-column label="被订阅数" prop="subsNum"></el-table-column>
                        <el-table-column label="删除" >
                            <template slot-scope="scope">
                                <el-button type="danger" >删除</el-button>
                            </template>                          
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      dataTable: [
        {
          id: 132,
          name: "a",
          email: "123@123.com",
          commentNum: 50,   
          weiboNum: 200,
          fansNum: 250,
          likeNum: 88,
          is_banned: false,
        },
        {
          id: 546,
          name: "b",
          email: "456@456.com",
          commentNum: 60,   
          weiboNum: 210,
          fansNum: 260,
          likeNum: 98,
          is_banned: true,
        }
      ],
      interestTable: [{
          interestName: "Music",
          weiboNum: 20, 
          subsNum: 10,
      },{}]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    search(e) {
      console.log(e);
    },
  }
};
</script>

<style scoped>
</style>
