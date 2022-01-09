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
        <img v-bind:src="imgUrl" alt="" class="background-img" />
      </el-header>
      <el-main style="margin-top: -45px; z-index: 1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="content-title">{{ detail.title }}</span>
          </div>
          <div class="text item">
            <p class="content-date">{{ detail.date }}</p>
            <p v-html="msg.content"></p>
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
      // pageId: 0,
      id: 0,
      imgUrl: '',
      msg: {},
      detail: {},
    }
  },
  created: function () {
    // this.pageId = this.$route.params['pageId']
  },
  mounted: function () {
    this.id = this.$route.params['id']
    this.imgUrl = this.$route.params['imgUrl']
    console.log(this.id, this.imgUrl)

    this.request(
      '/content',
      {
        uniquekey: this.id,
      },
      (response) => {
        // console.log(response.data)
        let obj = response.data.result
        let detail = response.data.result.detail
        console.log(obj, detail)
        // 新闻详情
        this.msg = {
          id: obj.uniquekey,
          content: obj.content,
        }
        this.detail = {
          author: detail.author_name,
          category: detail.category,
          date: detail.date,
          image: detail.thumbnail_pic_s,
          title: detail.title,
          url: detail.url,
        }
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
  position: relative;
  z-index: 1;
}
.background-img {
  position: absolute;
  left: 7px;
  top: 8px;
  width: 400px;
}
i .iconfont {
  margin: 20px 20px;
}
.content-date {
  margin-top: 0;
  font-size: 14px;
  color: #847c74;
  font-family: zcool;
}
.content-title {
  font-family: notoserifb;
  font-size: 24px;
}
</style>