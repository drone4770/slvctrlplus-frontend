<script setup lang="ts">
import DeviceIcon from "../components/icons/DeviceIcon.vue";
import LoadingState from "../components/LoadingState.vue";
import { useDevicesStore } from '../stores/devices.js'
import {storeToRefs} from "pinia";
import EmptyState from "../components/EmptyState.vue";

const devicesStore = useDevicesStore();
const { deviceList, devicesLoaded } = storeToRefs(devicesStore);

function formatFwVersion(fwVersion: string): string {
  const bugfix = Number(fwVersion.slice(-2));
  const minor = Number(fwVersion.slice(-4, -2));
  const major = Number(fwVersion.slice(0, -4));

  return `${major}.${minor}.${bugfix}`
}
</script>

<template>
  <v-container v-if="this.devicesLoaded" fluid class="px-8 fill-height">
    <h2 class="text-h4 text-grey-darken-1 py-4">
      Connected devices <v-chip pill color="primary">{{ this.deviceList.length }}</v-chip>
    </h2>
    <v-container v-if="this.deviceList.length > 0" fluid grid-list-md class="px-0">
      <v-row row wrap>
        <v-col cols="12" xs="12" sm="6" md="4" v-for="device in this.deviceList" xs4>
          <v-card class="rounded-sm">
            <v-card-title>
              <DeviceIcon :componentName="device.type" class="icon" />
              {{ device.deviceName }}
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text class="pa-0">
              <v-list>
                <v-list-item>
                  <v-list-item-header>
                    <v-list-item-title>ID</v-list-item-title>
                    <v-list-item-subtitle v-text="device.deviceId"></v-list-item-subtitle>
                  </v-list-item-header>
                </v-list-item>
                <v-list-item>
                  <v-list-item-header>
                    <v-list-item-title>Type</v-list-item-title>
                    <v-list-item-subtitle v-text="device.type"></v-list-item-subtitle>
                  </v-list-item-header>
                </v-list-item>
                <v-list-item>
                  <v-list-item-header>
                    <v-list-item-title>Firmware</v-list-item-title>
                    <v-list-item-subtitle v-text="this.formatFwVersion(device.fwVersion)"></v-list-item-subtitle>
                  </v-list-item-header>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <EmptyState v-else msg="Currently no connected devices" icon="mdi-emoticon-sad-outline" />
  </v-container>
  <LoadingState v-else msg="Getting connected devices"/>
</template>

<style scoped>
.icon {
  width: 1em;
  margin: 0 0.25em 0 0;
}
</style>
