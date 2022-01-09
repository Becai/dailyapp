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
import Bus from '../router/Bus.js'

export default {
  data() {
    return {
      swipeItems: [],
    };
  },
  methods: {},
  mounted: function () {
    Bus.$on('msgToCarousel', (data) => {
      this.swipeItems = data
    })
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