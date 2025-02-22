<template>
	<Autocomplete
		placeholder="Select an option"
		:options="options"
		:modelValue="selection"
		@update:query="(q) => onUpdateQuery(q)"
		@update:modelValue="(v) => (selection = v)"
	/>
</template>

<script setup>
import { Autocomplete, createListResource } from 'frappe-ui'
import { computed, ref, watch } from 'vue'

const props = defineProps({
	value: {
		type: String,
		required: false,
		default: '',
	},
	doctype: {
		type: String,
		required: true,
	},
	searchField: {
		type: String,
		required: false,
		default: 'name',
	},
	labelField: {
		type: String,
		required: false,
		default: 'name',
	},
	valueField: {
		type: String,
		required: false,
		default: 'name',
	},
	pageLength: {
		type: Number,
		required: false,
		default: 10,
	},
})

watch(
	() => props.doctype,
	(value) => {
		r.doctype = value
		r.reload()
	}
)

const r = createListResource({
	doctype: props.doctype,
	pageLength: props.pageLength,
	cache: ['link_doctype', props.doctype],
	auto: true,
	fields: [props.labelField, props.searchField, props.valueField],
	onSuccess: () => {
		selection.value = props.value ? options.value.find((o) => o.value === props.value) : null
	},
})
const options = computed(() => {
	const allOptions =
		r.data?.map((result) => ({
			label: result[props.labelField],
			value: result[props.valueField],
		})) || []

	if (selection.value && !allOptions.find((o) => o.value === selection.value.value)) {
		allOptions.push(selection.value)
	}
	return allOptions
})
const selection = ref(null)

function onUpdateQuery(query) {
	r.update({
		filters: {
			[props.searchField]: ['like', `%${query}%`],
		},
	})

	r.reload()
}
</script>
