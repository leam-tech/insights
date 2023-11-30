<script setup>
import BaseChart from '@/components/Charts/BaseChart.vue'
import {computed, ref} from 'vue'
import getTkMotorChartOptions from './getTkMotorChartOptions'
import Checkbox from '@/components/Controls/Checkbox.vue'
import {call} from "frappe-ui";

const props = defineProps({
	data: {type: Object, required: true},
	options: {type: Object, required: true},
})


const datasets = computed(() => {
	if (!props.data?.length || !props.options.device_id || !props.options.direction || !props.options.max_speed || !props.options.speed || !props.options.timestamp) return

	return {
		device_id: props.data[0][props.options.device_id],
		direction: props.data[0][props.options.direction],
		max_speed: props.data[0][props.options.max_speed],
		speed: props.data[0][props.options.speed],
		timestamp: props.data[0][props.options.timestamp],
	}
})

const TKMotorChartOptions = computed(() => {
	return getTkMotorChartOptions(datasets.value, props.options)
})

const chartRef = ref(null)

const onChartRef = (ref) => {
	chartRef.value = ref
}

const handleSpeedChange = (key, value) => {
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
		getTkMotorChartOptions(
			{
				timestamp: formattedDateTime,
				direction: key === 'direction' ? parseInt(value) ? 'forward' : 'backward' : datasets.value.direction,
				max_speed: key === 'max_speed' ? parseInt(value) : datasets.value.max_speed,
				speed: key === 'value' ? parseInt(value) : datasets.value.speed,
			},
			props.options,
		),
	)

	call('insights.api.widget_value_update', {
		device_id: datasets.value.device_id,
		type: 'TkMotor',
		timestamp: formattedDateTime,
		direction: key === 'direction' ? parseInt(value) ? 'forward' : 'backward' : datasets.value.direction,
		max_speed: key === 'max_speed' ? parseInt(value) : datasets.value.max_speed,
		speed: key === 'value' ? parseInt(value) : datasets.value.speed,
	})
}


</script>

<template>
	<div>
		<div>
			<Checkbox
				v-if="datasets !== undefined"
				label="Direction"
				:modelValue="datasets.direction === 'forward'"
				@update:modelValue="handleSpeedChange('direction', $event)"
			/>
			<Input
				v-if="datasets !== undefined"
				type="number"
				label="Max Speed Value"
				placeholder="Max Speed Value"
				class="w-50"
				:modelValue="datasets.max_speed"
				@update:modelValue="handleSpeedChange('max_speed', $event)"
			/>
		</div>
		<div>
			<Input
				v-if="datasets !== undefined"
				type="number"
				label="Speed Value"
				placeholder="Speed Value"
				class="w-50"
				:modelValue="datasets.speed"
				@update:modelValue="handleSpeedChange('value', $event)"
			/>
		</div>
	</div>
	<BaseChart :title="props.options.title" :options="TKMotorChartOptions" @chartRef="onChartRef"/>
</template>
