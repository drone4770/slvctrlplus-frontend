<script setup lang="ts">
defineProps<{
  msg: string,
  icon: string,
}>()
</script>

<template>
  <v-container class="fill-height mt-n16" fluid>
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col cols="12" class="text-subtitle-1 text-center">
        <v-icon size="64" color="primary">{{icon}}</v-icon>
      </v-col>
      <v-col cols="12" class="text-grey-darken-3 text-subtitle-1 text-center">
        {{ msg }}
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .v-icon {
    opacity: 0.2;
  }
</style>
