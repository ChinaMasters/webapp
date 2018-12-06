<template>
  <div class="ebook">

    <!-- book title -->
    <title-bar/>

    <!-- book footer -->
    <foot-bar
      ref="titleBar" 
      :fontSizeList="fontSizeList" 
      :defaultFontSize="defaultFontSize"
      :defaultTheme="defaultTheme"
      :themeList="themeList"
      @setTheme="setTheme"
      @setFontSize="setFontSize"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      :navigation="navigation"
      @jumpTo="jumpTo"
    />

    <!-- book content -->
    <div class="content">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>

  </div>

</template>

<script>
import Epub from "epubjs";
global.epub = Epub;
import TitleBar from './TitleBar';
import FootBar from './FootBar';
export default {
  name: "HelloWorld",
  components:{
    TitleBar,
    FootBar
  },
  data() {
    return {
      defaultFontSize:16,
      fontSizeList:[
        {fontSize:12},
        {fontSize:14},
        {fontSize:16},
        {fontSize:18},
        {fontSize:20},
        {fontSize:22},
        {fontSize:24},
      ],
      defaultTheme:1,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              'color': '#000', 'background': '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              'color': '#000', 'background': '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              'color': '#fff', 'background': '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              'color': '#000', 'background': 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: {}
    };
  },
  mounted() {
    this.$store.dispatch("book/setFileName", this.$route.params.fileName).then(() => {
      this.initEpub();
    });
  },
  methods: {
    initEpub() {
      //const basrUrl = 'http://www.tao.com/epub/epub/Laws/';
      //const url = basrUrl + this.$route.params.fileName + '.epub';
      //const url = '/static/2015_Book_ProtectingTheRightsOfPeopleWit.epub';
      const url = "https://www.chinamasters.top/epub/2018_Book_Multi-dimensionalApproachesTow.epub";
      this.book = new Epub(url);
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        methods: "default" //微信兼容
      });
      this.rendition.display();
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const time = event.timeStamp - this.touchStartTime;
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        } else if (time < 500 && offsetX < -40) {
          this.nextPage();
        } else {
          this.toggleTitleAndMenu();
        }
        //event.preventDefault()
        event.stopPropagation();
      });
      this.themes = this.rendition.themes;
      this.themes.fontSize(this.defaultFontSize + 'px');
      // 注册主题
      this.registerTheme()
      // 设置默认主题
      this.setTheme(this.defaultTheme)
      // Book对象的钩子函数ready
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        // 生成Locations对象
        return this.book.locations.generate()
      }).then(result => {
        // 保存locations对象
        this.locations = this.book.locations
        // 标记电子书为解析完毕状态
        this.bookAvailable = true
      })
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          //this.refreshLocation()
        });
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          // this.refreshLocation()
        });
      }
    },
    toggleTitleAndMenu(){
      this.$store.dispatch("book/setShowTitleAndMenu").then(() => {
        //console.log('success!');
      });
    },
    setFontSize(fontSize){
      if(this.themes){
        this.themes.fontSize(fontSize + 'px');
      }
      this.defaultFontSize = fontSize;
    },
    // 设置主题
    setTheme(index) {
      this.themes.select(this.themeList[index].name)
      this.defaultTheme = index
    },
    // 注册主题
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    // progress 进度条的数值（0-100）
    onProgressChange(progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    // 根据链接跳转到指定位置
    jumpTo(href) {
      this.rendition.display(href)
      this.toggleTitleAndMenu()
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.ebook {
  position: relative;
  .content {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      display: flex;
      .left {
        flex: 0 0 px2rem(60);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(60);
      }
    }
  }
}
</style>
