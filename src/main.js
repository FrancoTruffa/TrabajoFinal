import Vue from 'vue'
import Vuetify from 'vuetify'
import VueSession from 'vue-session'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/dist/vuetify.min.css'
import fbase from '@/api/firebaseConfig'
import firebase, { firestore } from 'firebase'
import VueQRCodeComponent from 'vue-qrcode-component'

Vue.component('qr-code', VueQRCodeComponent)

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme:
  {
    primary: '#1565C0',
    secondary: '#9e1027',
    accent: '#fbee38',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

Vue.use(VueResource)



Vue.http.interceptors.push((request, next) => {
  //request.headers.set('Authorization', access)
  request.headers.set('Accept', 'application/json')
  next()
})

Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('setUser', user)          
      }
    })
  }
}).$mount('#app')
