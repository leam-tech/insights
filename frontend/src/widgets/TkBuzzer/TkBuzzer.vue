<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed, onMounted, onUnmounted, ref} from 'vue'
import getTkBuzzerChartOptions from './getTkBuzzerChartOptions'
import {call} from "frappe-ui";


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

const chartRef = ref(null)

const onChartRef = (ref) => {
	// Access chartRef here
	chartRef.value = ref
}

onMounted(() => {
	chartRef.value.on('click', {seriesName: 'TkBuzzer'}, function (args) {
		call('insights.api.widget_value_update', {
			type: 'TkBuzzer',
			device_id: datasets.value.device_id,
			command: {
				action: 'TOGGLE',
			},
		});
	});
})

onUnmounted(() => {
	chartRef.value.off('click')
})

</script>

<template>
	<BaseChart :title="props.options.title" :options="TkBuzzerChartOptions" @chartRef="onChartRef"/>
</template>
