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
        <el-select v-model="roadValue" placeholder="请选择">
          <el-option
            v-for="item in roadOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- <el-input v-model="road" placeholder="请编辑" size="mini"></el-input> -->
      </el-col>
      <el-col :span="4" class="input-item">
        <label for>开始时间：</label>
        <el-date-picker
          v-model="startTime"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="4" class="input-item">
        <label for>结束时间：</label>
        <el-date-picker
          v-model="endTime"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="6" class="input-item button-area">
        <el-button type="primary" class="button" @click="getUserTasks($event)">领取任务</el-button>
        <el-button class="button" @click="deleteUserTasks($event)">回收任务</el-button>
        <el-button class="button" @click="searchUserTasks(2, $event)">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/* eslint-disable */
import {
  getUserTask,
  deleteUserTask,
  searchUserTask
} from '../../api/index.js'
import { Loading } from 'element-ui';
import { mutations } from '@/store/store'
export default {
  name: 'ReviewTop',
  data () {
    return {
      videoId: '',
      userId: '',
      roadValue: '11',
      roadOptions: [
        {
          value: '11',
          label: '优先审核通道'
        }, {
          value: '12',
          label: '普通通道'
        },
        {
          value: '100',
          label: '低风险通道（低风险易审视频+小视频）'
        }, {
          value: '101',
          label: '机审通道'
        }
      ],
      startTime: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
      endTime: new Date()
    }
  },
  mounted () {
    
  },
  methods: {
    toDouble (val) {
      return val > 9 ? val : '0' + val
    },
    allowClick () {
      if (this.roadValue === '') {
        this.$message({
          message: '请先选择通道~',
          type: 'error',
          duration: 2000
        })
        return false
      }
      return true
    },
    // 领取任务
    getUserTasks (event) {
      event.target.blur();
      event.preventDefault();
      if(!this.allowClick()){
        return
      }
      this.loading = Loading.service({
        text: '正在领取中,请稍后...'
      })
      let startTime = this.startTime
      let endTime = this.endTime
      if (typeof startTime === 'object') {
        startTime = this.formatime(startTime)
      }
      if (typeof endTime === 'object') {
        endTime = this.formatime(endTime)
      }
      let data = {
        userType: this.roadValue,
        videoId: this.videoId,
        userId: this.userId,
      }
      Object.assign(data, {startTime}, {endTime})
      getUserTask(data).then((res) => {
        let type = res.code === 1 ? 'success' : 'error'
        this.$message({
          message: res.msg,
          type,
          duration: 1500
        })
        this.searchUserTasks(1, this.$event)
        this.loading.close()
      })
    },
    // 回收任务
    deleteUserTasks (event) {
      event.target.blur();
      event.preventDefault();
      if(!this.allowClick()){
        return
      }
      this.loading = Loading.service({
        text: '正在回收中,请稍后...'
      })
      let startTime = this.startTime
      let endTime = this.endTime
      if (typeof startTime === 'object') {
        startTime = this.formatime(startTime)
      }
      if (typeof endTime === 'object') {
        endTime = this.formatime(endTime)
      }
      let data = {
        userType: this.roadValue,
        videoId: this.videoId,
        userId: this.userId,
      }
      Object.assign(data, {startTime}, {endTime})
      deleteUserTask (data).then((res) => {
        let type = res.code === 1 ? 'success' : 'error'
        this.$message({
          message: res.msg,
          type,
          duration: 1500
        })
        // 回收结束调用一次查询任务接口
        this.searchUserTasks(1, this.$event)
        this.loading.close()
      })
    },
    formatime (time) {
      return time.getFullYear() + '-' + this.toDouble(time.getMonth()+1) + '-' + this.toDouble(time.getDate())
    },
    // 查询任务
    searchUserTasks (type, event) {
      if (event) {
        event.target.blur()
        event.preventDefault()
      }
      if(!this.allowClick()){
        return
      }
      // 显示加载
      this.loading = Loading.service({
        text: '正在查询中,请稍后...'
      });
      let startTime = this.startTime
      let endTime = this.endTime
      if (typeof startTime === 'object') {
        startTime = this.formatime(startTime)
      }
      if (typeof endTime === 'object') {
        endTime = this.formatime(endTime)
      }
      let data = {
        userType: this.roadValue,
        videoId: this.videoId,
        userId: this.userId,
      }
      Object.assign(data, {startTime}, {endTime})
      searchUserTask(data).then((res) => {
        if (res.code === 1) {
          if (type !== 1) {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500
            })
          }
          // 存入store
          this.setVideoListStore(res.data)
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1500
          })
        }
        mutations.changePlayerShow(false)
        // 隐藏加载提示
        this.loading.close()
      })
    },
    setVideoListStore (res) {
      mutations.setVideoList(res)
      // 当前序号也归为0
      mutations.changeIndex(0)
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
