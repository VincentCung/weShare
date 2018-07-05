<template>
    <div>
        <div class="interest-box">
            <div class="interest-avatar">
                <!-- <img :src="interest.avatarUrl" class="box-avator-img"> -->
                <img src="https://img.xiaopiu.com/userImages/img131644e3a3960.jpg" alt = "照片" class="box-avatar-img">
            </div>
            <!-- <div class="interest-name">#{{interest.name}}#</div> -->
            <div class="interest-name">#MUSIC#</div>
            <!-- <div class="interest-num">人数：{{interest.num}}</div> -->
            <div class="interest-num">人数：250</div>  
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
    font-size: 15px;
    background-color: #a6a6a61e;    

}
.interest-avatar {
    margin-bottom: 10px;   
}
.box-avatar-img {
    width: 180px;
    height: 180px;
    
}
.interest-name, .interest-num {
    margin-bottom: 10px
}
</style>
