<template>
    <div>
        <div class="interest-box">
            <router-link :to="'/interest?id='+interest.id" class='box-hover'>
                <div class="interest-avatar">
                    <img :src="interest.imageUrl" class="box-avatar-img" alt="照片" width="180" height="180">
                </div>
                <div class="interest-name">#{{interest.name}}#</div>
                <div class="interest-num">微博数：{{interest.count}}</div>
            </router-link>
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
  methods: {}
};
</script>

<style scoped>
.interest-box {
  text-align: center;
  margin: 20px;
  font-size: 15px;
  background-color: #dddddd;
  width: 180px;
  padding-bottom: 10px;
}

.box-hover:hover {
  color: #5aa9a4;
}

.interest-avatar {
  width: 180px;
}

.interest-name,
.interest-num {
  margin-top: 10px;
  font-weight: 600;
  width: 100%;
  word-wrap: break-word;
}
</style>
