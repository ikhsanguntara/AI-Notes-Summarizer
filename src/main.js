import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'
import { Ripple } from 'vuetify/lib/directives'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'



Vue.config.productionTip = false


Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBCz0rbcX8TzqKmCq2ENjiqdsac6fXtfFQ",
    libraries: "places" // necessary for places input
  }
});
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
new Vue({
  router,
  store,
  vuetify,
  Ripple, 
  render: h => h(App)
}).$mount('#app')
