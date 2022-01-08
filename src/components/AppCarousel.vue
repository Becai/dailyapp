<template>
  <div class="block">
    <el-carousel height="200px">
      <el-carousel-item v-for="item in swipeItems" :key="item.id">
        <img v-bind:src="item.image" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// import func from 'vue-editor-bridge';

export default {
  data() {
    return {
      swipeItems: [],
      state: true,
    };
  },
  methods: {},
  mounted: function () {
    this.request(
      "/index",
      {
        type: this.type,
        page: this.page,
        is_filter: 1,
      },
      (response) => {
        this.state = false;
        console.log(response.data);
        let resultData = response.data.result.data;
        let swipeTemp = [];
        // 轮播图
        for (let i = 0; i < 4; i++) {
          let obj = resultData[i];
          swipeTemp.push({
            author: obj.author_name,
            category: obj.category,
            date: obj.date,
            image: obj.thumbnail_pic_s,
            title: obj.title,
            id: obj.uniquekey,
            url: obj.url,
          });
        }
        console.log(swipeTemp);
        this.swipeItems = swipeTemp;
      }
    );
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  width: 358px;
}
</style>