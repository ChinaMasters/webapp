<template>
  <transition name="slide-down">
    <div class="TitleBar" v-show="showTitleAndMenu">
      <div class="left">
        <span class="el-myicon-left icon"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper icon">
          <span class="el-myicon-icon-18"></span>
        </div>
        <div class="icon-wrapper icon">
          <span class="el-myicon-wode"></span>
        </div>
        <div class="icon-wrapper icon">
          <span class="el-myicon-share"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  computed: {
    showTitleAndMenu() {
      return this.$store.state.book.showTitleAndMenu;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.TitleBar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: px2rem(40);
  z-index: 101;
  background: white;
  box-shadow: 0 px2rem(4) px2rem(4) rgba($color: #000000, $alpha: 0.15);
  display: flex;
  .left {
    flex: 0 0 px2rem(30);
    cursor: pointer;
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      @include center;
      flex: 0 0 px2rem(40);
    }
  }
}
</style>

