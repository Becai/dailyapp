<template>
  <div>
    <transition name="slider">
      <div class="slider" v-show="show">ddd</div>
    </transition>
    <el-button>button</el-button>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      show: true,
    };
  },
};
</script>

<style scoped>
.slider {
  width: 200px;
  background-color: aqua;
}

.slider-enter-active {
  width: 200px;
  transition: all 0.3s;
}

.slider-leave-active {
  width: 0px;
  transition: all 0.3s;
}
</style>