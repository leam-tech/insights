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
	if (!datasets.value) return

	chartRef.value.on('click', {seriesName: 'TkBuzzer'}, function (args) {
		const value = args.value[1] === 1 ? 0 : 1

		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // months are zero-based
		const day = String(currentDate.getDate()).padStart(2, '0');
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');
		const seconds = String(currentDate.getSeconds()).padStart(2, '0');
		const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		call('insights.api.widget_value_update', {
			type: 'TkBuzzer',
			buzzer_value: value,
			timestamp: formattedDateTime,
			device_id: datasets.value.device_id,
		})

		chartRef.value.setOption(
			getTkBuzzerChartOptions(
				{
					value,
					timestamp: formattedDateTime,
					device_id: datasets.value.device_id,
				},
				props.options
			)
		);
	});
})

onUnmounted(() => {
	chartRef.value.off('click')
})

</script>

<template>
	<BaseChart :title="props.options.title" :options="TkBuzzerChartOptions" @chartRef="onChartRef"/>
</template>
