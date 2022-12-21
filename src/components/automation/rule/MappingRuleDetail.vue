<script setup lang="ts">
import type MappingRuleDefinition from "../../../model/automation/rule/mappingRuleDefinition.js";
import {useDevicesStore} from "../../../stores/devices.js";
import {computed} from "vue";
import RangeValueMapper from "../../../model/automation/rule/valueMapper/RangeValueMapper.js";

interface Props {
  ruleDefinition: MappingRuleDefinition
}

const props = defineProps<Props>();

const deviceStore = useDevicesStore();

const mapperInfo = computed<string>(() => {
  const mapper = props.ruleDefinition.getMapper;
  if (mapper instanceof RangeValueMapper) {
    return `Range &rarr; from: ${mapper.getFromLowerBound}-${mapper.getFromUpperBound}, to: ${mapper.getToLowerBound}-${mapper.getToUpperBound}, inverted: ${mapper.isInverted}`;
  }

  return 'Unknown';
})
</script>

<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>From</v-list-item-title>
        <v-list-item-subtitle>{{props.ruleDefinition.getSourceDeviceId}} ({{props.ruleDefinition.getFromOutput.getReference.getDeviceType}}) &rarr; {{props.ruleDefinition.getFromOutput.getReference.getName }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>To</v-list-item-title>
        <v-list-item-subtitle>{{props.ruleDefinition.getToInput.getTargetDeviceId}} ({{props.ruleDefinition.getToInput.getReference.getDeviceType}}) &rarr; {{props.ruleDefinition.getToInput.getReference.getName }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Mapper</v-list-item-title>
        <v-list-item-subtitle><span v-html="mapperInfo"></span></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
