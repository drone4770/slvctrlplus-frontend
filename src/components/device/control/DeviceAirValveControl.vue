<script setup lang="ts">
import type DeviceAirValve from "../../../model/DeviceAirValve";
import {ref} from "vue";

interface Props {
  device: DeviceAirValve
}

const props = defineProps<Props>();

let deviceBusy = false;
let currentFlow = ref<number|null>(props.device.flow);

const flowChangeHandler = (newFlow: number): void => {
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
    body: JSON.stringify({flow: newFlow, duration: 0})
  }).then(response => response.text())
      .then(data => {
        currentFlow.value = newFlow;
        deviceBusy = false;
        console.log(data)
      })
      .catch(console.log)
};
</script>

<template>
  <div>
    Flow <input type="number" step="5" min="0" max="100" v-model="currentFlow" :readonly="deviceBusy" @change="flowChangeHandler(currentFlow)">%
  </div>
  <div>
    <button @click="flowChangeHandler(100)">open</button>
    <button @click="flowChangeHandler(0)">close</button>
  </div>
</template>

<style>

</style>
