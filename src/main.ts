import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGtag from 'vue-gtag-next'
import { key, store } from './store'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(store, key)
app.use(router)
app.use(VueGtag, {
  property: {
    id: 'G-27Z7FH09S0',
  },
})

app.mount('#app')
