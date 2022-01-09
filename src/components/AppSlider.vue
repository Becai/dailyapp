<template>
  <div class="app-slider">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppSlider',
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.app-slider {
  text-align: center;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 100;
}
</style>