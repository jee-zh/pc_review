<template>
  <div class="preview-content">
    <el-row :gutter="32" style="height:100%">
      <el-col :span="isShow ? 17 : 24" class="preview-left" :style="{'border-right-width': isShow ? '32px' : '0px'}">
        <ContentLeft :isShow="isShow"/>
      </el-col>
      <el-col :span="7" class="preview-right" v-if="isShow">
        <ContentRight/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ContentLeft from './ContentLeft'
import ContentRight from './ContentRight'
import { store } from '@/store/store'
export default {
  name: 'PreviewContent',
  components: {
    ContentLeft,
    ContentRight
  },
  computed: {
    // 操作区域是否可见
    isShow () {
      if (store.videoList.items && store.videoList.items.length) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="stylus">
.preview-content
  position absolute
  left 0
  right 0
  bottom 0
  top 64px
  padding:20px 40px 0 40px
  overflow hidden
.preview-left
  height 100%
  border-right 32px solid #f3f3f4
  padding 0 20px !important
  background-color #fff
.preview-right
  height 100%
  padding 0 !important
@media screen and (max-width:1400px){
  .preview-content{
    padding:20px 4px 0 4px
  }
  .preview-left{
    border-right 20px solid #f3f3f4
  }
}
</style>
