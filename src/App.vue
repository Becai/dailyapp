<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
  margin: 0;
}

@keyframes slide-left {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-right {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
}

.slider-left-enter-active {
  animation: slide-enter 0.3s both;
}

.slider-right-leave-active {
  animation: slide-leave 0.3s both;
}
</style>
