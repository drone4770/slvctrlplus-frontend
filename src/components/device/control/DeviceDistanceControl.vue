<script setup lang="ts">
import {computed, onMounted, reactive, ref, unref} from "vue";
import type {Socket} from "socket.io-client";
import {useSocketIO} from "../../../plugins/vueSocketIOClient.js";
import type DeviceDistance from "../../../model/DeviceDistance.js";
import MyLineChart from "../../chart/MyLineChart.vue";
import type {ChartData, ChartOptions} from "chart.js";

interface Props {
  device: DeviceDistance
}

const maxDataPoints = 25;

const props = defineProps<Props>();
const io = useSocketIO() as Socket;
const device = reactive<DeviceDistance>(props.device);
const currentDistance = computed<number>((): number => {
  const tmpDistance = device.data?.distance;
  return tmpDistance && tmpDistance < 255 ? tmpDistance : 183;
});

const chartData = ref<ChartData<'line'>>({
  labels: [],
  datasets: []
})

const chartLabels: string[] = Array(maxDataPoints).fill('');
const chartDataPoints: number[] = Array(maxDataPoints).fill(18.3);

const updateChartData = (): void => {
  if (chartDataPoints.length > maxDataPoints) {
    chartLabels.shift();
    chartDataPoints.shift();
  }

  chartLabels.push(new Date().toLocaleString())
  chartDataPoints.push(Number((currentDistance.value * 0.1).toFixed(1)))

  const updatedChartData: ChartData<'line'> = {
    labels: [...chartLabels],
    datasets: [
      {
        label: 'Distance',
        pointBackgroundColor: 'rgb(0, 189, 126)',
        backgroundColor: 'rgba(0, 189, 126, 0.1)',
        borderColor: 'rgba(0, 189, 126, 0.5)',
        fill: 'origin',
        tension: 0.5,
        data: [...chartDataPoints],
      }
    ]
  }

  chartData.value = { ...updatedChartData }
}

onMounted(() => {
  updateChartData();

  setInterval(updateChartData, 500)
})

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animations: {
    x: {
      duration: 0
    },
    y: {
      duration: 0
    },
  },
  scales:{
    x: {
      display: false
    },
    y: {
      suggestedMin: 0,
      suggestedMax: 20,
    }
  },
  plugins: {
    legend: {
      display: false
    },
  },
}
</script>

<template>
  <dl>
    <dt><label>Distance</label></dt>
    <dd class="text-h3">
      <span v-if="currentDistance === 183">&gt;</span>{{ (currentDistance * 0.1).toFixed(1) }}cm
    </dd>
  </dl>
  <MyLineChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
