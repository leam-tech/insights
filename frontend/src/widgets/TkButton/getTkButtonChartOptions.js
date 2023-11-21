export default function getTkButtonChartOptions(datasets, options) {
	if (!datasets) {
		return {}
	}

	const {value, timestamp} = datasets
	var _valOnRadianMax = 1;


	var button_pressed = window.location.origin + '/assets/insights/images/button_pressed.png';
	var button_released = window.location.origin + '/assets/insights/images/button_released.png';

	function renderItem(params, api) {
		var imageStyle = {
			image: value === 1 ? button_pressed : button_released,
			width: 50,
			height: 50,
		};
		return {
			type: 'group',
			children: [
				{
					type: 'image',
					style: imageStyle
				}
			]
		};
	}


	return {
		dataset: {
			source: [[1, value]]
		},
		tooltip: {},
		angleAxis: {
			type: 'value',
			startAngle: 0,
			show: false,
			min: 0,
			max: _valOnRadianMax
		},
		radiusAxis: {
			type: 'value',
			show: false
		},
		polar: {},
		series: [
			{
				type: 'custom',
				coordinateSystem: 'polar',
				renderItem: renderItem
			}
		],
		title: [
			{
				text: 'Timestamp: ' + timestamp,
				top: 'auto',
				left: 'center'
			}
		]
	}
}
