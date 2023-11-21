<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkToggleChartOptions from './getTkToggleChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.toggle_value || !props.options.timestamp) return

	return {
		value: props.data[0][props.options.toggle_value],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TkToggleChartOptions = computed(() => {
	return getTkToggleChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TkToggleChartOptions"/>
</template>
