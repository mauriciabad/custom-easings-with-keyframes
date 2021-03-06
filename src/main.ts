import { createApp } from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import { store, key } from '@/store'
import VueGtag from 'vue-gtag-next'

createApp(App)
  .use(store, key)
  .use(router)
  .use(VueGtag, {
    property: {
      id: 'G-27Z7FH09S0'
    }
  })
  .mount('#app')
