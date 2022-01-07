<template>
  <div id="newslayout">
    <el-row
      type="flex"
      class="row-bg"
      justify="center"
      align="middle"
      v-for="item in items"
      :key="item.id"
    >
      <el-col :span="10" :pull="1">
        <div class="grid-content bg-purple"><img v-bind:src="item.image" alt=""></div>
      </el-col>
      <el-col :span="10" :push="1">
        <div class="grid-content bg-purple-light">{{ item.title }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {},
  mounted: function () {
    Vue.axios
      .post("https://api.apiopen.top/getWangYiNews", {})
      .then((response) => {
        console.log(response)
        this.items = response.data.result;
        console.log(this.items)
      })
      .catch((error) => {
        console.log(error)
      });
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
img {
  width: 166px;;
}
</style>