<template>
  <div>
    <transition name="slider">
      <AppSlider v-show="show">
        <div class="app-slider-close">
          <i class="el-icon-close" @click="toggleSlider"></i>
        </div>
        <el-row>
          <div>
            侧边栏内容1
          </div>
          <div>
            侧边栏内容2
          </div>
        </el-row>
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
        <el-main>
          <el-container>
            <el-header height="200px" style="margin-bottom:20px">
              <carousel />
            </el-header>
            <el-main>
              <newslayout />
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import search from "../components/AppSearch.vue";
import carousel from "../components/AppCarousel.vue";
import newslayout from "../components/AppNewsLayout.vue";
import AppSlider from "../components/AppSlider.vue";

export default {
  name: "Home",
  components: {
    search,
    carousel,
    newslayout,
    AppSlider,
  },
  data() {
    return {
      input: "",
      show: false,
    };
  },
  methods: {
    toggleSlider: function () {
      this.show = !this.show;
    },
  },
};
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

.app-slider-close{
  text-align: end;
}
.el-icon-close{
  margin-top: .3em;
  margin-right: .5em;
}
.slider-toggle-button{
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
</style>