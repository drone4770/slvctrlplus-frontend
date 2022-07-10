<script setup lang="ts">
import {computed, reactive} from "vue";
import type {Socket} from "socket.io-client";
import {useSocketIO} from "../../../plugins/vueSocketIOClient.js";
import type DeviceDistance from "../../../model/DeviceDistance.js";
import StreamLineChart from "../../chart/StreamLineChart.vue";
import type {Chart, ChartData} from "chart.js";
import ChartHelper from "../../../helper/ChartHelper.js";
import {merge} from "chart.js/helpers";

interface Props {
  device: DeviceDistance
}

const props = defineProps<Props>();
const io = useSocketIO() as Socket;
const device = reactive<DeviceDistance>(props.device);
const currentDistance = computed<number>((): number => {
  const tmpDistance = device.data?.distance;
  return tmpDistance && tmpDistance < 255 ? tmpDistance : 183;
});

const chartData: ChartData<'line'> = {
  datasets: [
    ChartHelper.createEmptyDataSet('Distance', {r: 0, g: 189, b: 126}),
  ]
};

const onRefresh = (chart: Chart) => {
  chart.data.datasets[0].data.push({
    x: Date.now(),
    y: Number((currentDistance.value * 0.1).toFixed(1))
  });
};

const chartOptions = merge(
  ChartHelper.createStreamChartOptions(20000, 425, 500, onRefresh),
  {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 20,
      }
    }
  }
);
</script>

<template>
  <dl>
    <dt><label>Distance</label></dt>
    <dd class="text-h3 text-primary">
      <span v-if="currentDistance === 183">&gt;</span>{{ (currentDistance * 0.1).toFixed(1) }}cm
    </dd>
  </dl>
  <v-divider class="my-4"></v-divider>
  <StreamLineChart
      :chartData="chartData"
      :chartOptions="chartOptions"
      @mouseover="ChartHelper.pauseChart(chartOptions)"
      @mouseleave="ChartHelper.resumeChart(chartOptions)"
  />
</template>
