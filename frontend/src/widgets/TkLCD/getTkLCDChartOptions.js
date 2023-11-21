export default function getTkLCDChartOptions(datasets) {
	if (!datasets) {
		return {}
	}

	const {text, timestamp} = datasets

	return {
		title: [
			{
				text: 'Text: ' + text,
				top: '20',

			},
			{
				text: 'Timestamp: ' + timestamp,
				top: '40',
			}
		]
	}
}
