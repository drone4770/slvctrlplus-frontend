<template>
  <component :is="comp" :device="this.device"></component>
</template>

<script setup lang="ts">
import {computed, defineAsyncComponent} from "vue";
import type Device from "../../model/Device";

interface Props {
  device: Device
}

const props = defineProps<Props>()

const comp = computed<string>(() => {
  let controlComponent: string|null = null;

  switch (props.device.type) {
    case 'airValve': controlComponent = 'DeviceAirValveControl'; break;
    default: return controlComponent;
  }

  return defineAsyncComponent(() => import(`./control/${controlComponent}.vue`))
})
</script>
