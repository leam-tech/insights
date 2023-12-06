import { FIELDTYPES } from '@/utils'
import { getFormattedResult } from '@/utils/query/results'
import { reactive } from 'vue'

/**
 * @param {Object} options
 * @param {Object} options.query
 * @param {Object} options.resultsFetcher
 * @returns {Object} chartData
 * @returns {Array} chartData.data
 * @returns {Boolean} chartData.loading
 * @returns {Boolean} chartData.error
 * @returns {Function} chartData.reload
 *
 * @example
 * const chartData = useChartData(options)
 * chartData.load(query)
 **/

export default function useChartData(options = {}) {
	const state = reactive({
		query: null,
		data: [],
		recommendedChart: {},
		loading: false,
		error: null,
	})

	function load(query, explictReload = false) {
		if (!query) return
		if (explictReload) {
			state.loading = true
		}
		options.resultsFetcher().then((results) => {
			state.loading = false
			const formattedResults = getFormattedResult(results)
			state.data = convertResultToObjects(formattedResults)
			state.recommendedChart = guessChart(formattedResults)
		})
	}

	if (options.query) {
		load(options.query)
	}

	return Object.assign(state, {
		load,
	})
}

export function guessChart(dataset) {
	const [headers, ...rows] = dataset
	const columnNames = headers.map((header) => header.label)
	const columnTypes = headers.map((header) => header.type)
	const numberColIndex = columnTypes.findIndex((type) => FIELDTYPES.NUMBER.includes(type))
	const dateColIndex = columnTypes.findIndex((type) => FIELDTYPES.DATE.includes(type))
	const stringColIndex = columnTypes.findIndex((type) => FIELDTYPES.TEXT.includes(type))

	// if there is only one number column, it's a number chart
	if (columnTypes.length === 1 && numberColIndex !== -1) {
		return {
			type: 'Number',
			options: {
				column: columnNames[numberColIndex],
			},
		}
	}
	// if there is one date column and one number column, it's a line chart
	if (dateColIndex !== -1 && numberColIndex !== -1) {
		return {
			type: 'Line',
			options: {
				xAxis: columnNames[dateColIndex],
				yAxis: [columnNames[numberColIndex]],
			},
		}
	}
	// if there is one string column and one number column, it's a bar chart
	if (stringColIndex !== -1 && numberColIndex !== -1) {
		// if there are less than 10 unique values in the string column, it's a pie chart
		const uniqueValuesCount = new Set(rows.map((row) => row[stringColIndex])).size
		if (uniqueValuesCount <= 8) {
			return {
				type: 'Pie',
				options: {
					xAxis: columnNames[stringColIndex],
					yAxis: columnNames[numberColIndex],
				},
			}
		}
		return {
			type: 'Bar',
			options: {
				xAxis: columnNames[stringColIndex],
				yAxis: [columnNames[numberColIndex]],
				rotateLabels: uniqueValuesCount > 10 ? '90' : '0',
			},
		}
	}

	return {
		type: 'Table',
		options: {
			columns: headers,
		},
	}
}

export function convertResultToObjects(results) {
	// results first row is an list of dicts with label and type
	// return list of plain objects with first row's labels as keys
	// return [{ label1: value1, label2: value2 }, ...}]
	return results.slice(1).map((row) => {
		return results[0].reduce((obj, { label }, index) => {
			obj[label] = row[index]
			return obj
		}, {})
	})
}
