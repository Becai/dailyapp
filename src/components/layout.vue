<template>
  <el-container>
    <el-container>
      <el-header>
          <search/>
          <carousel/>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import search from "./search.vue";
import carousel from "./carousel.vue";

export default {
  components: {
    search,
    carousel,
  },
  data() {
    return {
      input: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
.el-main {
  padding: 0;
}
</style>