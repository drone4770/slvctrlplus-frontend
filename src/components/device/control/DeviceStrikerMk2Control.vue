<script setup lang="ts">
import {ref,watch} from "vue";
import type DeviceStrikerMk2 from "../../../model/DeviceStrikerMk2.js";
import type {Socket} from "socket.io-client";
import {useSocketIO} from "../../../plugins/vueSocketIOClient.js";

interface Props {
  device: DeviceStrikerMk2
}

const props = defineProps<Props>();
const io = useSocketIO() as Socket;

let currentSpeed = ref<number|null>(props.device.data?.speed ?? null);

watch(
    () => currentSpeed.value,
    (speed, prevSpeed) => speedChangeHandler(speed ?? 0)
)

const speedChangeHandler = (newSpeed: number): void => {

  io.emit('deviceUpdate', {
    deviceId: props.device.deviceId,
    data: {
      speed: newSpeed, duration: 0
    }
  });
};
</script>

<template>
  <dl>
    <dt><label>Speed</label></dt>
    <dd>
      <v-slider
          v-model="currentSpeed"
          max="100"
          min="0"
          step="1"
          label="Speed"
          hide-details
          color="primary"
      >
        <template v-slot:append>
          <v-text-field
              v-model="currentSpeed"
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
</template>

<style>

</style>
