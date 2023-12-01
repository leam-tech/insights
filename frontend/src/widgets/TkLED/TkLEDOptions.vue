<script setup>

import {FIELDTYPES} from '@/utils'
import {computed} from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
	modelValue: {type: Object, required: true},
	columns: {type: Array, required: true},
})

const options = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})

const indexOptions = computed(() => {
	return props.columns
		?.filter((column) => !FIELDTYPES.DATE.includes(column.type) && !FIELDTYPES.NUMBER.includes(column.type))
		.map((column) => ({
			label: column.label,
			value: column.label,
			description: column.type,
		}))
})
const dateTimeOptions = computed(() => {
	return props.columns
		?.filter((column) => FIELDTYPES.DATE.includes(column.type))
		.map((column) => ({
			label: column.label,
			value: column.label,
			description: column.type,
		}))
})
const valueOptions = computed(() => {
	return props.columns
		?.filter((column) => FIELDTYPES.NUMBER.includes(column.type))
		.map((column) => ({
			label: column.label,
			value: column.label,
			description: column.type,
		}))
})
</script>

<template>
	<div class="space-y-4">
		<Input
			type="text"
			label="Title"
			class="w-full"
			v-model="options.title"
			placeholder="Title"
		/>
		<div>
			<span class="mb-2 block text-sm leading-4 text-gray-700">Device ID</span>
			<Autocomplete v-model="options.device_id" :returnValue="true" :options="indexOptions"/>
		</div>
		<div>
			<span class="mb-2 block text-sm leading-4 text-gray-700">Timestamp</span>
			<Autocomplete v-model="options.timestamp" :returnValue="true" :options="dateTimeOptions"/>
		</div>
		<div>
			<span class="mb-2 block text-sm leading-4 text-gray-700">LED Value</span>
			<Autocomplete v-model="options.led_value" :returnValue="true" :options="valueOptions"/>
		</div>
	</div>
</template>
