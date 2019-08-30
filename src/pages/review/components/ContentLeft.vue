<template>
  <div class="main-content-left">
    <div class="title-panel" v-if="isShow">
      <!-- <div class="title">播放视频</div> -->
      <el-popover
        placement="right-end"
        width="580"
        height="450"
        trigger="click"
        >
        <iframe :src="videoUrl" frameborder="0" scrolling="no" width="580" height="450"></iframe>
        <el-button slot="reference" class="title">播放视频</el-button>
      </el-popover>
      <a href="javascript:void(0)" class="back" @click="returnBack">返回库</a>
    </div>
    <div class="content-details clearfix" v-if="videoBoxData.items && videoBoxData.items[index]" ref="details">
      <el-scrollbar style="height:100%">
        <!-- <div class="video-list return-prev">返回上页</div> -->
        <viewer :images="imgArrays">
          <div class="video-list" v-for="(item,k) of imgArrays" :key="item" v-if="k<imgArrayIndex">
            <img :src="item">
          </div>
        </viewer>
        <div class="video-list return-more" v-if="imgArrays.length>=(imgArrayIndex+1)" @click="viewMore">查看更多</div>
      </el-scrollbar>
    </div>
    <div class="bottom-area" v-if="isShow">
      <div class="btn prev-btn" :class="{on: index > 0}" @click="handlePageClick(-1)" @keyup.left="handlePageClick(-1)"></div>
      <div class="btn next-btn" :class="{on: index < videoBoxData.totalCount-1}"  @click="handlePageClick(1)"></div>
      <div class="pages" v-if="videoBoxData.items"><em>{{videoBoxData.items.length>0 ? (index+1) : 0}}</em>/{{videoBoxData.items.length ? videoBoxData.items.length : 0}}</div>
    </div>
    <div class="blank-page" v-if="!(videoBoxData.items && videoBoxData.items[index])">
      <img src="../../images/kong_icon.png" width="300" class="blank-image">
      <p class="blank-infos">先领任务再查询</p>
    </div>
  </div>
</template>
<script>
import { store, mutations } from '@/store/store'
import { backStockClick } from '../../api/index.js'
import { Loading } from 'element-ui'
export default {
  name: 'ContentLeft',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
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
      clickVideo: true,
      imgArrayIndex: 63,
      videoUrl: ''
    }
  },
  computed: {
    videoBoxData () {
      return store.videoList
    },
    index () {
      return store.index
    },
    imgArrays () {
      this.setVideoUrl()
      return this.videoBoxData.items[this.index].imgUrls
    }
  },
  mounted () {
    document.onkeydown = () => {
      if (this.isShow) {
        let key = window.event.keyCode
        if (key === 37) {
          this.handlePageClick(-1)
        } else if (key === 39) {
          this.handlePageClick(1)
        }
      }
    }
  },
  methods: {
    // 切换页码
    handlePageClick (flag) {
      if (flag === -1) {
        if (this.index > 0) {
          mutations.changeIndex(store.index - 1)
        }
      } else {
        if (this.index < this.videoBoxData.totalCount - 1) {
          mutations.changeIndex(store.index + 1)
        }
      }
      this.$emit('changeRadio')
      this.imgArrayIndex = 63
      this.setVideoUrl()
    },
    // 设置视频嵌套地址
    setVideoUrl () {
      this.videoUrl = `http://shenhe.pxtadmin.com/Aspx/ComVideoPlayer.aspx?videoid=${this.videoBoxData.items[this.index].videoId}`
    },
    // 查看更多
    viewMore () {
      this.imgArrayIndex = this.videoBoxData.items[this.index].imgUrls.length
      this.$refs.details.style.height = 'auto'
    },
    // 返回库
    returnBack () {
      let {auditId, videoId} = this.videoBoxData.items[this.index]
      this.loading = Loading.service({
        text: '加载中~'
      })
      backStockClick({
        auditId,
        videoId
      }).then((res) => {
        if (res.code === 1) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500
          })
          // 当前视频删除
          mutations.deleteVideo()
          this.loading.close()
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-content-left >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.main-content-left >>> .el-scrollbar__thumb {
  background-color:#333;
  opacity: 0.1
}
.main-content-left
  position relative
  height 100%
  .title-panel
    position absolute
    left 0
    top 0
    right 0
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
    position absolute
    left 0
    right 0
    top 44px
    bottom 64px
    overflow-y auto
    overflow-x hidden
  .video-list
    float left
    margin-right 0.308%
    margin-bottom 0.308%
    display inline-block
    vertical-align top
    width 12.22%
    height 90px
    background-color #DCDCDC
    font-size 0
    cursor pointer
    img
      display block
      width 100%
      height 100%
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
    position absolute
    left 0
    bottom 0
    right 0
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
  .blank-page
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -60%)
    text-align center
    .blank-image
      display inline-block
    .blank-infos
      line-height 1
      padding-top 18px
      font-size 18px
      color #999
</style>
