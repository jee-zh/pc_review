<template>
  <div class="review-top">
    <el-row :gutter="30">
      <el-col :span="3" class="input-item">
        <label for>视频ID：</label>
        <el-input v-model="videoId" placeholder="请输入" size="mini"></el-input>
      </el-col>
      <el-col :span="3" class="input-item">
        <label for>用户ID：</label>
        <el-input v-model="userId" placeholder="请输入" size="mini"></el-input>
      </el-col>
      <el-col :span="4" class="input-item">
        <label for>通道：</label>
        <el-input v-model="road" placeholder="请编辑" size="mini"></el-input>
      </el-col>
      <el-col :span="4" class="input-item">
        <label for>开始时间：</label>
        <el-date-picker
          v-model="startTime"
          align="right"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="4" class="input-item">
        <label for>结束时间：</label>
        <el-date-picker
          v-model="endTime"
          align="right"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="6" class="input-item button-area">
        <el-button type="primary" class="button">领取任务</el-button>
        <el-button class="button">回收任务</el-button>
        <el-button class="button">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'ReviewTop',
  data () {
    return {
      videoId: '',
      userId: '',
      road: '',
      startTime: '',
      endTime: ''
    }
  }
}
</script>
<style lang="stylus">
.review-top
  height 64px
  padding 15px 20px 0 20px
  box-sizing border-box
  background #fff
  .input-item
    display flex
    align-items center
    font-size 13px
    label
      margin-right 8px
      white-space nowrap
    input
      display inline-block
      height 32px
    .button
      height 32px
      line-height 32px
      padding:0 16px;
    .el-input__icon
      line-height 32px
    &.button-area
      justify-content flex-end
</style>
