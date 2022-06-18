import { defineStore } from 'pinia'
import type Device from "../model/Device.js";

export type DeviceState = {
  devices: Device[];
  devicesLoaded: boolean;
};

export const useDevicesStore = defineStore({
  id: 'devices',
  state: () => ({
    devices: [],
    devicesLoaded: false,
  } as DeviceState),
  getters: {
    //doubleCount: (state) => state.counter * 2
  },
  actions: {
    init() {
      fetch('http://localhost:1337/devices')
          .then(response => response.json())
          .then(data => {
            this.devices = data.items;
            this.devicesLoaded = true;
          })
          .catch(console.log)
    },
    removeDevice(removedDevice: Device) {
      this.devices = this.devices.filter(device => {
        return (device as Device).deviceId !== removedDevice.deviceId;
      })
    },
    addDevice(device: Device) {
      this.devices.push(device);
    },
  }
})
