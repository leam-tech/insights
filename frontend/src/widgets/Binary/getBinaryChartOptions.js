export default function getBarChartOptions(datasets, options) {
	if (!datasets) {
		return {}
	}

	const {value, timestamp} = datasets

	// set the color based on value
	// we take options.color if value is 1 else we take options.color_alternative
	// we default for #48BB74 for 1 if options.color is not set
	// we default for #CB2929 for 0 if options.color_alternative is not set
	var color = value === 1 ? options.colors?.length ? options.colors : '#48BB74' : options.colors_alternative?.length ? options.colors_alternative : '#CB2929'

	var _valOnRadianMax = 1;
	var _insidePanelRadius = 140;


	function renderItem(params, api) {
		var valOnRadian = api.value(1);

		return {
			type: 'group',
			children: [
				{
					type: 'circle',
					shape: {
						cx: params.coordSys.cx,
						cy: params.coordSys.cy,
						r: _insidePanelRadius
					},
					style: {
						fill: color,
						shadowBlur: 25,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowColor: color,
					}
				},
				{
					type: 'text',
					extra: {
						valOnRadian: valOnRadian,
						transition: 'valOnRadian',
						enterFrom: {valOnRadian: 0}
					},
					style: {
						text: makeText(valOnRadian),
						fontSize: 50,
						fontWeight: 700,
						x: params.coordSys.cx,
						y: params.coordSys.cy,
						fill: '#fff',
						align: 'center',
						verticalAlign: 'middle',
						enterFrom: {opacity: 0}
					},
					during: function (apiDuring) {
						apiDuring.setStyle(
							'text',
							makeText(apiDuring.getExtra('valOnRadian'))
						);
					}
				}
			]
		};
	}


	function makeText(valOnRadian) {
		// Validate additive animation calc.
		if (valOnRadian < -10) {
			alert('illegal during val: ' + valOnRadian);
		}
		return (((valOnRadian / _valOnRadianMax) * 100).toFixed(0)) / 100;
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
