<template>
  <div>
    <transition name="slider">
      <AppSlider v-show="show">
        <div class="app-slider-close close-btn">
          <i class="el-icon-close" @click="toggleSlider"></i>
        </div>
        <el-row>
          <div v-for="item in tableData" :key="item.id" class="slider-cell" @click="sendType(item.label)">
            {{ item.name }}
          </div>
        </el-row>
        <div>
          <el-button type="primary" icon="el-icon-message" class="feedback-btn" v-on:click="feedback">反馈</el-button>
        </div>
      </AppSlider>
    </transition>

    <el-container>
      <el-container>
        <el-header>
          <el-row>
            <!-- 控制侧边栏的按键 -->
            <el-col :span="2" class="slider-toggle-button">
              <i class="el-icon-s-operation" @click="toggleSlider"></i>
            </el-col>
            <!-- 搜索栏 -->
            <el-col :span="22">
              <search />
            </el-col>
          </el-row>
        </el-header>
        <el-main v-if="ok">
          <el-container>
            <el-header height="200px" style="margin-bottom: 20px">
              <carousel />
            </el-header>
            <el-main>
              <newslayout v-bind:category="category" @state="loadErr"/>
            </el-main>
          </el-container>
        </el-main>
        <el-empty description="网络连接失败" v-else></el-empty>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import search from '../components/AppSearch.vue'
import carousel from '../components/AppCarousel.vue'
import newslayout from '../components/AppNewsLayout.vue'
import AppSlider from '../components/AppSlider.vue'

export default {
  name: 'Home',
  components: {
    search,
    carousel,
    newslayout,
    AppSlider,
  },
  data() {
    return {
      input: '',
      show: false,
      category: 'top',
      ok: true,
      tableData: [
        {
          name: '国内',
          label: 'guonei',
        },
        {
          name: '国际',
          label: 'guoji',
        },
        {
          name: '娱乐',
          label: 'yule',
        },
        {
          name: '体育',
          label: 'tiyu',
        },
        {
          name: '军事',
          label: 'junshi',
        },
        {
          name: '科技',
          label: 'keji',
        },
        {
          name: '财经',
          label: 'caijing',
        },
        {
          name: '游戏',
          label: 'youxi',
        },
        {
          name: '汽车',
          label: 'qiche',
        },
        {
          name: '健康',
          label: 'jiankang',
        },
      ],
    }
  },
  methods: {
    toggleSlider: function () {
      this.show = !this.show
    },
    feedback: function () {
      window.location.href = 'https://github.com/Becai/dailyapp'
      // return 'https://github.com/Becai/dailyapp'
    },
    sendType: function(type) {
      this.category = type
      console.log(this.category)
    },
    loadErr: function(data) {
      this.ok = data
    }
  },
}
</script>

<style scoped>
@keyframes slide-enter {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-leave {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
}

.slider-enter-active {
  animation: slide-enter 0.3s both;
}

.slider-leave-active {
  animation: slide-leave 0.3s both;
}
.el-main {
  padding: 0;
}

.app-slider {
  width: 40%;
  background-color: #fff;
}

.app-slider-close {
  text-align: end;
}
.el-icon-close {
  margin-top: 0.3em;
  margin-right: 0.5em;
}
.slider-toggle-button {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.slider-cell {
  border-bottom: thin solid #cfccc9;
  padding: 20px 0;
  font-size: 18px;
  letter-spacing: 10px;
}
.slider-cell:hover {
  background-color: #cdd1d3;
}
.slider-cell:first-of-type {
  border-top: thin solid #cfccc9;
  margin-top: 50px;
}
.feedback-btn {
  margin-top: 100px;
}
.close-btn {
  font-size: 18px;
}
</style>