// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/reset.css'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(ElementUI)
Vue.use(Viewer)
Viewer.setDefaults({
  'button': false,
  'navbar': true,
  'rotatable': false,
  'transition': false,
  'scalable': false,
  'zoomable': false
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
