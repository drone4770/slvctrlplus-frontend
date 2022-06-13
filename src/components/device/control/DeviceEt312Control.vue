<script setup lang="ts">
import {ref, watch} from "vue";
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

watch(() => mode.value, mode => modeChangeHandler(mode ?? 0x76))
watch(() => levelA.value, levelA => levelChangeHandler('A', levelA ?? 0))
watch(() => levelB.value, levelB => levelChangeHandler('B', levelB ?? 0))
watch(() => adcDisabled.value, adcDisabled => adcChangeHandler( adcDisabled ?? false))

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

const adcChangeHandler = (newAdc: boolean): void => {
  levelA.value = 0;
  levelB.value = 0;

  sendData({adc: !newAdc}).then(data => { deviceBusy = false; console.log(data) }).catch(console.log);
}

const levelChangeHandler = (channel: string, level: number): void => {
  const obj: { [key: string]: any } = {};
  obj['level' + channel.toUpperCase()] = level;

  sendData(obj).then(data => { deviceBusy = false; console.log(data) }).catch(console.log);
};

const modeChangeHandler = (newMode: number): void => {
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
    <v-select
        v-model="mode"
        :items="selectModes"
        label="Mode"
        hide-details
    ></v-select>
    <v-checkbox
        v-model="adcDisabled"
        label="Control levels"
        color="primary"
        hide-details=true
        class="pa-0 ma-0"
    ></v-checkbox>
    <div class="levels">
      <dl>
        <dt><label>Level A</label></dt>
        <dd>
          <v-slider
              v-model="levelA"
              max="99"
              min="0"
              step="1"
              label="Level A"
              color="primary"
              hide-details
              :disabled="!adcDisabled"
          >
            <template v-slot:append>
              <v-text-field
                  v-model="levelA"
                  hide-details
                  single-line
                  max="99"
                  min="0"
                  density="compact"
                  variant="outlined"
                  type="number"
                  style="width: 80px"
                  :disabled="!adcDisabled"
              ></v-text-field>
            </template>
          </v-slider>
        </dd>
      </dl>
      <dl>
        <dt><label>Level B</label></dt>
        <dd>
          <v-slider
              v-model="levelB"
              max="99"
              min="0"
              step="1"
              label="Level B"
              color="primary"
              hide-details
              :disabled="!adcDisabled"
          >
            <template v-slot:append>
              <v-text-field
                  v-model="levelB"
                  hide-details
                  single-line
                  max="99"
                  min="0"
                  density="compact"
                  variant="outlined"
                  type="number"
                  style="width: 80px"
                  :disabled="!adcDisabled"
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
