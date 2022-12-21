import { defineStore } from 'pinia'
import type Device from "../model/Device.js";
import type DeviceDistance from "../model/DeviceDistance.js";
import type DeviceAirValve from "../model/DeviceAirValve.js";
import type DeviceEt312 from "../model/DeviceEt312.js";

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
            data.items.forEach(this.addDevice);
            this.devicesLoaded = true;
          })
          .catch(console.log)
    },
    removeDevice(removedDevice: Device) {
      delete this.devices[removedDevice.deviceId as string];
    },
    addDevice(device: Device) {
      device.receiveUpdates = true;
      this.devices[device.deviceId as string] = device;
    },
    updateDevice(updatedDevice: Device) {
      const device = this.devices[updatedDevice.deviceId as string];

      if (!device || !device.receiveUpdates) {
        return;
      }

      device.lastRefresh = updatedDevice.lastRefresh;

      if (device.type === 'et312') {
        (device as DeviceEt312).data = (updatedDevice as DeviceEt312).data;
      } else if (device.type === 'distance') {
        (device as DeviceDistance).data = (updatedDevice as DeviceDistance).data;
      } else if (device.type === 'airValve') {
        (device as DeviceAirValve).flow = (updatedDevice as DeviceAirValve).flow;
      } else {
        console.log(`Device update for unhandled device of type: ${updatedDevice.type} (${updatedDevice.deviceName})`)
      }
    }
  }
})
