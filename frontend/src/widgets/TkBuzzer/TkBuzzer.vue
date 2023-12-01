<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkBuzzerChartOptions from './getTkBuzzerChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.buzzer_value || !props.options.timestamp || !props.options.device_id) return
	return {
		value: props.data[0][props.options.buzzer_value],
		timestamp: props.data[0][props.options.timestamp],
		device_id: props.data[0][props.options.device_id],
	}
})

const TkBuzzerChartOptions = computed(() => {
	return getTkBuzzerChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TkBuzzerChartOptions"/>
</template>
