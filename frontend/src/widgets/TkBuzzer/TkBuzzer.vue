<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkBuzzerChartOptions from './getTkBuzzerChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.buzzer_value || !props.options.timestamp) return
	return {
		value: props.data[0][props.options.buzzer_value],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TkBuzzerChartOptions = computed(() => {
	return getTkBuzzerChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TkBuzzerChartOptions"/>
</template>
