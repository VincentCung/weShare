<template>
  <div>
    <div class="main-container">

      <el-row :gutter="20">
        <el-col :span="16" >
          <div style='background-color:red'>123</div>
        </el-col>
        <el-col :span="8" >
          <div style='background-color:red'>123</div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
.main-container {
  width: 920px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 16px 0 0 0;
}
</style>
