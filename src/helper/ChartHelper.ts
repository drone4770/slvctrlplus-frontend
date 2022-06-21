import type {ChartDataset, ChartOptions, ScatterDataPoint} from "chart.js";
import type {Chart} from "chart.js";
import type {RealTimeScale} from "chartjs-plugin-streaming";

export default abstract class ChartHelper
{
    public static createStreamChartOptions(
        duration: number,
        onRefresh: (this: RealTimeScale, chart: Chart) => void | null
    ): ChartOptions {
        return {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 0,
                }
            },
            scales:{
                x: {
                    type: 'realtime',
                    realtime: {
                        duration: duration,
                        refresh: 425,
                        delay: 500,
                        onRefresh: onRefresh
                    },
                    display: false
                },
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                streaming: {
                    pause: false
                }
            },
        };
    }

    public static createEmptyDataSet(): ChartDataset<"line", (number | ScatterDataPoint | null)[]> {
        return {
            label: 'Distance',
            pointBackgroundColor: 'rgba(0, 189, 126)',
            backgroundColor: 'rgba(0, 189, 126, 0.1)',
            borderColor: 'rgba(0, 189, 126, 0.5)',
            fill: 'origin',
            tension: 0.5,
            data: []
        };
    }

    public static pauseChart(options: ChartOptions): void {
        if (options.plugins?.streaming?.pause !== undefined) {
            options.plugins.streaming.pause = true;
        }
        if (options.plugins?.tooltip?.enabled !== undefined) {
            options.plugins.tooltip.enabled = true;
        }
        if (options.elements?.point !== undefined) {
            options.elements.point.radius = 1;
            options.elements.point.hoverRadius = 5;
        }
    }

    public static resumeChart(options: ChartOptions): void {
        if (options.plugins?.streaming?.pause !== undefined) {
            options.plugins.streaming.pause = false;
        }
        if (options.plugins?.tooltip?.enabled !== undefined) {
            options.plugins.tooltip.enabled = false;
        }
        if (options.elements?.point !== undefined) {
            options.elements.point.radius = 0;
            options.elements.point.hoverRadius = 0;
        }
    }
}