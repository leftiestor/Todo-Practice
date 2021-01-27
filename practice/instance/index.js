import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>This is content {{one}} </div>',
  data: {
    one: 'show me yes!'
  }
})
app.$mount('#root')
