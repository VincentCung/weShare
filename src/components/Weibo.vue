<template>
    <div>
        <div class='weibo-box'>
            <div v-if="deleteAble" class="box-delete-btn">
                <el-button type="info" icon="el-icon-delete" circle></el-button>
            </div>
            <div class="box-avatar">
                <img :src="avatarUrl" alt="头像" class='box-avatar-img'>
            </div>
            <div class="box-detail">
                <el-button type="text" class='box-detail-name'>{{content.name}}</el-button>
                <div class='box-detail-time'>{{content.create_time}}</div>
                <div class='box-detail-text'>{{content.context}}</div>
                <div class='box-detail-photos'>
                </div>
            </div>
            <div class="box-admire-bar">
                <el-button-group class='box-bar-group'>
                    <el-button type="primary" icon="el-icon-tickets" class='box-btn'>阅读({{content.read_count}})</el-button>
                    <el-button type="primary" icon="el-icon-share" class='box-btn'>转发({{content.transmit_count}})</el-button>
                    <el-button type="primary" icon="el-icon-edit" class='box-btn'>评论({{content.comment_count}})</el-button>
                    <el-button type="primary" icon="el-icon-star-off" class='box-btn'>点赞({{content.thumb_count}})</el-button>
                </el-button-group>
            </div>

        </div>
    </div>
</template>

<style scoped>
.weibo-box {
  background-color: rgba(255, 255, 255, 0.75);
  padding: 20px 20px 4px;
  position: relative;
  text-align: start;
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
}

.box-bar-group {
  width: 100%;
}

.box-btn {
  width: 25%;
}
</style>

<script>
export default {
  props: {
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
  }
};
</script>
