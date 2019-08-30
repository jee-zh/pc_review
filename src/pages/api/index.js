import ajax from './ajax'
const BASE_URL = 'http://shenheapi.pxtadmin.com'
// 领取任务
export const getUserTask = (params) => ajax(BASE_URL + '/api/screenshot/getTasks', params, 'POST')
// 回收任务
export const deleteUserTask = (params) => ajax(BASE_URL + '/api/screenshot/recoveryTasks', params, 'POST')
// 查询
export const searchUserTask = (params) => ajax(BASE_URL + '/api/screenshot/query', params, 'POST')
// 返回库
export const backStockClick = (params) => ajax(BASE_URL + '/api/screenshot/backStock', params, 'POST')

// 关键词
// export const getKeyWordDescs = (params) => ajax('/api/screenshot/keyWordTips', params, 'POST')
window.getKeywordDescription = function (o, keyId) {
  // 提取关键词
  ajax(BASE_URL + '/api/screenshot/keyWordTips', {keyId}, 'POST').then((res) => {
    if (res.code !== 1) { return }
    if (!document.querySelector('#wordDescPop')) {
      var dom = document.createElement('div')
      dom.id = 'wordDescPop'
      dom.innerHTML = `${res.data}<div class="popper__arrow"></div>`
      dom.style.cssText = 'z-index:20;position:absolute;top:22px;left:-30px;;background:#fff;padding:10px 14px;border-radius:4px;border: 1px solid #ebeef5;color: #606266;line-height: 1.4;text-align: justify;font-size: 14px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);word-break: break-all;min-width:150px;'
      o.appendChild(dom)
      if (o.offsetLeft < 60) {
        dom.style.left = parseInt(dom.style.left) + 20 + 'px'
      }
      if (o.offsetLeft > document.querySelector('.main-right').offsetWidth / 2) {
        dom.style.left = parseInt(dom.style.left) - 60 + 'px'
      }
    }
    for (let k = 0; k < document.querySelectorAll('.keydescspan').length; k++) {
      document.querySelectorAll('.keydescspan')[k].addEventListener('mouseleave', function () {
        document.querySelector('#wordDescPop') && this.removeChild(document.querySelector('#wordDescPop'))
      })
    }
  })
}
// 批量发布
export const handlePublicBatch = (params) => ajax(BASE_URL + '/api/screenshot/batchPublish', params, 'POST')
