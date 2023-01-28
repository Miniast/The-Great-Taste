<template>
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
        <n-grid-item>
            <NCard title="访问量" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
                <template #header-extra>
                    <n-tag type="success">日</n-tag>
                </template>
                <div class="py-1 px-1 flex justify-between">
                    <n-skeleton v-if="loading" :width="100" size="medium" />
                    <CountTo v-else :startVal="1" :endVal="visits.dayVisits" class="text-3xl" />
                </div>
                <div class="py-1 px-1 flex justify-between">
                    <div class="text-sn">
                        <n-skeleton v-if="loading" :width="100" size="medium" />
                        <template v-else>
                            日同比
                            <CountTo :startVal="1" suffix="%" :endVal="visits.rise" />
                            <n-icon size="12" color="#00ff6f">
                                <CaretUpOutlined />
                            </n-icon>
                        </template>
                    </div>
                    <div class="text-sn">
                        <n-skeleton v-if="loading" :width="100" size="medium" />
                        <template v-else>
                            周同比
                            <CountTo :startVal="1" suffix="%" :endVal="visits.decline" />
                            <n-icon size="12" color="#ffde66">
                                <CaretDownOutlined />
                            </n-icon>
                        </template>
                    </div>
                </div>
                <template #footer>
                    <div class="flex justify-between">
                        <n-skeleton v-if="loading" text :repeat="2" />
                        <template v-else>
                            <div class="text-sn"> 总访问量： </div>
                            <div class="text-sn">
                                <CountTo :startVal="1" :endVal="visits.amount" />
                            </div>
                        </template>
                    </div>
                </template>
            </NCard>
        </n-grid-item>
        <n-grid-item>
            <NCard title="成交额" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
                <template #header-extra>
                    <n-tag type="info">周</n-tag>
                </template>
                <div class="py-1 px-1 flex justify-between">
                    <n-skeleton v-if="loading" :width="100" size="medium" />
                    <CountTo v-else prefix="￥" :startVal="1" :endVal="saleroom.weekSaleroom" class="text-3xl" />
                </div>
                <div class="py-2 px-2 flex justify-between">
                    <div class="text-sn flex-1">
                        <n-progress type="line" :percentage="saleroom.degree" :indicator-placement="'inside'"
                            processing />
                    </div>
                </div>
                <template #footer>
                    <div class="flex justify-between">
                        <n-skeleton v-if="loading" :width="100" size="medium" />
                        <template v-else>
                            <div class="text-sn"> 总成交额： </div>
                            <div class="text-sn">
                                <CountTo prefix="￥" :startVal="1" :endVal="saleroom.amount" />
                            </div>
                        </template>
                    </div>
                </template>
            </NCard>
        </n-grid-item>
    </n-grid>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const loading = ref(true);
const visits = ref<any>({});
const saleroom = ref<any>({});
const orderLarge = ref<any>({});
const volume = ref({});
const data = {
    visits: {
        dayVisits: 1000,
        rise: 10,
        decline: 20,
        amount: 10000
    },
    saleroom: {
        weekSaleroom: 1000,
        degree: 50,
        amount: 10000
    },
    orderLarge: {
        weekOrderLarge: 1000,
        degree: 50,
        amount: 10000
    },
    volume: {
        weekVolume: 1000,
        degree: 50,
        amount: 10000
    }
}
onMounted(async () => {
    visits.value = data.visits;
    saleroom.value = data.saleroom;
    orderLarge.value = data.orderLarge;
    volume.value = data.volume;
    loading.value = false;
});
</script>
  