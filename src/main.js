import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from 'firebase'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created () {
    fb.initializeApp({
      // config firebase
      apiKey: "AIzaSyC2Uvidr8XvmbRNQK3aMYLKAqD1exez81g",
      authDomain: "itc-ads-6108a.firebaseapp.com",
      databaseURL: "https://itc-ads-6108a.firebaseio.com",
      projectId: "itc-ads-6108a",
      storageBucket: "itc-ads-6108a.appspot.com",
      messagingSenderId: "449575624094",
      appId: "1:449575624094:web:20ba93c89f063bbb370a8f"
    });

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    });

    this.$store.dispatch('fetchAds')
  },
  render: h => h(App)
}).$mount('#app')
