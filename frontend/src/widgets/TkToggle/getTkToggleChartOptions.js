export default function getTkToggleChartOptions(datasets, options) {
	if (!datasets) {
		return {}
	}
	var {value, timestamp} = datasets
	var _valOnRadianMax = 1;


	var toggle_pressed = 'http://insights.test:8008/assets/insights/images/button_pressed.png';
	var toggle_released = 'http://insights.test:8008/assets/insights/images/button_released.png';


	function renderItem(params, api) {
		var imageStyle = {
			image: value === 1 ? toggle_pressed : toggle_released,
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
		title: [
			{
				text: 'Timestamp: ' + timestamp,
				top: 'auto',
				left: 'center'
			}
		],
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
		]
	}
}
