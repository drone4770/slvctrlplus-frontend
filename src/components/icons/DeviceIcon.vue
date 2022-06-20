<template>
  <!--component :is="comp"></component-->
  <v-icon>{{ comp }}</v-icon>
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
    case 'airValve': iconComponentName = 'mdi-fan'; break;
    case 'et312': iconComponentName = 'mdi-lightning-bolt'; break;
    case 'strikerMk2': iconComponentName = 'mdi-swap-horizontal'; break;
    case 'distance': iconComponentName = 'mdi-ruler'; break;
    default: iconComponentName = 'mdi-robot'; break;
  }

  return iconComponentName;
  //return defineAsyncComponent(() => import(`./Icon${iconComponentName}.vue`))
});
</script>
