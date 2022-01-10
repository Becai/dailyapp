<template>
  <div id="newslayout">
    <div v-if="!searchFailed">
      <div id="top"></div>
      <el-row
        type="flex"
        class="row-bg"
        justify="center"
        align="middle"
        v-for="item in items"
        :key="item.uniqueKey"
      >
        <el-col :span="10" :pull="1">
          <div class="grid-content">
            <img
              v-bind:src="item.image"
              alt=""
              v-on:click="jumpPage(item.uniqueKey, item.image)"
            />
          </div>
        </el-col>
        <el-col :span="10" :push="1">
          <div
            class="grid-content"
            v-on:click="jumpPage(item.uniqueKey, item.image)"
          >
            <span v-html="item.title"></span>
          </div>
          <div class="newsdate">{{ item.date }}</div>
        </el-col>
      </el-row>
      <div v-if="more" class="loading" v-loading="loading"></div>
      <div v-else class="end_toast">已经到底了！</div>
    </div>
    <el-empty v-else description="未找到相关内容"></el-empty>
    <!--回到顶部-->
    <el-button
      type="primary"
      icon="el-icon-caret-top"
      v-show="backToTop"
      class="back-top"
      @click="backTop"
      circle
    ></el-button>
  </div>
</template>

<script>
import { isLoad, scrollTop, setScrollTop } from "../utils/scrollUtils.js";

//最小加载时间，单位毫秒
let minLoadTime = 200;
//可以加载的最大页数
let maxPage = 50;
//当前页数
let page = 1;
//数据备份
let backup = [];
// let cache = [];
/**
 * 加载数据
 */
function loadData(vm) {
  let start = Date.now();
  let temp = [];
  let carouselData = [];

  vm.request(
    "/index",
    {
      type: vm.type,
      page: page,
      is_filter: 1,
    },
    //success
    (response) => {
      console.log(response.data);
      let resultData = response.data.result.data;
      // 新闻列表
      for (let i = 0; i < resultData.length; i++) {
        let obj = resultData[i];
        let data = {
          author: obj.author_name,
          category: obj.category,
          date: obj.date,
          image: obj.thumbnail_pic_s,
          title: obj.title,
          uniqueKey: obj.uniquekey,
          url: obj.url,
        };
        let { ...backData } = data;
        backup.push(backData);
        // 前四条新闻，轮播图展示,只有第一次才发送
        if (page == 1 && i < 4) {
          carouselData.push(data);
        } else {
          temp.push(data);
        }
      }
      // console.log(carouselData, temp)
      if (page == 1) {
        //通过总线发送
        vm.$bus.$emit("msg-carousel", carouselData);
      }
    },
    //catch
    () => {
      let state = false;
      vm.bus.$emit("state", state);
    },
    //finally
    () => {
      let end = Date.now();
      //实际加载时间
      let loadTime = end - start;
      //第一次加载时不等待
      let waitTime = 0;
      if (page != 1) {
        //设置最小等待加载时间，让用户觉得程序有加载的过程
        waitTime = loadTime < minLoadTime ? minLoadTime : loadTime;
      }
      setTimeout(() => {
        vm.items = vm.items.concat(temp);
        vm.loading = false;
        if (page >= maxPage) {
          vm.more = false;
        }
      }, waitTime);
    }
  );
}

export default {
  // props: ['temp'],
  props: {
    category: {
      type: String,
      default: "top",
    },
  },
  data: function () {
    return {
      items: [],
      type: "top",
      loading: false,
      more: true,
      isSearch: false,
      backToTop: false,
      searchFailed: false,
    };
  },
  created: function () {
    page = 1;
    loadData(this);
  },
  mounted: function () {
    window.onscroll = this.loadMore;
    this.$bus.$on("search", (content) => {
      console.log("get " + content);
      this.isSearch = true;
      this.searchContent(content);
    });
  },
  beforeDestroy: function () {
    //移除监听事件
    this.$bus.$off("search", {});
  },
  methods: {
    // 新闻详情跳转
    jumpPage: function (id, imgUrl) {
      // let pageId;
      console.log(id, imgUrl);
      this.$router.push({
        name: "Content",
        params: { id: id, imgUrl: imgUrl },
      });
    },
    loadMore: function () {
      if (scrollTop() > 700) {
        this.backToTop = true;
      } else {
        this.backToTop = false;
      }
      if (!this.isSearch && this.more && !this.loading && isLoad()) {
        console.log("load");
        this.loading = true;
        page++;
        loadData(this);
      }
    },
    searchContent: function (content) {
      let temp = backup;
      let result = [];
      for (let i = 0; i < temp.length; i++) {
        let index = temp[i].title.search(content);
        if (index != -1) {
          let { ...backupData } = temp[i];
          backupData.title = temp[i].title.replaceAll(
            content,
            '<font color="#f00">' + content + "</font>"
          );
          result.push(backupData);
        }
      }
      this.items = result;
      this.searchFailed = false;
      if (result.length == 0) {
        this.searchFailed = true;
      }
    },
    backTop: function () {
      let toTop = scrollTop();
      let id = setInterval(() => {
        toTop -= 0.3 * toTop;
        setScrollTop(toTop);
        if (scrollTop() == 0) {
          clearInterval(id);
        }
      }, 20);
      /* setTimeout(() => {
        clearInterval(id)
      }, 500) */
    },
  },
  watch: {
    // 监听新闻类别category变化
    category: {
      handler(type) {
        // 初始化页面
        this.items = [];
        this.page = 1;

        this.type = type;
        loadData(this);
      },
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

.loading {
  padding: 1em 0;
  text-align: center;
}
.end_toast {
  margin-bottom: 0.2em;
  margin-top: -1em;
  color: gray;
  font-size: 14px;
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 2000;
}
</style>