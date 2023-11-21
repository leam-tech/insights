<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed} from 'vue'
import getTkLCDChartOptions from './getTkLCDChartOptions'

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.text || !props.options.timestamp) return

	return {
		text: props.data[0][props.options.text],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TKLCDChartOptions = computed(() => {
	return getTkLCDChartOptions(datasets.value)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="TKLCDChartOptions"/>
</template>
