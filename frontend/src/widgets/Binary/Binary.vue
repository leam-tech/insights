<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed, onMounted, onUnmounted, ref} from 'vue'
import getBinaryChartOptions from './getBinaryChartOptions'
import {call} from "frappe-ui";

const chartRef = ref(null)


const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})

const datasets = computed(() => {
	if (!props.data?.length || !props.options.device_id || !props.options.value || !props.options.timestamp) return

	return {
		value: props.data[0][props.options.value],
		timestamp: props.data[0][props.options.timestamp],
		device_id: props.data[0][props.options.device_id],
	}
})

onMounted(() => {
	/**
	 * if no dataset is available, return
	 */
	if (!datasets.value) return
	chartRef.value.on('click', {seriesName: 'Binary'}, function (args) {
		/**
		 * Here we can add a callback..
		 * For example to Supabase to update the value
		 * For now we just toggle the value
		 */

		/**
		 * Toggled value
		 */
		const value = args.value[1] === 1 ? 0 : 1

		/**
		 * Current Timestamp
		 */
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // months are zero-based
		const day = String(currentDate.getDate()).padStart(2, '0');
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');
		const seconds = String(currentDate.getSeconds()).padStart(2, '0');
		const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


		call('insights.api.widget_value_update', {
			type: 'Binary',
			binary_value: value,
			timestamp: formattedDateTime,
			device_id: datasets.value.device_id,
		})

		/**
		 * Update the chart
		 * comment me out to disable instant chart update
		 */
		chartRef.value.setOption(
			getBinaryChartOptions(
				{
					value,
					timestamp: formattedDateTime,
				},
				props.options
			)
		);
	});
})

onUnmounted(() => {
	chartRef.value.off('click')
})


const onChartRef = (ref) => {
	// Access chartRef here
	chartRef.value = ref
}

const binaryChartOptions = computed(() => {
	return getBinaryChartOptions(datasets.value, props.options)
})
</script>

<template>
	<BaseChart :title="props.options.title" :options="binaryChartOptions" @chartRef="onChartRef"/>
</template>
