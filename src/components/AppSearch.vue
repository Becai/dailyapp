<template>
  <div id="search">
    <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
 #search {
     margin-bottom: 0px;
 }
 .el-input {
     width: 72%;
 }
</style>