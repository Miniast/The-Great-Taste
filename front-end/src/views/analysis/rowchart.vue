<template>
    <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';

import { useECharts } from '@/hooks/web/useECharts';
import { basicProps } from './props';

export default defineComponent({
    props: basicProps,
    setup() {
        const chartRef = ref<HTMLDivElement | null>(null);
        const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

        onMounted(() => {
            setOptions({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            width: 1,
                            color: '#019680',
                        },
                    },
                },
                legend: {
                    data: ['访问量', '成交量'],
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        '12月15日',
                        '12月16日',
                        '12月17日',
                        '12月18日',
                        '12月19日',
                        '12月20日',
                        '12月21日',
                        '12月22日',
                        '12月23日',
                        '12月24日',
                        '12月25日',
                        '12月26日',
                        '12月27日',
                        '12月28日'
                    ],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                            color: 'rgba(226,226,226,0.5)',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        max: 2000,
                        splitNumber: 4,
                        axisTick: {
                            show: false,
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
                            },
                        },
                    },
                ],
                grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
                series: [
                    {
                        name:'访问量',
                        smooth: true,
                        data: [
                            200, 310, 210, 240, 150, 300, 300, 450, 500, 300, 700, 200, 150, 650,
                        ],
                        type: 'line',
                        areaStyle: {},
                        itemStyle: {
                            color: '#fff143',
                        },
                    },
                    {
                        name:'成交量',
                        smooth: true,
                        data: [
                            1110, 1300, 500, 640, 760, 960, 630, 990, 1600, 1200, 700, 1000, 900, 1000,
                        ],
                        type: 'line',
                        areaStyle: {},
                        itemStyle: {
                            color: '#ff7500',
                        },
                    },
                ],
            });
        });
        return { chartRef };
    },
});
</script>
  