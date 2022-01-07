<template>
  <el-container>
    <el-container>
      <el-header>
          <search/>
      </el-header>
      <el-main>
        <el-container>
          <el-header height="150px">
            <carousel/>
          </el-header>
          <el-main>
            <newslayout/>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import search from "./search.vue";
import carousel from "./carousel.vue";
import newslayout from "./newsLayout.vue";

export default {
  components: {
    search,
    carousel,
    newslayout
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