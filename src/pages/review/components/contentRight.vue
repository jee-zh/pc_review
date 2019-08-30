<template>
  <div class="main-right">
    <el-scrollbar style="height:100%">
    <div class="video-infos">
      <div class="tips-title">信息</div>
      <ul>
        <li>
          <span class="name">视频ID</span><span>{{videoInfos.videoId}}</span>
        </li>
        <li style="margin-bottom:10px;">
          <span class="name">用户ID</span><span>{{videoInfos.userId}}</span>
        </li>
        <li>
          <p class="name">标题</p>
          <p class="text" v-html="videoInfos.title"></p>
        </li>
        <li v-if="videoInfos.isShowIntro">
          <p class="name">介绍</p>
          <p class="text">{{videoInfos.intro}}</p>
        </li>
        <li>
          <span class="name">时长</span><span>{{videoInfos.playCost}}</span>
        </li>
        <li>
          <span class="name">版权</span><span class="match">{{videoInfos.isHaveRight ? '有版权' : '无版权'}}</span>
        </li>
      </ul>
    </div>
    <div class="handle-area">
      <!-- failed  succed -->
      <div class="tips-title">操作</div>
      <div class="handle-list-title">屏蔽理由</div>
      <el-row class="handle-list">
        <el-col :span="10"><el-radio v-model="radio" label="影响观看效果">影响观看效果</el-radio></el-col>
        <el-col :span="14">
          <el-select v-model="watchValue" placeholder="请选择" v-if="radio === '影响观看效果'">
            <el-option
              v-for="item in watchOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 屏蔽理由end -->
      <el-row class="handle-list">
        <el-col :span="10"><el-radio v-model="radio" label="侵权版权">侵权版权</el-radio></el-col>
        <el-col :span="14">
          <el-select v-model="tortValue" placeholder="请选择" v-if="radio === '侵权版权'">
            <el-option
              v-for="item in tortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 侵权end -->
      <el-row class="handle-list">
        <el-col :span="10"><el-radio v-model="radio" label="违反视频管理规范">违反视频管理规范</el-radio></el-col>
        <el-col :span="14">
          <el-select v-model="standardValue" placeholder="请选择" v-if="radio === '违反视频管理规范'">
            <el-option
              v-for="item in standardOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 侵权end -->
      <el-row class="handle-list">
        <el-col :span="10"><el-radio v-model="radio" label="低俗内容">低俗内容</el-radio></el-col>
        <el-col :span="14">
          <el-select v-model="lowValue" placeholder="请选择" v-if="radio === '低俗内容'">
            <el-option
              v-for="item in lowOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 侵权end -->
      <div class="remarks">
        <span>备注信息</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="remark">
        </el-input>
      </div>
      <el-row class="public-area">
        <el-button type="info" plain disabled v-if="batchRelease">批量发布</el-button>
        <el-button type="primary" v-else @click="handlePublicClick">批量发布</el-button>
      </el-row>
    </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { store, mutations } from '@/store/store'
