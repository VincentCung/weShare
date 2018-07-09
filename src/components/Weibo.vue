<template>
  <div class='weibo-box'>

    <div class="main-box">
      <div v-if="deleteAble" class="box-delete-btn">
        <el-button type="danger" icon="el-icon-close" circle size="mini" @click="deleteWeibo"></el-button>
      </div>
      <div class="box-avatar">
        <img :src="avatarUrl" alt="头像" class='box-avatar-img'>
      </div>
      <div class="box-detail">
        <el-button type="text" class='box-detail-name' @click="redirectToUser">{{name}}</el-button>
        <div class='box-detail-time'>{{content.create_time}}</div>
        <div class='box-detail-text'>{{content.context}}</div>
        <!-- <div class='box-detail-photos clearfix' v-if='content.photos.length'>
          <li class='box-photo-wrap' v-for="photo in content.photos" :key="photo.id">
            <img :src="photo.source" alt="照片" class='box-photo'>
          </li>
        </div> -->
      </div>
    </div>
    <div class="box-admire-bar">
      <el-button-group class='box-bar-group'>
        <!-- TODO:每一个按钮跳转 -->
        <el-button icon="el-icon-tickets" class='box-btn' @click='read'>阅读({{content.read_count}})</el-button>
        <el-button icon="el-icon-share" class='box-btn' @click='transmit'>转发({{content.transmit_count}})</el-button>
        <el-button icon="el-icon-edit" class='box-btn' @click='comment'>评论({{content.comment_count}})</el-button>
        <el-button :icon="content.is_thumb?'el-icon-star-on':'el-icon-star-off'" class='box-btn' @click="thumb" :loading='showLoading'>{{thumbText}}</el-button>
      </el-button-group>
    </div>
  </div>

</template>

<style scoped>
.weibo-box {
  background-color: #fff;
  position: relative;
  text-align: start;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.main-box {
  padding: 20px 20px 0;
}
.box-delete-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.box-avatar {
  float: left;
  width: 50px;
}

.box-avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

/*---------------------detail-------------------------------*/
.box-detail {
  margin-left: 60px;
}
.box-detail-name {
  margin-bottom: 3px;
  padding: 5px 0 0;
  font-size: 14px;
  font-weight: 700;
}

.box-detail-time {
  font-size: 12px;
  margin-bottom: 2px;
}

.box-detail-text {
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 23px;
  word-wrap: break-word;
}

.box-detail-photos {
  margin-top: 5px;
  margin-bottom: 5px;
}

.box-photo-wrap {
  width: 110px;
  height: 110px;
  margin: 4px 0 0 4px;
  float: left;
  position: relative;
  overflow: hidden;
  list-style: none;
}

.box-photo {
  width: 100%;
  height: 100%;
}
.box-bar-group {
  width: 100%;
}

.box-btn {
  border-radius: 0;
  width: 25%;
  background-color: inherit;
}
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "用户名"
    },
    avatarUrl: {
      type: String,
      default: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg"
    },
    userId: {
      type:Number,
      required:true,
    },
    content: {
      type: Object,
      required: true
    },
    deleteAble: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: true
    },
    showLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    thumbText() {
      let text = this.content.is_thumb ? "已" : "";
      text += "点赞";
      text += "(" + this.content.thumb_count + ")";
      return text;
    }
  },
  methods: {
    read() {
      if (this.$route.path != "/blog") {
        this.$router.replace("/blog?id=" + this.id);
      }
    },
    comment() {
      if (this.$route.path != "/blog") {
        this.$router.replace("/blog?id=" + this.id);
      } else {
        this.$emit("comment");
      }
    },
    thumb() {
      this.$emit("thumb", this.id);
    },
    deleteWeibo() {
      this.$emit("delete", this.id);
    },
    transmit() {},
    redirectToUser() {
      if(this.$route.path!='/blogs'){
        let mainUserId =null
        if(localStorage.getItem('loginToken')){
          mainUserId = JSON.parse(localStorage.getItem('user_info')).id
        }
        if(mainUserId&&mainUserId == this.userId) {
          this.$router.replace('/blogs')
        } else {
          this.$router.replace('/blogs?userId='+ this.userId)
        }
      }
    }
  }
};
</script>
