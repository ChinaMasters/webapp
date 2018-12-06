<template>
  <div class="FootBar">
    <!--底部菜单-->
    <transition name="slide-up">
      <div class="menue" v-show="showTitleAndMenu">
        <div class="icon-wrapper icon"><!-- dsdalfhsaldkjfhlhadsjkhds,j -->
          <span class="el-myicon-menu"></span>
        </div>
        <div class="icon-wrapper icon">
          <span class="el-myicon-classify"></span>
        </div>
        <div class="icon-wrapper icon" @click="showTheme">
          <span class="el-myicon-xianshidaan"></span>
        </div>
        <div class="icon-wrapper icon" @click="showSFont">A</div>
      </div>
    </transition>

    <div class="setting" v-show="tag">

      <!-- 字体设置 -->
      <div class="setting-font" v-show="showSettingFont && showTitleAndMenu">
        <p class="font-samll" :style="{fontSize:fontSizeList[0].fontSize + 'px'}">A</p>
        <div class="font-option" v-for="(item,index) in fontSizeList" :key="'i' + index">
          <div class="line" :class="index == 0 ? 'border-none' : ''"></div>
          <div class="point-wrap" @click="setFontSize(item.fontSize)">
            <div class="point" v-show="defaultFontSize==item.fontSize">
              <div class="dot"></div>
            </div>
          </div>
          <div class="line" :class="index == fontSizeList.length-1 ? 'border-none' : ''"></div>
        </div>
        <p
          class="font-large"
          :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize + 'px'}"
        >A</p>
      </div>

      <!-- 主题设置 -->
      <div class="setting-theme" v-show="showSettingTheme && showTitleAndMenu">
        <div class="them-wrap" v-for="(item,index) in themeList" :key="index+'o'" @click="setTheme(index)">
          <div class="preview" :style="{background:item.style.body.background}" :class="index==0 ? 'border' : ''"></div>
          <div class="text" :class="index==defaultTheme ?'active':''">{{item.name}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    fontSizeList: {
      type: Array,
      default: []
    },
    defaultFontSize: {
      type: Number,
      default: 16
    },
    defaultTheme: Number,
    themeList: Array
  },
  data() {
    return {
      tag:false,
      showSettingFont: false,
      showSettingTheme: false
    };
  },
  methods: {
    setFontSize(fontSize) {
      this.$emit("setFontSize", fontSize);
    },
    setTheme(index){
      this.$emit('setTheme', index)
    },
    showTheme(){
      this.showSettingFont = false
      this.tag = true
      this.showSettingTheme = true
    },
    showSFont(){
      this.showSettingTheme = false
      this.tag = true
      this.showSettingFont = true
    }
  },
  computed: {
    showTitleAndMenu() {
      return this.$store.state.book.showTitleAndMenu;
    }
  },
  watch: {
    showTitleAndMenu(val) {
      if(!val){
        this.showSettingTheme = false
        this.tag = false
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.FootBar {
  .menue {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(40);
    z-index: 110;
    background: white;
    box-shadow: 0 px2rem(-4) px2rem(4) rgba($color: #000000, $alpha: 0.15);
    display: flex;
    .icon-wrapper {
      flex: 1;
      @include center;
    }
  }
  .setting {
    position: absolute;
    bottom: px2rem(40);
    left: 0;
    width: 100%;
    height: px2rem(50);
    z-index: 110;
    background: white;
    box-shadow: 0 px2rem(-4) px2rem(4) rgba($color: #000000, $alpha: 0.15);
    .setting-font {
      display: flex;
      height: 100%;
      .font-samll {
        flex: 0 0 px2rem(25);
        @include center;
      }
      .font-large {
        flex: 0 0 px2rem(35);
        @include center;
        justify-content: flex-start;
      }
      .font-option {
        flex: 1;
        @include center;
        display: flex;
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #ccc;
          &.border-none {
            border: none;
          }
        }
        .point-wrap {
          flex: 0 0 0;
          width: 0;
          border-left: px2rem(1) solid #ccc;
          height: px2rem(7);
          empty-cells: show;
          position: relative;
          .point {
            position: absolute;
            top: px2rem(-6);
            left: px2rem(-20);
            width: px2rem(20);
            height: px2rem(20);
            background: white;
            border-radius: 50%;
            border: px2rem(1) solid #ccc;
            box-shadow: 0 px2rem(4) px2rem(4)
              rgba($color: #000000, $alpha: 0.15);
            @include center;
            .dot {
              width: px2rem(6);
              height: px2rem(6);
              background: black;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .setting-theme{
      display: flex;
      height: 100%;
      .them-wrap{
        height: 100%;
        flex:1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview{
         height: px2rem(30); 
         margin-top:px2rem(5);
          &.border{
            border:px2rem(1) solid #ccc;
          }
        }
        .text{
          text-align: center;
          font-size: 14px;
          color:#ccc;
          height: px2rem(10);
          padding-top:px2rem(5);
          &.active{
            color:#333;
          }
        }
      }
      
    }
  }
}
</style>

