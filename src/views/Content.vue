<template>
  <div class="content">
    <el-container>
      <el-header height="200px" style="padding: 0">
        <div class="shadow">
          <i
            class="iconfont"
            style="position: absolute; left: 20px; top: 20px"
            v-on:click="toback"
            >&#xe64e;</i
          >
        </div>
        <img src="" alt="" />
      </el-header>
      <el-main style="margin-top: -45px; z-index: 1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data: function () {
    return {
      pageId: 0,
      id: 0,
      msg: {},
    }
  },
  created: function () {
    this.pageId = this.$route.params['pageId']
    this.id = this.$route.params['id']
  },
  mounted: function () {
    this.request(
      '/index',
      {
        type: this.type,
        page: this.page,
        is_filter: 1,
      },
      (response) => {
        console.log(response.data)
        let obj = response.data.result.data
        let temp = {}
        // 新闻详情
        // 修改
        temp.push({
          author: obj.author_name,
          category: obj.category,
          date: obj.date,
          image: obj.thumbnail_pic_s,
          title: obj.title,
          id: obj.uniquekey,
          url: obj.url,
        })
      }
    )
  },
  methods: {
    toback: function () {
      this.$router.push({ name: 'Home', params: {} })
    },
  },
}
</script>

<style scoped>
.shadow {
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(
    rgb(0, 0, 0, 1)-30%,
    rgb(53, 51, 60, 0.1) 25%,
    rgb(226, 225, 228, 0.1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    rgb(0, 0, 0, 1)-30%,
    rgb(53, 51, 60, 0.1) 25%,
    rgb(226, 225, 228, 0.1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    rgb(0, 0, 0, 1)-30%,
    rgb(53, 51, 60, 0.1) 25%,
    rgb(226, 225, 228, 0.1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    rgb(0, 0, 0, 1)-30%,
    rgb(53, 51, 60, 0.1) 25%,
    rgb(226, 225, 228, 0.1)
  ); /* 标准的语法（必须放在最后） */
  color: white;
}
i .iconfont {
  margin: 20px 20px;
}
</style>