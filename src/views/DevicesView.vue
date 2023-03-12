<script setup lang="ts">
import LoadingState from "../components/LoadingState.vue";
import { useDevicesStore } from "../stores/devices.js";
import { storeToRefs } from "pinia";
import EmptyState from "../components/EmptyState.vue";
import DeviceInfo from "../components/DeviceInfo.vue";
import {ref} from "vue";

const devicesStore = useDevicesStore();
const { deviceList, devicesLoaded } = storeToRefs(devicesStore);

const displayAddDeviceDialog = ref(false);
</script>

<template>
  <v-container v-if="devicesLoaded" fluid class="px-8 fill-height">
    <v-row justify="space-between" class="py-4">
      <h2 class="text-h4 text-grey-darken-1">
        Connected devices
        <v-chip pill color="primary">{{ deviceList.length }}</v-chip>
      </h2>
      <v-btn color="primary" @click="displayAddDeviceDialog = true">
        <v-icon icon="mdi-plus" />
        add device
      </v-btn>
    </v-row>
    <v-container
      v-if="deviceList.length > 0"
      fluid
      grid-list-md
      class="px-0 fill-height"
    >
      <v-row row wrap class="fill-height">
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          :key="device.deviceId"
          v-for="device in deviceList"
          xs4
        >
          <DeviceInfo :device="device" />
        </v-col>
      </v-row>
    </v-container>
    <EmptyState
      v-else
      msg="Currently no connected devices"
      icon="mdi-emoticon-sad-outline"
    />
  </v-container>
  <LoadingState v-else msg="Getting connected devices" />

  <v-dialog v-model="displayAddDeviceDialog" width="auto">
    <v-card id="add-device-dialog">
      <v-card-title class="text-h5 ma-3 mb-0">Add device</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item value="widgets">
            <template v-slot:prepend>
              <v-icon icon="mdi-monitor"></v-icon>
            </template>
            <v-list-item-title>Fluffy chewbacca</v-list-item-title>

            <v-list-item-subtitle>
              Virtual display
            </v-list-item-subtitle>
            <template v-slot:append="{ isActive }">
              <v-list-item-action end>
                <v-switch :model-value="isActive" hide-details color="primary" inset></v-switch>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="displayAddDeviceDialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
#add-device-dialog {
  max-width: 100%;
  width: 640px;
}
</style>
