<script setup lang="ts">
import DeviceIcon from "../components/icons/DeviceIcon.vue";
import DeviceControl from "../components/device/DeviceControl.vue";
import {onMounted, ref} from "vue";

let devices = ref(null);

function fetchDevices(): void {
  fetch('http://localhost:1337/devices')
    .then(response => response.json())
    .then(data => { devices.value = data })
    .catch(console.log)
}

onMounted(() => fetchDevices());
</script>

<template>
  <main class="devices">
    <h2>Mission control</h2>
    <ul v-if="this.devices">
      <li v-for="device in this.devices.items">
        <h3>
          <DeviceIcon :componentName="device.type" class="icon" />
          {{ device.deviceName }}
        </h3>
        <DeviceControl :device="device" />
      </li>
    </ul>
    <div v-else>
      loading...
    </div>
  </main>
</template>

<style scoped>
  .devices ul {
    display: flex;
    gap: 1em;
    list-style: none;
    padding: 0;
    margin: 1.5em 0;
  }

  .devices ul li {
    background: #e2e2e2;
    padding: 1.5em;
    border-radius: 0.5em;
    min-width: 325px;
  }

  .devices ul li .icon {
    width: 1em;
    margin: 0 0.25em 0 0;
  }

  .devices ul li h3 {
    text-transform: uppercase;
    font-weight: bold;
    border-bottom: 2px solid #bbb;
    margin-bottom: 0.75em;
  }

  h2 {
    position: relative;
  }

  h2 em {
    background: hsla(160, 100%, 37%, 1);
    color: #fff;
    display: inline-block;
    border-radius: 0.5em;
    padding: 0 0.5em;
    font-size: 0.6em;
    font-style: normal;
    margin-left: 0.75em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
