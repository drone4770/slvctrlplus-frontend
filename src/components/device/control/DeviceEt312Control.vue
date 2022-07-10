<script setup lang="ts">
import {reactive} from "vue";
import type DeviceEt312 from "../../../model/DeviceEt312";
import {useSocketIO} from "../../../plugins/vueSocketIOClient.js";
import type {Socket} from "socket.io-client";

interface Props {
  device: DeviceEt312
}

const props = defineProps<Props>();
const io = useSocketIO() as Socket;

const device = reactive<DeviceEt312>(props.device);

const modes: { [key: number]: string } = {
  0x76: 'Waves',
  0x77: 'Stroke',
  0x78: 'Climb',
  0x79: 'Combo',
  0x7A: 'Intense',
  0x7B: 'Rhythm',
  0x7C: 'Audio 1',
  0x7D: 'Audio 2',
  0x7E: 'Audio 3',
  0x7F: 'Split',
  0x80: 'Random 1',
  0x81: 'Random 2',
  0x82: 'Toggle',
  0x83: 'Orgasm',
  0x84: 'Torment',
  0x85: 'Phase 1',
  0x86: 'Phase 2',
  0x87: 'Phase 3',
  0x88: 'User 1',
  0x89: 'User 2',
  0x8A: 'User 3',
  0x8B: 'User 4',
  0x8C: 'User 5',
};

const selectModes = [];

for (const modeKey in modes) {
  selectModes.push({value: +modeKey, title: modes[modeKey]});
}

const adcChangeHandler = (newAdc: boolean): void => sendData({adc: newAdc});

const levelChangeHandler = (channel: string, level: number): void => {
  const obj: { [key: string]: any } = {};
  obj['level' + channel.toUpperCase()] = level;

  sendData(obj);
};

const levelChangeHandlerA = (level: number): void => levelChangeHandler('A', level);
const levelChangeHandlerB = (level: number): void => levelChangeHandler('B', level);

const modeChangeHandler = (newMode: number): void => {
  sendData({ mode: newMode });
};

function sendData(data: {[key: string]: any}): void {
  props.device.receiveUpdates = false;
  io.emit('deviceUpdate', {
    deviceId: props.device.deviceId,
    data: data
  });
  setTimeout(() => props.device.receiveUpdates = true, 500);
}
</script>

<template>
  <div v-if="device.data.connected === true">
    <v-select
        v-model="device.data.mode"
        :items="selectModes"
        label="Mode"
        hide-details
        @update:modelValue="modeChangeHandler"
    ></v-select>
    <v-checkbox
        v-model="device.data.adc"
        :true-value="false"
        :false-value="true"
        label="Control levels"
        color="primary"
        hide-details=true
        class="pa-0 ma-0"
        @update:modelValue="adcChangeHandler"
    ></v-checkbox>
    <div class="levels">
      <dl>
        <dt><label>Level A</label></dt>
        <dd>
          <v-slider
              v-model="device.data.levelA"
              @update:modelValue="levelChangeHandlerA"
              max="99"
              min="0"
              step="1"
              label="Level A"
              color="primary"
              hide-details
              :disabled="device.data.adc"
          >
            <template v-slot:append>
              <v-text-field
                  v-model="device.data.levelA"
                  @update:modelValue="levelChangeHandlerA"
                  hide-details
                  single-line
                  max="99"
                  min="0"
                  density="compact"
                  variant="outlined"
                  type="number"
                  style="width: 80px"
                  :disabled="device.data.adc"
              ></v-text-field>
            </template>
          </v-slider>
        </dd>
      </dl>
      <dl>
        <dt><label>Level B</label></dt>
        <dd>
          <v-slider
              v-model="device.data.levelB"
              @update:modelValue="levelChangeHandlerB"
              max="99"
              min="0"
              step="1"
              label="Level B"
              color="primary"
              hide-details
              :disabled="device.data.adc"
          >
            <template v-slot:append>
              <v-text-field
                  v-model="device.data.levelB"
                  @update:modelValue="levelChangeHandlerB"
                  hide-details
                  single-line
                  max="99"
                  min="0"
                  density="compact"
                  variant="outlined"
                  type="number"
                  style="width: 80px"
                  :disabled="device.data.adc"
              ></v-text-field>
            </template>
          </v-slider>
        </dd>
      </dl>
    </div>
  </div>
  <v-alert v-else icon="mdi-alert" color="grey-darken-3" class="text-grey-darken-4" dark>No MK/ET-312 connected</v-alert>
</template>

<style scoped>

</style>
