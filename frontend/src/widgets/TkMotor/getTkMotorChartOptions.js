export default function getTkMotorChartOptions(datasets, options) {
	if (!datasets) {
		return {}
	}

	const {direction, max_speed, speed, timestamp} = datasets
	let {color} = options
	color = color?.length ? color : '#CB2929'

	return {
		series: [
			{
				type: 'gauge',
				center: ['50%', '60%'],
				startAngle: 200,
				endAngle: -20,
				min: 0,
				max: max_speed,
				splitNumber: 12,
				itemStyle: {
					color
				},
				progress: {
					show: true,
					width: 30
				},
				pointer: {
					show: false
				},
				axisLine: {
					lineStyle: {
						width: 30
					}
				},
				axisTick: {
					distance: -45,
					splitNumber: 5,
					lineStyle: {
						width: 2,
						color: '#999'
					}
				},
				splitLine: {
					distance: -52,
					length: 14,
					lineStyle: {
						width: 3,
						color: '#999'
					}
				},
				axisLabel: {
					distance: -20,
					color: '#999',
					fontSize: 20
				},
				anchor: {
					show: false
				},
				title: {
					show: false
				},
				detail: {
					valueAnimation: true,
					width: '60%',
					lineHeight: 40,
					borderRadius: 8,
					offsetCenter: [0, '-15%'],
					fontSize: 60,
					fontWeight: 'bolder',
					formatter: '{value} cm/s',
					color
				},
				data: [
					{
						value: speed
					}
				]
			},
			{
				type: 'gauge',
				center: ['50%', '60%'],
				startAngle: 200,
				endAngle: -20,
				min: 0,
				max: max_speed,
				itemStyle: {
					color
				},
				progress: {
					show: true,
					width: 8
				},
				pointer: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					show: false
				},
				detail: {
					show: false
				},
				data: [
					{
						value: speed
					}
				]
			}
		],
		title: [
			{
				text: 'Direction: ' + direction,
				top: 'bottom',
				left: 'center'
			},
			{
				text: 'Timestamp: ' + timestamp,
				top: 'auto',
				left: 'center'
			}
		]
	}
}
