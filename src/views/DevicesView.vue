<script setup lang="ts">
import DeviceIcon from "../components/icons/DeviceIcon.vue";
import LoadingState from "../components/LoadingState.vue";
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
  <v-container v-if="this.devices" fluid class="px-8">
    <h2 class="text-h4 text-grey-darken-1 py-4">
      Connected devices <v-chip v-if="this.devices" pill color="primary">{{ this.devices.count }}</v-chip>
    </h2>
    <v-container fluid grid-list-md class="px-0">
      <v-row row wrap>
        <v-col cols="12" xs="12" sm="6" md="4" v-for="device in this.devices.items" xs4>
          <v-card class="rounded-sm">
            <v-card-title>
              <DeviceIcon :componentName="device.type" class="icon" />
              {{ device.deviceName }}
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text class="pa-0">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>ID</v-list-item-title>
                    <v-list-item-subtitle v-text="device.deviceId"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Type</v-list-item-title>
                    <v-list-item-subtitle v-text="device.type"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Firmware</v-list-item-title>
                    <v-list-item-subtitle v-text="this.formatFwVersion(device.fwVersion)"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  <LoadingState v-else msg="Getting connected devices"/>
</template>

<style scoped>
.icon {
  width: 1em;
  margin: 0 0.25em 0 0;
}
/*@media (min-width: 1024px) {
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
}*/
</style>
