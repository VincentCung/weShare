<template>
    <div class='main-page'>
        <div class="main-container">
            <div class='header-wrap'>
                <main-header :name="'用户名'" :follow-able="true" @follow="follow" :is-follow="isFollow" :show-loading='followLoading'></main-header>
            </div>
        </div>

    </div>

</template>
<script>
import MainHeader from "@/components/MainHeader";

export default {
  data() {
    return {
      isFollow: false,
      followLoading:false,
    };
  },
  components: {
    MainHeader
  },
  methods: {
    follow() {
        this.followLoading=true
        setTimeout(() => {
            this.followLoading=false
            this.isFollow=!this.isFollow
        }, 2000);
    }
  }
};
</script>
<style>
.main-page {
  background-color: #47bcc9;
}
.main-container {
  width: 920px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}
</style>
