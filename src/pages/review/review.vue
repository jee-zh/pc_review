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
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      axios.post('/api/screenshot/testOper', {
        withCredentials: true
      }).then((res) => {
        console.log(res.data)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
div
  font-size:20px;
</style>
