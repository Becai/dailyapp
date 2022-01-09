<template>
  <div id="search">
    <el-row>
      <el-col :span="20">
        <div @keydown.enter="search">
          <el-input placeholder="请输入内容" v-model="input" clearable>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="search">
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    search: function () {
      if (this.input == "") {
        this.$notify({
          title: "错误",
          message: "请输入有效信息！",
          type: "error",
          position: "top-left",
          duration: 1200,
        });
        return;
      }
      this.$router.push({ name: "Search", params: { content: this.input } });
    },
  },
};
</script>

<style scoped>
#search {
  margin-bottom: 0px;
}
.el-input {
  width: 90%;
}
.el-button {
  width: 100%;
  padding-right: 12px !important;
  padding-left: 12px !important;
}
</style>