<template>
  <h3 @click.stop="drawer = !drawer">{{props.ruleDefinition.getName}} <v-chip pill color="primary" class="float-end">{{label}}</v-chip></h3>
  <div v-if="drawer">
    <component :is="comp" :ruleDefinition="this.ruleDefinition"></component>
    <v-btn color="primary">Edit</v-btn> <v-btn color="red">Delete</v-btn>
  </div>
</template>

<script setup lang="ts">
import {computed, defineAsyncComponent, ref} from "vue";
import type RuleDefinition from "../../model/automation/rule/ruleDefinition.js";
import MappingRuleDefinition from "../../model/automation/rule/mappingRuleDefinition.js";

interface Props {
  ruleDefinition: RuleDefinition
}

const props = defineProps<Props>()

const comp = computed<string>(() => {
  let controlComponent: string|null = null;

  if (props.ruleDefinition instanceof MappingRuleDefinition) {
    controlComponent = 'MappingRuleDetail';
  } else {
    throw new Error(`Unknown rule definition`);
  }

  return defineAsyncComponent(() => import(`./rule/${controlComponent}.vue`))
})

const label = computed<string>(() => {
  if (props.ruleDefinition instanceof MappingRuleDefinition) {
    return 'Mapping';
  }

  return 'Unknown';
})

let drawer = ref(false);
</script>

<style scoped>
h3 {
  cursor: pointer;
}
</style>