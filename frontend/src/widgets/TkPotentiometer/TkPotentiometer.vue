<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkPotentiometerChartOptions from './getTkPotentiometerChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.voltage || !props.options.timestamp) return

	return {
		voltage: props.data[0][props.options.voltage],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TKPotentiometerChartOptions = computed(() => {
	return getTkPotentiometerChartOptions(datasets.value)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TKPotentiometerChartOptions"/>
</template>
