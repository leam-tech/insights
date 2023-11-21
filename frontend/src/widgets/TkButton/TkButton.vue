<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkButtonChartOptions from './getTkButtonChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.button_value || !props.options.timestamp) return
	return {
		value: props.data[0][props.options.button_value],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TkButtonChartOptions = computed(() => {
	return getTkButtonChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TkButtonChartOptions"/>
</template>
