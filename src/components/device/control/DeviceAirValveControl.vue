<script setup lang="ts">
import type DeviceAirValve from "../../../model/DeviceAirValve";
import {ref, watch} from "vue";
import {useSocketIO} from "../../../plugins/vueSocketIOClient.js";
import type {Socket} from "socket.io-client";

interface Props {
  device: DeviceAirValve
}

const props = defineProps<Props>();
const io = useSocketIO() as Socket;

let currentFlow = ref<number|null>(props.device.flow);

watch(
    () => currentFlow.value,
    flow => flowChangeHandler(flow ?? 100)
);

const flowChangeHandler = (newFlow: number): void => {
  io.emit('deviceUpdate', {
    deviceId: props.device.deviceId,
    data: {flow: newFlow, duration: 0}
  });
};

const flowButtonChangeHandler = (newFlow: number): void => {
  currentFlow.value = newFlow;
};
</script>

<template>
  <dl>
    <dt><label>Flow</label></dt>
    <dd>
      <v-slider
          v-model="currentFlow"
          max="100"
          min="0"
          step="1"
          label="Speed"
          hide-details
          color="primary"
          class="ma-0 ml-2"
      >
        <template v-slot:append>
          <v-text-field
              v-model="currentFlow"
              hide-details
              single-line
              max="100"
              min="0"
              density="compact"
              variant="outlined"
              type="number"
              style="width: 80px"
          ></v-text-field>
        </template>
      </v-slider>
    </dd>
  </dl>
  <v-divider class="my-4"></v-divider>
  <div>
    <v-btn color="grey-darken-3" class="mr-4" @click="flowButtonChangeHandler(100)">open</v-btn>
    <v-btn color="grey-darken-3" @click="flowButtonChangeHandler(0)">close</v-btn>
  </div>
</template>

<style>

</style>
