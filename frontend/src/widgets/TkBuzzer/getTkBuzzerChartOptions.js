export default function getTkBuzzerChartOptions(datasets, options) {
	if (!datasets) {
		return {}
	}

	var {value, timestamp} = datasets
	var _valOnRadianMax = 1;


	var buzzer_on = window.location.origin + '/assets/insights/images/buzzer_on.png';
	var buzzer_off = window.location.origin + '/assets/insights/images/buzzer_off.png';


	function renderItem(params, api) {
		var imageStyle = {
			image: value === 1 ? buzzer_on : buzzer_off,
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
