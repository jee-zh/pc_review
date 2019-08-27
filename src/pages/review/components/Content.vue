<template>
  <div class="preview-content">
    <el-row :gutter="32">
      <el-col :span="17" class="preview-left">
        <ContentLeft/>
      </el-col>
      <el-col :span="7" class="preview-right">
        <ContentRight/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ContentLeft from './ContentLeft'
import ContentRight from './ContentRight'
export default {
  name: 'PreviewContent',
  components: {
    ContentLeft,
    ContentRight
  }
}
</script>
<style lang="stylus">
.preview-content
  padding:20px 40px
.preview-left
  border-right 32px solid #f3f3f4
  padding 0 20px !important
  background-color #fff
.preview-right
  padding 0 !important
@media screen and (max-width:1400px){
  .preview-content{
    padding:20px 4px
  }
  .preview-left{
    border-right 20px solid #f3f3f4
  }
}
</style>
