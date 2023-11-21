<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkServoChartOptions from './getTkServoChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.max_angle || !props.options.angle || !props.options.timestamp) return

	return {
		max_angle: props.data[0][props.options.max_angle],
		angle: props.data[0][props.options.angle],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TKServoChartOptions = computed(() => {
	return getTkServoChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TKServoChartOptions"/>
</template>
