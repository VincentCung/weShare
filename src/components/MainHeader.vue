<template>
    <div>
        <div class='header-box'>
            <div class="box-avatar-wrap">
                <img :src="imageUrl" alt="头像" class='box-avatar'>
            </div>
            <h2 class='box-name'>{{name}}</h2>
            <div class="box-button-wrap">
                <el-button v-if="followAble" :icon="followIcon" class='box-button' :type="buttonType" :loading='showLoading' @click='follow'>{{followText}}</el-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.header-box {
  height: 270px;
  background-color: rgba(255, 255, 255, 1);
  margin: 0;
  border: 0;
}
.box-avatar-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  padding-top: 52px;
  margin: 0 auto;
  background: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.box-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.box-name {
  margin-top: 6px;
  text-align: center;
  /* text-shadow: 0 0 4px rgba(0, 0, 0, 0.5); */
  vertical-align: text-bottom;
  font-size: 22px;
}

.box-button-wrap {
  margin: 15px auto 0;
}
</style>
<script>
export default {
  data() {
    return {  };
  },
  props: {
    isFollow: {
      type: Boolean,
      default: false
    },
    followAble: {
      type: Boolean,
      default: false
    },
    showLoading: {
      type: Boolean,
      default :false
    },
    name: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: "https://img.xiaopiu.com/userImages/img141644e3b5688.jpg"
    }
  },
  methods: {
    follow() {
      this.$emit('follow')
    }
  },
  computed:{
      followText (){
          return this.isFollow?'取消关注':'关注'
      },
      followIcon() {
          return this.isFollow?'el-icon-close':'el-icon-plus'
      },
      buttonType() {
          return this.isFollow?'':'primary'
      }
  }
};
</script>


 

