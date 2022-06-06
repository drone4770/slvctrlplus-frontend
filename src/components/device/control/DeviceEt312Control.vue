<script setup lang="ts">
import {ref} from "vue";
import type DeviceEt312 from "../../../model/DeviceEt312";

interface Props {
  device: DeviceEt312
}

const props = defineProps<Props>();

let deviceBusy = false;
let adcDisabled = ref<boolean|null>(!props.device.data?.adc ?? null);
let mode = ref<number|null>(props.device.data?.mode ?? null);
let levelA = ref<number|null>(props.device.data?.levelA ?? null);
let levelB = ref<number|null>(props.device.data?.levelB ?? null);

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

const adcChangeHandler = (newAdc: boolean): void => {
  if (deviceBusy) {
    return;
  }

  deviceBusy = true;

  sendData({adc: !newAdc}).then(data => { deviceBusy = false; console.log(data) }).catch(console.log);
}

const levelChangeHandler = (channel: string, level: number): void => {
  if (deviceBusy) {
    return;
  }

  deviceBusy = true;

  const obj: { [key: string]: any } = {};
  obj['level' + channel.toUpperCase()] = level;

  sendData(obj).then(data => { deviceBusy = false; console.log(data) }).catch(console.log);
};

const modeChangeHandler = (newMode: number): void => {
  if (deviceBusy) {
    return;
  }

  deviceBusy = true;

  sendData({ mode: newMode }).then(data => { deviceBusy = false; console.log(data) }).catch(console.log);
};

function sendData(data: {[key: string]: any}): Promise<Response> {

  return fetch(`http://localhost:1337/device/${props.device.deviceId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}
</script>

<template>
  <div v-if="props.device.data.connected === true">
    <dl>
      <dt>Mode</dt>
      <dd><select v-model="mode" @change="modeChangeHandler(mode)">
        <option v-for="(modeName, modeValue) in this.modes" :value="modeValue">{{ modeName }}</option>
      </select></dd>
    </dl>
    <dl>
      <dt><label :for="'device-' + props.device.deviceId + '-adc'">Control levels</label></dt>
      <dd><input type="checkbox" :id="'device-' + props.device.deviceId + '-adc'" v-model="adcDisabled" @change="adcChangeHandler(adcDisabled)"></dd>
    </dl>
    <div class="levels">
      <dl>
        <dt>Channel A</dt>
        <dd><input type="range" min="0" max="99" step="1" v-model="levelA" :disabled="!adcDisabled" @change="levelChangeHandler('A', levelA)"></dd>
      </dl>
      <dl>
        <dt>Channel B</dt>
        <dd><input type="range" min="0" max="99" step="1" v-model="levelB" :disabled="!adcDisabled" @change="levelChangeHandler('B', levelB)"></dd>
      </dl>
    </div>
  </div>
  <span v-else>no MK/ET-312 connected</span>
</template>

<style scoped>
  .levels {

  }
</style>
