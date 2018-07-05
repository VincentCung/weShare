<template>
    <div>
        <div class="interest-box">
            <div class="interest-avatar">
                <!-- <img :src="interest.avatarUrl" class="box-avator-img"> -->
                <img src="https://img.xiaopiu.com/userImages/img101644e3860b8.jpg" alt = "照片" class="box-avatar-img">
            </div>
            <!-- <div class="interest-name">#{{interest.name}}#</div> -->
            <div class="interest-name">#WORLD CUP#</div>
            <!-- <div class="interest-num">人数：{{interest.num}}</div> -->
            <div class="interest-num">人数：20</div>  
        </div>
    </div>
</template>

<script>
export default {
  props: {
    interest: {
      type: Object,
      required: true
    }
  },
  methods: {
  }
};
</script>

<style scoped>
.interest-box {
    text-align: center;
    margin-left: 34px;
    margin-bottom: 20px;
    margin-top: 20px;
    float: left;
    font-size: 15px
}
.interest-avatar {
    margin-bottom: 10px;    
}
.box-avatar-img {
    width: 180px;
    height: 180px
}
.interest-name {
    margin-bottom: 10px;
}
</style>
