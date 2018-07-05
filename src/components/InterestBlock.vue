<template>
    <div>
        <div class="interest-box">
            <div class="interest-avatar">
                <!-- <img :src="interest.avatarUrl" class="box-avator-img"> -->
                <img src="https://img.xiaopiu.com/userImages/img131644e3a3960.jpg" alt = "照片" width="180" height="180">
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
    margin:20px;
    font-size: 15px;
    background-color: #f5f5f5;    
}
.interest-avatar {
    margin-bottom: 10px;   
}

.interest-name, .interest-num {
    margin-bottom: 10px
}
</style>
