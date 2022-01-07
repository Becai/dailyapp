<template>
  <div class="content">
    <h1>This is an content {{pageId}} page</h1>
  </div>
</template>

<script>
export default {
  name: "Content",
  data:function(){
    return {
      pageId: 0
    }
  },
  created: function(){
    this.pageId = this.$route.params['pageId'];
  }
}
</script>