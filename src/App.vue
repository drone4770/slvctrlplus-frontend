<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from "vue";
import {useDevicesStore} from "./stores/devices.js";
import {useSocketIO} from "@/plugins/vueSocketIOClient.js";
import {Socket} from "socket.io-client";
import Device from "@/model/Device.js";

let drawer = ref(false);
const menuItems = [
  {
    title: 'Mission Control',
    to: '/mission-control',
    icon: 'mdi-rocket-launch'
  },
  {
    title: 'Automation',
    to: '/automation',
    icon: 'mdi-play'
  },
  {
    title: 'Devices',
    to: '/devices',
    icon: 'mdi-devices'
  },
];

const io = useSocketIO() as Socket;
const devicesStore = useDevicesStore();
devicesStore.init();

io.on('deviceDisconnected', device => devicesStore.removeDevice(device));
io.on('deviceConnected', device => devicesStore.addDevice(device));
</script>

<template>
  <v-app theme="dark" class="mx-auto overflow-hidden">
    <v-app-bar prominent>
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>SlvCtrl+</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="text-grey-darken-3">v0.1.0-alpha</span>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
    >
      <v-list>
        <v-list-item active-color="primary" v-for="item in menuItems" :prepend-icon="item.icon" :title="item.title" :to="item.to" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
@import './assets/base.css';

.v-toolbar-title {
  font-family: Impact, sans-serif;
  color: #eee;
}

</style>
