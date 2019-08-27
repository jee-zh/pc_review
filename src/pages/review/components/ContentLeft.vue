<template>
  <div class="main-content-left">
    <div class="title-panel">
      <!-- <div class="title">播放视频</div> -->
      <el-popover
        placement="right-end"
        width="640"
        height="360"
        @hide="handleVideoPaued"
        trigger="click">
        <Xgplayer :config="config" @player="Player = $event"/>
        <el-button slot="reference" class="title" @click.native="handleVideoClick">播放视频</el-button>
      </el-popover>
      <a href="#" class="back">返回库</a>
    </div>
    <div class="content-details">
      <div class="video-list return-prev">返回上页</div>
      <div class="video-list" v-for="item of 62" :key="item"></div><div class="video-list return-more">查看更多</div>
    </div>
    <div class="bottom-area">
      <div class="btn prev-btn on"></div>
      <div class="btn next-btn on"></div>
      <div class="pages"><em>2</em>/25</div>
    </div>
  </div>
</template>
<script>
import Xgplayer from 'xgplayer-vue'
export default {
  name: 'ContentLeft',
  data () {
    return {
      config: {
        id: 'vs',
        url: '//aliyun36001.baomihua.com/4c57ded6ba47d9a4b2b98b8461e73c4e/5d63c2e5/3878/38779452_7_4e74c8e0c7e07d53257993ecd4718715.mp4',
        poster: '//img04.video.baomihua.com/640_360/38779452.jpg',
        autoplay: true,
        width: 640,
        height: 360
      },
      Player: null,
      clickVideo: true
    }
  },
  components: {
    Xgplayer
  },
  methods: {
    handleVideoClick () {
      this.Player.play()
    },
    handleVideoPaued () {
      this.Player.pause()
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-content-left
  .title-panel
    display flex
    align-items center
    justify-content space-between
    .title
      display flex
      align-items center
      height 44px
      line-height 44px
      font-size 18px
      border 0
      background none
      padding 0
      font-weight bold
      cursor pointer
      &:after
        margin-left 5px
        content ''
        display block
        width 24px
        height 24px
        background url(../../images/ic_bofang.png) no-repeat
        background-size 24px
    .back
      display flex
      align-items center
      font-size 13px
      color #666
      &:before
        margin-right 1px
        content ''
        display block
        width 24px
        height 24px
        background url(../../images/ic_fanhui_hover.png) no-repeat
        background-size 24px
      &:hover
        color #1890ff
      &:hover:before
        background url(../../images/ic_fanhui_normal.png) no-repeat
        background-size 24px
  .content-details
    display flex
    flex-wrap wrap
  .video-list
    margin-right 0.308%
    margin-bottom 0.308%
    width 12.23%
    height 90px
    background-color #DCDCDC
    &:nth-child(8n)
      margin-right 0
  .return-prev,.return-more
    display inline-flex
    background-color #fff
    justify-content center
    align-items center
    border 1px solid #DCDCDC
    box-sizing border-box
    font-size 16px
    color #1890FF
    cursor pointer
    transition all 0.3s
    &:hover
      border-color #1890FF
  .return-prev:before,.return-more:after
      margin-right 4px
      content ''
      display block
      width 12px
      height 10px
      background url(../../images/ic_jiantou_zuo.png) no-repeat
      background-size 12px 10px
  .return-prev:before
    margin-right 4px
  .return-more:after
    margin-left 4px
    transform rotate(180deg)
  .bottom-area
    height 64px
    text-align center
    position relative
    .btn
      display inline-block
      height 64px
      width 64px
      background url(../../images/ic_shangye_normal.png) no-repeat center
      background-size 44px 44px
      &.on
        background url(../../images/ic_shangye_hover.png) no-repeat center
        background-size 44px 44px
        cursor pointer
    .next-btn
      margin-left 15px
      transform rotate(180deg)
      &.on
        transform rotate(180deg)
        background url(../../images/ic_shangye_hover.png) no-repeat center
        background-size 44px 44px
        cursor pointer
    .pages
      position absolute
      top 0
      right 20px
      height 64px
      line-height 64px
      font-size 20px
      em
        color #1890FF
</style>
