<template>
  <div id="app">
    <ebook/> 
  </div>
</template>

<script>

import ebook from '@/views/ebook/index.vue'
export default {
  name: "App",
  components: {
    ebook
  },
  data () {
    return {
      
    }
  },
  mounted () {
    // this.$store.dispatch('setTest',10).then(()=>{
    //   console.log(this.$store.state.book.test)
    // })
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/css/global.scss";
.icon-add {
  background: yellow;
  font-size: px2rem(100);
}
</style>

