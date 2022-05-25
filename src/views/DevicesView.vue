<script setup lang="ts">
import DeviceIcon from "../components/icons/DeviceIcon.vue";
import {onMounted, ref} from "vue";

let devices = ref(null);

function fetchDevices(): void {
  fetch('http://localhost:1337/devices')
.then(response => response.json())
    .then(data => { devices.value = data })
    .catch(console.log)
}

function formatFwVersion(fwVersion: string): string {
  const bugfix = Number(fwVersion.slice(-2));
  const minor = Number(fwVersion.slice(-4, -2));
  const major = Number(fwVersion.slice(0, -4));

  return `${major}.${minor}.${bugfix}`
}

onMounted(() => {
  fetchDevices();

  setInterval(() => fetchDevices(), 1500);
})
</script>

<template>
  <main class="devices">
    <h2>Connected devices <em v-if="this.devices">{{ this.devices.count }}</em></h2>
    <ul v-if="this.devices">
      <li v-for="device in this.devices.items">
        <div class="icon">
          <DeviceIcon :componentName="device.type" />
        </div>
        <div class="info">
          <h3>{{ device.deviceName }}</h3>
          <dl>
            <dt>ID</dt>
            <dd>{{ device.deviceId }}</dd>
          </dl>
          <dl>
            <dt>Type</dt>
            <dd>{{ device.type }}</dd>
          </dl>
          <dl>
            <dt>Firmware</dt>
            <dd>{{ this.formatFwVersion(device.fwVersion) }}</dd>
          </dl>
        </div>
      </li>
    </ul>
    <div v-else>
      loading...
    </div>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  .devices ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 1.5em 0;
    gap: 1em;
  }

  .devices ul li {
    background: #e2e2e2;
    padding: 1.5em;
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .devices ul li .icon {
    width: 2em;
    margin: 0 1.5em 0 0;
  }

  .devices ul li h3 {
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    border-bottom: 2px solid #bbb;
    margin-bottom: 0.75em;
  }

  .devices ul li dl {
    display: flex;
  }

  .devices ul li dl dt {
    font-weight: bold;
    width: 75px;
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
}
</style>
