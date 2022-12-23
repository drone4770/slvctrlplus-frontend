<script setup lang="ts">
import type { Chart, ChartData } from "chart.js";
import ChartHelper from "../helper/ChartHelper.js";
import { merge } from "chart.js/helpers";
import StreamLineChart from "../components/chart/StreamLineChart.vue";

const chartData: ChartData<"line"> = {
  datasets: [
    ChartHelper.createEmptyDataSet("Rss", { r: 0, g: 189, b: 126 }),
    ChartHelper.createEmptyDataSet("Heap total", { r: 0, g: 189, b: 126 }),
    ChartHelper.createEmptyDataSet("Heap used", { r: 204, g: 0, b: 0 }),
    ChartHelper.createEmptyDataSet("External", { r: 0, g: 189, b: 126 }),
  ],
};

const onRefresh = (chart: Chart) => {
  fetch(`http://${location.hostname}:1337/health`)
    .then((response) => response.json())
    .then((data) => {
      chart.data.datasets[0].data.push({
        x: Date.now(),
        y: Number((data.memoryUsage.rss / 1024 / 1024).toFixed(2)),
      });
      chart.data.datasets[1].data.push({
        x: Date.now(),
        y: Number((data.memoryUsage.heapTotal / 1024 / 1024).toFixed(2)),
      });
      chart.data.datasets[2].data.push({
        x: Date.now(),
        y: Number((data.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)),
      });
      chart.data.datasets[3].data.push({
        x: Date.now(),
        y: Number((data.memoryUsage.external / 1024 / 1024).toFixed(2)),
      });
    })
    .catch(console.log);
};

const chartOptions = merge(
  ChartHelper.createStreamChartOptions(20000, 425, 2000, onRefresh),
  {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 75,
      },
      x: {
        display: true,
      },
    },
  }
);
</script>

<template>
  <v-container fluid class="px-8 fill-height">
    <h2 class="text-h4 text-grey-darken-1 py-4">System health</h2>
    <h3>Memory</h3>
    <StreamLineChart
      :chartData="chartData"
      :chartOptions="chartOptions"
      @mouseover="ChartHelper.pauseChart(chartOptions)"
      @mouseleave="ChartHelper.resumeChart(chartOptions)"
    />
  </v-container>
</template>

<style scoped></style>
