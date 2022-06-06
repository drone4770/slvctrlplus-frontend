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
    case 'airValve': iconComponentName = 'DeviceAirValve'; break;
    case 'et312': iconComponentName = 'DeviceEt312'; break;
    default: iconComponentName = 'GenericDevice'; break;
  }

  return defineAsyncComponent(() => import(`./Icon${iconComponentName}.vue`))
});
</script>
