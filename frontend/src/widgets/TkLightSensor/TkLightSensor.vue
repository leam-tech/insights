<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkLightSensorChartOptions from './getTkLightSensorChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.light_intensity || !props.options.timestamp || !props.options.device_id) return

	return {
		light_intensity: props.data[0][props.options.light_intensity],
		timestamp: props.data[0][props.options.timestamp],
		device_id: props.data[0][props.options.device_id],
	}
})

const TKLightSensorChartOptions = computed(() => {
	return getTkLightSensorChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TKLightSensorChartOptions"/>
</template>
