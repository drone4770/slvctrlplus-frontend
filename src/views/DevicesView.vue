<script setup lang="ts">
import LoadingState from "../components/LoadingState.vue";
import { useDevicesStore } from '../stores/devices.js'
import {storeToRefs} from "pinia";
import EmptyState from "../components/EmptyState.vue";
import DeviceInfo from "../components/DeviceInfo.vue";
import DeviceControl from "../components/device/DeviceControl.vue";

const devicesStore = useDevicesStore();
const { deviceList, devicesLoaded } = storeToRefs(devicesStore);
</script>

<template>
  <v-container v-if="this.devicesLoaded" fluid class="px-8 fill-height">
    <h2 class="text-h4 text-grey-darken-1 py-4">
      Connected devices <v-chip pill color="primary">{{ this.deviceList.length }}</v-chip>
    </h2>
    <v-container v-if="this.deviceList.length > 0" fluid grid-list-md class="px-0">
      <v-row row wrap>
        <v-col cols="12" xs="12" sm="6" md="4" v-for="device in this.deviceList" xs4>
          <DeviceInfo :device="device" />
        </v-col>
      </v-row>
    </v-container>
    <EmptyState v-else msg="Currently no connected devices" icon="mdi-emoticon-sad-outline" />
  </v-container>
  <LoadingState v-else msg="Getting connected devices"/>
</template>
