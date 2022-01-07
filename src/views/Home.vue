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
import search from "../components/AppSearch.vue";
import carousel from "../components/AppCarousel.vue";
import newslayout from "../components/AppNewsLayout.vue";

export default {
  name: "Home",
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