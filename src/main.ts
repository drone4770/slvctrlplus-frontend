import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueMaterial from 'vue-material'

import App from './App.vue'
import router from './router'

createApp(App)
    .use(VueMaterial)
    .use(createPinia())
    .use(router)
    .mount('#app')