import { handlePublicBatch } from '../../api/index.js'
import { Loading } from 'element-ui'
export default {
  name: 'ContentRight',
  data () {
    return {
      keyWords: '加载中',
      radio: '0',
      watchValue: '',
      watchOptions: [
        {
          value: '1',
          label: '视频截图无法正常显示'
        }, {
          value: '2',
          label: '视频内容与标题不符'
        }, {
          value: '3',
          label: '视频内容模糊、黑屏或者画面颠倒'
        }, {
          value: '4',
          label: '视频配音故障'
        }, {
          value: '5',
          label: '视频中带有QQ号或盈利性广告'
        }, {
          value: '6',
          label: '视频中含有主流视频网站logo或其他网站痕迹过多'
        }, {
          value: '7',
          label: '视频中含有与视频内容无关的网址'
        }, {
          value: '8',
          label: '标题堆砌关键字'
        }
      ],
      // 侵权
      tortValue: '',
      tortOptions: [
        {
          value: '1',
          label: '侵权影视剧以及动漫'
        }, {
          value: '2',
          label: '遭版权投诉内容'
        }
      ],
      // 视频规范
      standardValue: '',
      standardOptions: [
        {
          value: '1',
          label: '反动'
        }, {
          value: '2',
          label: '色情'
        }, {
          value: '3',
          label: '境外节目'
        }, {
          value: '4',
          label: '视频带违规网址'
        }, {
          value: '5',
          label: '后台无法播放导致前台有安全风险'
        }
      ],
      // 低俗
      lowValue: '',
      lowOptions: [
        {
          value: '1',
          label: '低俗内容'
        }, {
          value: '2',
          label: '挑逗性词汇吸引点击'
        }
      ],
      remark: '',
      publishFlag: true
    }
  },
  computed: {
    // 当前视频的信息
    videoInfos () {
      if (store.videoList.items && store.videoList.items.length) {
        return store.videoList.items[store.index]
      } else {
        return {
          videoId: '',
          userId: '',
          title: '',
          intro: '',
          playCost: '',
          isHaveRight: false
        }
      }
    },
    // 批量发布是否可点
    batchRelease () {
      if (store.videoList.items && store.index === store.videoList.items.length - 1) {
        return false
      } else {
        return true
      }
    },
    // 获取当前视频序号
    currentIndex () {
      return store.index
    }
  },
  watch: {
    radio () {
      var lists = store.videoList
      if (!lists.items) { return }
      // lists.items[store.index].refuseID = this.radio
      lists.items[store.index].refuseItemName = this.radio
      lists.items[store.index].refuseMsg = this.radio === '影响观看效果' ? this.watchValue : (this.radio === '侵权版权' ? this.tortValue : (this.radio === '违反视频管理规范' ? this.standardValue : this.lowValue))
      this.watchValue = ''
      this.tortValue = ''
      this.standardValue = ''
      this.lowValue = ''
      mutations.changeVideoList(lists)
    },
    currentIndex () {
      // 页码变动触发操作内的表单信息
      this.radio = this.videoInfos.refuseItemName || 0
      this.remark = this.videoInfos.remark || ''
      let refuseMsg = this.videoInfos.refuseMsg
      this.watchValue = ''
      this.tortValue = ''
      this.standardValue = ''
      this.lowValue = ''
      if (this.radio === '影响观看效果') {
        this.watchValue = refuseMsg
      } else if (this.radio === '侵权版权') {
        this.tortValue = refuseMsg
      } else if (this.radio === '违反视频管理规范') {
        this.standardValue = refuseMsg
      } else if (this.radio === '低俗内容') {
        this.lowValue = refuseMsg
      }
    },
    // 四个选择框根据选择内容更改拒绝旅游
    watchValue () {
      this.changeValueAuto('refuseMsg', this.watchOptions[this.watchValue - 1].label)
    },
    tortValue () {
      this.changeValueAuto('refuseMsg', this.tortOptions[this.tortValue - 1].label)
    },
    standardValue () {
      this.changeValueAuto('refuseMsg', this.standardOptions[this.standardValue - 1].label)
    },
    lowValue () {
      this.changeValueAuto('refuseMsg', this.lowOptions[this.lowValue - 1].label)
    },
    remark () {
      this.changeValueAuto('remark', this.remark)
    }
  },
  methods: {
    // 封装改变store内具体某个视频的拒绝理由
    changeValueAuto (type, text) {
      var lists = store.videoList
      if (!lists.items) { return }
      lists.items[store.index][type] = text
      // 触发更改
      mutations.changeVideoList(lists)
    },
    // 批量发布
    handlePublicClick () {
      if (!this.publishFlag) { return }
      this.loading = Loading.service({
        text: '正在批量发布中...'
      })
      this.publishFlag = false
      let videoLists = store.videoList.items
      let videoArr = []
      videoLists.forEach((item) => {
        let list = {}
        list.videoId = item.videoId
        list.auditId = item.auditId
        list.remarkOne = item.refuseItemName || ''
        list.remarkTwo = item.refuseMsg || ''
        list.remark = item.remark || ''
        videoArr.push(list)
      })
      console.log(JSON.stringify(videoArr))
      // 批量发布接口
      handlePublicBatch({
        pdata: videoArr
      }).then((res) => {
        console.log(res)
        let type = res.code === 1 ? 'success' : 'error'
        this.$message({
          message: res.msg,
          type,
          duration: 1500
        })
        this.publishFlag = true
        this.loading.close()
      }).catch((e) => {
        console.log(e)
        this.$message({
          message: '发布失败',
          type: 'error',
          duration: 1500
        })
        if (e.code === 1) {
          mutations.changeVideoList({})
        }
        this.publishFlag = true
        this.loading.close()
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-right .video-infos >>> .el-button{
  vertical-align: top
}
.main-right >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.main-right >>> .el-scrollbar__thumb {
  background-color:#333;
  opacity: 0.1
}
.main-right >>> .keydescspan
  position relative
  color #1890FF
.main-right
  height 100%
  .tips-title
    padding 0 18px
    height 48px
    line-height 48px
    font-size 20px
    font-weight 600
    border-bottom 1px solid #e6e6e6
  .video-infos
    margin-bottom 20px
    background-color #fff
    ul
      padding 20px 18px
      font-size 15px
      color #666
      li
        margin-bottom 16px
      .name
        padding-right 10px
        font-weight 600
        color #333
        font-size 15px
      p.name
        line-height 28px
      p.text
        line-height 23px
      .match
        color #FF5500
  .handle-area
    padding-bottom 35px
    background-color #fff
    &.failed
      background-color #F9968F
    &.succed
      background-color #AECE8F
    .handle-list-title
      padding:23px 0 0 20px
      font-size 16px
      font-weight 600
    .handle-list
      margin-top 20px
      display flex
      align-items center
      height 32px
      padding 0 20px
    .remarks
      margin 35px 0 24px 0
      display flex
      align-items flex-start
      padding 0 20px
      span
        display block
        margin-right 10px
        font-size 16px
        font-weight 600
        white-space nowrap
    .public-area
      display flex
      justify-content flex-end
      padding 0 20px
.handle-area >>> .el-input__inner
  height 32px
  line-height 32px
.handle-area >>> .el-input__icon
  line-height 32px
.handle-area >>> .el-textarea__inner
  height 88px
</style>
