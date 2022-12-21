import 'reflect-metadata';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { loadFonts } from './plugins/webfontloader'
import {vueSocketIOClient} from "./plugins/vueSocketIOClient.js";
import {createPinia} from "pinia";
import {vuetify} from "./plugins/vuetify.js";
import {classTransformer} from "./plugins/classTransformer.js";

loadFonts().catch(console.log)

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(vueSocketIOClient, {
        connection: 'http://localhost:1337',
    })
    .use(classTransformer)
    .use(router)
    .use(vuetify)
    .mount('#app')
