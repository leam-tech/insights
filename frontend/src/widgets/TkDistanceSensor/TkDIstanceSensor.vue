<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkDistanceSensorChartOptions from './getTkDistanceSensorChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.max_distance
		|| !props.options.distance || !props.options.timestamp) return

	return {
		max_distance: props.data[0][props.options.max_distance],
		distance: props.data[0][props.options.distance],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TKDistanceSensorChartOptions = computed(() => {
	return getTkDistanceSensorChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TKDistanceSensorChartOptions"/>
</template>
