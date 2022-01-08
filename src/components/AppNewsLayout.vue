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
        <div class="grid-content">
          <el-image v-if="state">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <img v-bind:src="item.image" alt="" v-on:click="jumpPage(item.id)" v-else/>
        </div>
      </el-col>
      <el-col :span="10" :push="1">
        <div class="grid-content" v-on:click="jumpPage(item.id)">
          {{ item.title }}
        </div>
        <div class="newsdate">{{ item.date }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      items: [],
      state: true,
      page: 1,
      type: "top",
    };
  },
  created: function () {
    let vm = this;
    this.request(
      "/index",
      {
        type: this.type,
        page: this.page,
        is_filter: 1,
      },
      function (response) {
        vm.state = false;
        console.log(response.data);
        let resultData = response.data.result.data;
        let temp = [];
        // 新闻列表
        for (let i = 4; i < resultData.length; i++) {
          let obj = resultData[i];
          temp.push({
            author: obj.author_name,
            category: obj.category,
            date: obj.date,
            image: obj.thumbnail_pic_s,
            title: obj.title,
            id: obj.uniquekey,
            url: obj.url,
          });
        }
        vm.items = temp;
      }
    );
  },
  methods: {
    // 新闻详情跳转
    jumpPage: function (id) {
      let pageId;
      console.log(id);
      this.$router.push({ name: "Content", params: { pageId: pageId, id: id} });
    },
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  /* font-size: 18px; */
  font-family: notoserifb;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
  border-bottom: thin solid #cfccc9;
}
.newsdate {
  margin-top: 17px;
  margin-left: -15px;
  font-size: 14px;
  color: #847c74;
  font-family: zcool;
}
img {
  width: 166px;
}
</style>