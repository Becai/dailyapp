<template>
  <div class="error">
    <el-empty
      description="您似乎闯入了无入之境"
      :image-size="350"
      image="/404.svg"
    >
      <el-button class="back-home" type="primary">回到主页</el-button>
      <el-row>
          不如上B站看<a href="https://space.bilibili.com/672328094/">@嘉然今天吃什么</a>吧！
      </el-row>
    </el-empty>
  </div>
</template>

<script>
export default {
  methods: {
    backHome: function () {
      this.$router.replace({ path: "/" });
    },
  },
};
</script>

<style scoped>
.el-row{
    margin-top: 30px;
    font-size: 12px;
    color: gray;
}
.el-row a{
    text-decoration: none;
}
.el-empty {
  margin-top: 60px;
}
.back-home {
  margin-top: 200px;
}
</style>
