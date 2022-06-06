<script setup lang="ts">
import type DeviceAirValve from "../../../model/DeviceAirValve";
import {ref} from "vue";

interface Props {
  device: DeviceAirValve
}

const props = defineProps<Props>();

let deviceBusy = false;
let currentSpeed = ref<number|null>(props.device.speed);

const speedChangeHandler = (newSpeed: number): void => {
  if (deviceBusy) {
    return;
  }

  deviceBusy = true;

  fetch(`http://localhost:1337/device/${props.device.deviceId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({speed: newSpeed, duration: 0})
  }).then(response => response.text())
      .then(data => {
        currentSpeed.value = newSpeed;
        deviceBusy = false;
        console.log(data)
      })
      .catch(console.log)
};
</script>

<template>
  <div>
    Speed <input type="range" step="1" min="0" max="100" v-model="currentSpeed" :readonly="deviceBusy" @change="speedChangeHandler(currentSpeed)">%
  </div>
</template>

<style>

</style>
