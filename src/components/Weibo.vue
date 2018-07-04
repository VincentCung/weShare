<template>
    <div>
        <div class='weibo-box'>
            <div class="main-box">
                <!-- TODO:删除按钮 -->
                <div v-if="deleteAble" class="box-delete-btn">
                    <el-button type="info" icon="el-icon-delete" circle size="mini"></el-button>
                </div>
                <div class="box-avatar">
                    <img :src="avatarUrl" alt="头像" class='box-avatar-img'>
                </div>
                <div class="box-detail">
                  <!-- TODO:跳转到头像用户 -->
                    <el-button type="text" class='box-detail-name'>{{name}}</el-button>
                    <div class='box-detail-time'>{{content.create_time}}</div>
                    <div class='box-detail-text'>{{content.context}}</div>
                    <div class='box-detail-photos clearfix' v-if='content.photos.length'>
                        <li class='box-photo-wrap' v-for="photo in content.photos" :key="photo.id">
                            <img :src="photo.source" alt="照片" class='box-photo'>
                        </li>
                    </div>
                </div>
            </div>
            <div class="box-admire-bar">
                <el-button-group class='box-bar-group'>
                    <!-- TODO:每一个按钮跳转 -->
                    <el-button icon="el-icon-tickets" class='box-btn'>阅读({{content.read_count}})</el-button>
                    <el-button icon="el-icon-share" class='box-btn'>转发({{content.transmit_count}})</el-button>
                    <el-button icon="el-icon-edit" class='box-btn'>评论({{content.comment_count}})</el-button>
                    <!-- TODO:点赞功能 -->
                    <el-button :icon="content.is_thumb?'el-icon-star-on':'el-icon-star-on'" class='box-btn'>{{thumbText}}</el-button>
                </el-button-group>
            </div>
        </div>
    </div>
</template>

<style scoped>
.weibo-box {
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  text-align: start;
  margin-bottom: 10px;
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
    content: {
      type: Object,
      required: true
    },
    avatarUrl: {
      type: String,
      default: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg"
    },
    deleteAble: {
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
  }
};
</script>
