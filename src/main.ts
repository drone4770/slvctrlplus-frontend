import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { loadFonts } from './plugins/webfontloader'
import type {ThemeDefinition} from "vuetify/dist/vuetify.js";
import {vueSocketIOClient} from "./plugins/vueSocketIOClient.js";
import {createPinia} from "pinia";

loadFonts().catch(console.log)

const dark: ThemeDefinition = {
    dark: true,
    colors: {
        primary: '#00BD7E',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

const pinia = createPinia();

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark,
        }
    },
})

createApp(App)
    .use(pinia)
    .use(vueSocketIOClient, {
        connection: 'http://localhost:1337',
    })
    .use(router)
    .use(vuetify)
    .mount('#app')
