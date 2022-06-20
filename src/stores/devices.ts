import { defineStore } from 'pinia'
import type Device from "../model/Device.js";
import type DeviceDistance from "../model/DeviceDistance.js";

export type DeviceState = {
  devices: {[key: string]: Device};
  devicesLoaded: boolean;
};

export const useDevicesStore = defineStore({
  id: 'devices',
  state: () => ({
    devices: {},
    devicesLoaded: false,
  } as DeviceState),
  getters: {
    deviceList: (state) => Object.values(state.devices)
  },
  actions: {
    init() {
      fetch('http://localhost:1337/devices')
          .then(response => response.json())
          .then(data => {

            data.items.forEach((v: Device) => {
              console.log(v)
              this.devices[v.deviceId as string] = v
            });
            this.devicesLoaded = true;
          })
          .catch(console.log)
    },
    removeDevice(removedDevice: Device) {
      delete this.devices[removedDevice.deviceId as string];
    },
    addDevice(device: Device) {
      this.devices[device.deviceId as string] = device;
    },
    updateDevice(updatedDevice: Device) {
      const device = this.devices[updatedDevice.deviceId as string];

      if (device.type === 'distance') {
        (device as DeviceDistance).data = (updatedDevice as DeviceDistance).data;
      }
    }
  }
})
