export default function getTkLEDChartOptions(datasets, options) {
	if (!datasets) {
		return {}
	}

	var {value, timestamp} = datasets
	var _valOnRadianMax = 1;


	var led_on = 'http://insights.test:8008/assets/insights/images/led_on.png';
	var led_off = 'http://insights.test:8008/assets/insights/images/led_off.png';


	function renderItem(params, api) {
		var imageStyle = {
			image: value === 1 ? led_on : led_off,
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
