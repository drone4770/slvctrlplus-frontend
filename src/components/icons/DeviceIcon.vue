<template>
  <component :is="comp"></component>
</template>

<script setup lang="ts">
import {computed, defineAsyncComponent} from "vue";

interface Props {
  componentName: string;
}

const props = defineProps<Props>()

const comp = computed<string>(() => {
  let iconComponentName: string;

  switch (props.componentName) {
    case 'airValve': iconComponentName = 'IconDeviceAirValve'; break;
    case 'et312': iconComponentName = 'IconDeviceEt312'; break;
    default: iconComponentName = 'IconGenericDevice'; break;
  }

  return defineAsyncComponent(() => import(`./${iconComponentName}.vue`))
});
</script>
