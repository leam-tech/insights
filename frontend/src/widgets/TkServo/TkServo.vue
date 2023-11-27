<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed, onMounted, onUnmounted, ref} from 'vue'
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

const chartRef = ref(null)

const onChartRef = (ref) => {
	chartRef.value = ref
}

// // TODO: This is not working ie clicking the chart directly so we go with separate input fields for now
// onMounted(() => {
// 	if (!datasets.value) return
//
// 	chartRef.value.on('click', {seriesName: 'TkServoGauge'}, function (args) {
// 		console.log(args,
// 			args.seriesIndex,
// 			args.seriesId,
// 			args.seriesName,
// 			[args.event.offsetX, args.event.offsetY],
// 			'value',
// 			chartRef.value.convertToPixel('grid', [args.event.offsetX, args.event.offsetY]),
// 			chartRef.value.convertFromPixel('grid', [args.event.offsetX, args.event.offsetY]),
// 			chartRef.value.convertToPixel('grid', [128.3324, 89.5344]),
// 		)
//
//
// 		// const currentDate = new Date();
// 		// const year = currentDate.getFullYear();
// 		// const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // months are zero-based
// 		// const day = String(currentDate.getDate()).padStart(2, '0');
// 		// const hours = String(currentDate.getHours()).padStart(2, '0');
// 		// const minutes = String(currentDate.getMinutes()).padStart(2, '0');
// 		// const seconds = String(currentDate.getSeconds()).padStart(2, '0');
// 		// const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// 		//
// 		// chartRef.value.setOption(
// 		// 	getTkServoChartOptions(
// 		// 		{
// 		// 			value,
// 		// 			timestamp: formattedDateTime,
// 		// 		},
// 		// 		props.options
// 		// 	)
// 		// );
// 	});
// })
//
// onUnmounted(() => {
// 	chartRef.value.off('click')
// })

const handleAngleChange = (type, value) => {
	if (!datasets.value) return

	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // months are zero-based
	const day = String(currentDate.getDate()).padStart(2, '0');
	const hours = String(currentDate.getHours()).padStart(2, '0');
	const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	const seconds = String(currentDate.getSeconds()).padStart(2, '0');
	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


	chartRef.value.setOption(
		getTkServoChartOptions(
			{
				max_angle: type === 'max_angle' ? parseInt(value) : datasets.value.max_angle,
				angle: type === 'value' ? parseInt(value) : datasets.value.angle,
				timestamp: formattedDateTime,
			},
			props.options
		)
	);
}

</script>

<template>
	<div>
		<div>
			<Input
				v-if="datasets !== undefined"
				type="number"
				label="Max Angle Value"
				placeholder="Max Angle Value"
				class="w-50"
				:modelValue="datasets.max_angle"
				@update:modelValue="handleAngleChange('max_angle', $event)"
			/>
		</div>
		<div>
			<Input
				v-if="datasets !== undefined"
				type="number"
				label="Angle Value"
				placeholder="Angle Value"
				class="w-50"
				:modelValue="datasets.angle"
				@update:modelValue="handleAngleChange('value', $event)"
			/>
		</div>
	</div>
	<BaseChart :title="props.options.title" :options="TKServoChartOptions" @chartRef="onChartRef"/>

</template>
