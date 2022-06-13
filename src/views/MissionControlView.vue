<script setup lang="ts">
import DeviceIcon from "../components/icons/DeviceIcon.vue";
import DeviceControl from "../components/device/DeviceControl.vue";
import LoadingState from "../components/LoadingState.vue";
import {onMounted, ref} from "vue";

let devices = ref(null);

function fetchDevices(): void {
  fetch('http://localhost:1337/devices')
    .then(response => response.json())
    .then(data => { devices.value = data })
    .catch(console.log)
}

onMounted(() => fetchDevices());
</script>

<template>
  <v-container v-if="this.devices" fluid class="px-8">
    <h2 class="text-h4 text-grey-darken-1 py-4">Mission control</h2>
    <v-container fluid grid-list-md class="px-0">
      <v-row row wrap>
        <v-col cols="12" xs="12" sm="6" md="4" v-for="device in this.devices.items" xs4>
          <v-card class="rounded-sm">
            <v-card-title>
              <DeviceIcon :componentName="device.type" class="icon" />
              {{ device.deviceName }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <DeviceControl :device="device" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  <LoadingState v-else msg="Getting devices"/>
</template>

<style scoped>
  .icon {
    width: 1em;
    margin: 0 0.25em 0 0;
  }
</style>
