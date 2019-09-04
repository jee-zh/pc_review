<template>
  <div>
    <ReviewTop/>
    <ReviewContent/>
  </div>
</template>
<script>
import ReviewTop from './components/Top'
import ReviewContent from './components/Content'
import axios from 'axios'
export default {
  name: 'Review',
  components: {
    ReviewTop,
    ReviewContent
  },
  created () {
    // this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      axios.post('http://shenheapi.pxtadmin.com/api/screenshot/testOper', {
        withCredentials: true
      }, {}).then((res) => {
        this.$message({
          message: '请登录',
          type: 'error',
          duration: 1500
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
div
  font-size:20px;
</style>
