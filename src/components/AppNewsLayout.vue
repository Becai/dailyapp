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
          <img v-bind:src="item.image" alt="" v-on:click="jumpPage" />
        </div>
      </el-col>
      <el-col :span="10" :push="1">
        <div class="grid-content" v-on:click="jumpPage">
          {{ item.title }}
        </div>
        <div class="newsdate">{{ item.passtime }}</div>
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
      buffers: [],
      state: true,
    };
  },
  mounted: function () {
    Vue.axios
      .post("https://api.apiopen.top/getWangYiNews", {})
      .then((response) => {
        this.state = false;
        console.log(response);
        this.buffers = response.data.result;
        for (let i = 0; i < 5; i++) {
          this.items.push(this.buffers.shift());
        }
        console.log(this.items);
      })
      .catch((error) => {
        console.log(error);
      });

    this.$nextTick(function () {
      this.scroll();
    });
  },
  methods: {
    jumpPage: function (pageId) {
      alert();
      this.$router.push({ name: "Content", params: { pageId: pageId } });
    },
    scroll: function () {
      let isLoading = false;
      window.onscroll = () => {
        // 距离底部50px时加载一次
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <= 50;
        if (bottomOfWindow && isLoading == false) {
          isLoading = true;
          for (let i = 0; i < 2; i++) {
            this.items.push(this.buffers.shift());
          }
        }
      };
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