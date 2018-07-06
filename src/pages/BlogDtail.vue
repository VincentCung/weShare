<template>
    <div class="main">
        <div class="main-box">
            <weibo :content='weibo.content' :id="weibo.id" style="box-shadow:none" @comment='refreshComment' />
            <div class="textarea-box" v-if="$store.state.is_login">
                <h4 v-show='replyTo.name'>回复{{replyTo.name}}:</h4>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="写下你的评论（上限200字）" v-model="context" maxlength="200">
                </el-input>
                <div class="box-footer">
                    <el-button type="primary" class='publish-btn'>发布</el-button>
                </div>
            </div>
            <div class="comment-box" v-for="comment in comments" :key="comment.id">
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
                        <el-button type='text'>回复</el-button>
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
          photos: [
            {
              id: 1,
              source: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg"
            }
          ]
        }
      },
      context: "",
      comments: [
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
      ]
    };
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
  width: 100%;
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
}
.box-footer {
}
</style>
