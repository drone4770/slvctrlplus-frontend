<script setup lang="ts">
import {useAutomationStore} from "../stores/automation.js";
import RuleDetail from "../components/automation/RuleDetail.vue";

const automationStore = useAutomationStore();
</script>

<template>
  <v-container fluid class="px-8">
    <h2 class="text-h4 text-grey-darken-1 py-4">Automation</h2>
    <v-list>
      <v-list-item active-color="primary" v-for="ruleDef in automationStore.ruleDefinitions">
        <v-list-item-content style="width: 100%">
          <rule-detail :ruleDefinition="ruleDef" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>
