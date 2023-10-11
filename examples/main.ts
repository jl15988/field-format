import Vue from 'vue'
import App from './App.vue'
import fieldFormat from "./field-format";

Vue.config.productionTip = false


new Vue({
  // @ts-ignore
  fieldFormat,
  render: h => h(App)
}).$mount('#app')
