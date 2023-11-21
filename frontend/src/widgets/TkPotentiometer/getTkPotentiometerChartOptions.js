export default function getTkPotentiometerChartOptions(datasets) {
	if (!datasets) {
		return {}
	}

	const {voltage, timestamp} = datasets

	return {
		title: [
			{
				text: 'Voltage: ' + voltage + 'V',
				top: '20',
			},
			{
				text: 'Timestamp: ' + timestamp,
				top: '40',
			}
		]
	}
}
