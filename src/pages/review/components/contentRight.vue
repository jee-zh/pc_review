<template>
  <div class="main-right">
    <div class="video-infos">
      <div class="tips-title">信息</div>
      <ul>
        <li>
          <span class="name">视频ID</span><span>4033471</span>
        </li>
        <li>
          <span class="name">用户ID</span><span>4033471</span>
        </li>
        <li>
          <p class="name">标题</p>
          <p class="text">外星人抓走人类挖出大脑，</p>
        </li>
        <li>
          <p class="name">介绍</p>
          <p class="text">外星人抓走人类挖出大脑，男子依靠超强意志，控制外星生物，真是闻所未闻。</p>
        </li>
        <li>
          <span class="name">时长</span><span>04：56</span>
        </li>
        <li>
          <span class="name">版权</span><span class="match">无版权</span>
        </li>
      </ul>
    </div>
    <div class="handle-area succed">
      <!-- failed  succed -->
      <div class="tips-title">操作</div>
      <div class="handle-list-title">屏蔽理由</div>
      <!-- <el-checkbox-group v-model="checkList"> -->
        <el-row class="handle-list">
          <el-col :span="10"><el-radio v-model="radio" label="1">影响观看效果</el-radio></el-col>
          <el-col :span="14">
            <el-select v-model="watchValue" placeholder="请选择">
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
          <el-col :span="10"><el-radio v-model="radio" label="2">侵权版权</el-radio></el-col>
          <el-col :span="14">
            <el-select v-model="tortValue" placeholder="请选择">
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
          <el-col :span="10"><el-radio v-model="radio" label="3">违反视频管理规范</el-radio></el-col>
          <el-col :span="14">
            <el-select v-model="standardValue" placeholder="请选择">
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
          <el-col :span="10"><el-radio v-model="radio" label="4">低俗内容</el-radio></el-col>
          <el-col :span="14">
            <el-select v-model="lowValue" placeholder="请选择">
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
      <!-- </el-checkbox-group> -->
      <div class="remarks">
        <span>备注信息</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>
      <el-row class="public-area">
        <el-button type="info" plain disabled v-if="batchRelease">批量发布</el-button>
        <el-button type="primary" v-else>批量发布</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContentRight',
  data () {
    return {
      radio: '',
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
      textarea: '',
      batchRelease: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-right
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
      font-size 14px
      color #666
      li
        margin-bottom 16px
      .name
        padding-right 10px
        font-weight 600
        color #333
        font-size 15px
      p.name
        line-height 24px
      p.text
        line-height 20px
      .match
        color #FF5500
  .handle-area
    padding-bottom 16px
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
      padding 0 20px
    .remarks
      margin 20px 0
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
</style>
