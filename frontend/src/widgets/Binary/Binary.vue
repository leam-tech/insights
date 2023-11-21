<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getBinaryChartOptions from './getBinaryChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})

const datasets = computed(() => {
	if (!props.data?.length || !props.options.value || !props.options.timestamp) return

	return {
		value: props.data[0][props.options.value],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const binaryChartOptions = computed(() => {
	return getBinaryChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="binaryChartOptions"/>
</template>
