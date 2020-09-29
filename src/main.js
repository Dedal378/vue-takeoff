import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from 'firebase/app'
import 'firebase/auth'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created () {
    fb.initializeApp({
      // config firebase
      apiKey: "AIzaSyCMO2S3XiDWYhDywG5kDCCkuKtgmH4irsc",
      authDomain: "takeoff-e88a0.firebaseapp.com",
      databaseURL: "https://takeoff-e88a0.firebaseio.com",
      projectId: "takeoff-e88a0",
      storageBucket: "takeoff-e88a0.appspot.com",
      messagingSenderId: "216533919772",
      appId: "1:216533919772:web:813415ba66546f572797d9",
      measurementId: "G-K6QBYSYM59"
    });

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    });
    this.$store.dispatch('fetchUsersList')
  },
  render: h => h(App)
}).$mount('#app')
