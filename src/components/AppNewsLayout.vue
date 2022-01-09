<template>
  <div id="newslayout">
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
          {{ item.title }}
        </div>
        <div class="newsdate">{{ item.date }}</div>
      </el-col>
    </el-row>
    <div v-if="more" class="loading" v-loading="loading"></div>
    <div v-else class="end_toast">已经到底了！</div>
  </div>
</template>

<script>
import { isLoad } from '../utils/scrollUtils.js'
import Bus from '../router/Bus.js'

//最小加载时间，单位毫秒
let minLoadTime = 200
//可以加载的最大页数
let maxPage = 50
//当前页数
let page = 1
// let cache = [];
/**
 * 加载数据
 */
function loadData(vm) {
  let start = Date.now()
  let temp = []
  let carouselData = []

  vm.request(
    '/index',
    {
      type: vm.type,
      page: page,
      is_filter: 1,
    },
    //success
    (response) => {
      console.log(response.data)
      let resultData = response.data.result.data
      // 新闻列表
      let i = 0
      for (; i < resultData.length; i++) {
        let obj = resultData[i]
        // 前四条新闻，轮播图展示
        if (i >= 4) {
          temp.push({
            author: obj.author_name,
            category: obj.category,
            date: obj.date,
            image: obj.thumbnail_pic_s,
            title: obj.title,
            uniqueKey: obj.uniquekey,
            url: obj.url,
          })
        } else {
          carouselData.push({
            author: obj.author_name,
            category: obj.category,
            date: obj.date,
            image: obj.thumbnail_pic_s,
            title: obj.title,
            uniqueKey: obj.uniquekey,
            url: obj.url,
          })
        }
      }
      // console.log(carouselData, temp)
      Bus.$emit('msgToCarousel', carouselData)
    },
    //catch
    () => {
      let state = false
      vm.$emit('state', state)
    },
    //finally
    () => {
      let end = Date.now()
      //实际加载时间
      let loadTime = end - start
      //第一次加载时不等待
      let waitTime = 0
      if (page != 1) {
        //设置最小等待加载时间，让用户觉得程序有加载的过程
        waitTime = loadTime < minLoadTime ? minLoadTime : loadTime
      }

      setTimeout(() => {
        vm.items = vm.items.concat(temp)
        vm.loading = false
        if (page >= maxPage) {
          vm.more = false
        }
      }, waitTime)
    }
  )
}

export default {
  // props: ['temp'],
  props: {
    category: {
      type: String,
      default: 'top',
    },
  },
  data: function () {
    return {
      items: [],
      type: 'top',
      loading: false,
      more: true,
    }
  },
  created: function () {
    loadData(this)
  },
  mounted: function () {
    // console.log(this.category)
    window.onscroll = this.loadMore
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
      if (this.more && !this.loading && isLoad()) {
        console.log("load");
        this.loading = true;
        page++;
        loadData(this);
      }
    },
  },
  watch: {
    // 监听新闻类别category变化
    category: {
      handler(type) {
        // 初始化页面
        this.items = []
        this.page = 1

        this.type = type
        loadData(this)
      },
    },
  },
}
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
</style>