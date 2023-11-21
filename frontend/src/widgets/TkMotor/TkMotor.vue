<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkMotorChartOptions from './getTkMotorChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.direction || !props.options.max_speed || !props.options.speed || !props.options.timestamp) return

	return {
		direction: props.data[0][props.options.direction],
		max_speed: props.data[0][props.options.max_speed],
		speed: props.data[0][props.options.speed],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TKMotorChartOptions = computed(() => {
	return getTkMotorChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TKMotorChartOptions"/>
</template>
