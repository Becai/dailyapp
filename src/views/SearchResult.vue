<template>
    <el-container>
      <el-header>
        <AppSearch></AppSearch>
      </el-header>
      <el-main>{{content}}
        <AppNewsLayout></AppNewsLayout>
      </el-main>
    </el-container>
</template>

<script>
import AppSearch from "../components/AppSearch.vue";
import AppNewsLayout from "../components/AppNewsLayout.vue";
export default {
  name: "Search",
  props: ['content'],
  components:{
    AppSearch,
    AppNewsLayout
  }
};
</script>