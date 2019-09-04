import Vue from 'vue'
export const store = Vue.observable({
  videoList: {},
  index: 0,
  playerVisible: false
})
export const mutations = {
  // 视频列表
  setVideoList (res) {
    store.videoList = res
  },
  // 改变视频序号
  changeIndex (num) {
    store.index = num
  },
  // 回库成功，当前视频删除
  deleteVideo () {
    store.videoList.items.splice(store.index, 1)
    if (store.index > 0) {
      store.index--
    }
  },
  changeVideoList (res) {
    store.videoList = res
  },
  changePlayerShow (res) {
    store.playerVisible = res
  }
}
