import ComboChartIcon from '@/components/Icons/ComboChartIcon.vue'
import {
	AlignLeft,
	BarChart3,
	BatteryMedium,
	DollarSign,
	LineChart,
	ListFilter,
	PieChart,
	ScatterChart,
	Table,
	TextCursorInput,
	TrendingUp,
} from 'lucide-vue-next'
import {defineAsyncComponent} from 'vue'

const VALID_CHARTS = [
	'Number',
	'Line',
	'Bar',
	'Pie',
	'Table',
	'Progress',
	'Scatter',
	'Funnel',
	'Trend',
	'Mixed Axis',
	'Binary',
	'TkLED',
	'TkBuzzer',
	'TkButton',
	'TkToggle',
	'TkMotor',
	'TkServo',
	'TkDistanceSensor',
	'TkLightSensor',
	'TkLCD',
	'TkPotentiometer',
]

const WIDGETS = {
	Number: {
		type: 'Number',
		icon: DollarSign,
		component: defineAsyncComponent(() => import('./Number/Number.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Number/NumberOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	Trend: {
		type: 'Trend',
		icon: TrendingUp,
		component: defineAsyncComponent(() => import('./Trend/Trend.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Trend/TrendOptions.vue')),
		options: {},
		defaultWidth: 5,
		defaultHeight: 5,
	},
	Line: {
		type: 'Line',
		icon: LineChart,
		component: defineAsyncComponent(() => import('./Line/Line.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Line/LineOptions.vue')),
		options: {},
		defaultWidth: 16,
		defaultHeight: 14,
	},
	Scatter: {
		type: 'Scatter',
		icon: ScatterChart,
		component: defineAsyncComponent(() => import('./Scatter/Scatter.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Scatter/ScatterOptions.vue')),
		options: {},
		defaultWidth: 16,
		defaultHeight: 14,
	},
	Bar: {
		type: 'Bar',
		icon: BarChart3,
		component: defineAsyncComponent(() => import('./Bar/Bar.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Bar/BarOptions.vue')),
		options: {},
		defaultWidth: 16,
		defaultHeight: 14,
	},
	Binary: {
		type: 'Binary',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./Binary/Binary.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Binary/BinaryOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkLED: {
		type: 'TkLED',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkLED/TkLED.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkLED/TkLEDOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkBuzzer: {
		type: 'TkBuzzer',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkBuzzer/TkBuzzer.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkBuzzer/TkBuzzerOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkButton: {
		type: 'TkButton',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkButton/TkButton.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkButton/TkButtonOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkToggle: {
		type: 'TkToggle',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkToggle/TkToggle.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkToggle/TkToggleOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkMotor: {
		type: 'TkMotor',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkMotor/TkMotor.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkMotor/TkMotorOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkServo: {
		type: 'TkServo',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkServo/TkServo.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkServo/TkServoOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkDistanceSensor: {
		type: 'TkDistanceSensor',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkDistanceSensor/TkDistanceSensor.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkDistanceSensor/TkDistanceSensorOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkLightSensor: {
		type: 'TkLightSensor',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkLightSensor/TkLightSensor.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkLightSensor/TkLightSensorOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkLCD: {
		type: 'TkLCD',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkLCD/TkLCD.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkLCD/TkLCDOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	TkPotentiometer: {
		type: 'TkPotentiometer',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./TkPotentiometer/TkPotentiometer.vue')),
		optionsComponent: defineAsyncComponent(() => import('./TkPotentiometer/TkPotentiometerOptions.vue')),
		options: {},
		defaultWidth: 4,
		defaultHeight: 4,
	},
	Pie: {
		type: 'Pie',
		icon: PieChart,
		component: defineAsyncComponent(() => import('./Pie/Pie.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Pie/PieOptions.vue')),
		options: {},
		defaultWidth: 16,
		defaultHeight: 14,
	},
	Funnel: {
		type: 'Funnel',
		icon: ListFilter,
		component: defineAsyncComponent(() => import('./Funnel/Funnel.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Funnel/FunnelOptions.vue')),
		options: {},
		defaultWidth: 16,
		defaultHeight: 14,
	},
	Table: {
		type: 'Table',
		icon: Table,
		component: defineAsyncComponent(() => import('./Table/Table.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Table/TableOptions.vue')),
		options: {},
		defaultWidth: 16,
		defaultHeight: 14,
	},
	Progress: {
		type: 'Progress',
		icon: BatteryMedium,
		component: defineAsyncComponent(() => import('./Progress/Progress.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Progress/ProgressOptions.vue')),
		options: {},
		defaultWidth: 5,
		defaultHeight: 4,
	},
	'Mixed Axis': {
		type: 'Mixed Axis',
		icon: ComboChartIcon,
		component: defineAsyncComponent(() => import('./MixedAxis/MixedAxis.vue')),
		optionsComponent: defineAsyncComponent(() => import('./MixedAxis/MixedAxisOptions.vue')),
		options: {},
		defaultWidth: 16,
		defaultHeight: 14,
	},
	Filter: {
		type: 'Filter',
		icon: TextCursorInput,
		component: defineAsyncComponent(() => import('./Filter/Filter.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Filter/FilterOptions.vue')),
		options: {},
		defaultWidth: 5,
		defaultHeight: 2,
	},
	Text: {
		type: 'Text',
		icon: AlignLeft,
		component: defineAsyncComponent(() => import('./Text/Text.vue')),
		optionsComponent: defineAsyncComponent(() => import('./Text/TextOptions.vue')),
		options: {},
		defaultWidth: 8,
		defaultHeight: 2,
	},
}

const UnknownWidget = {
	type: 'Unknown',
	component: defineAsyncComponent(() => import('@/widgets/InvalidWidget.vue')),
	optionsComponent: null,
	options: {},
	defaultWidth: 5,
	defaultHeight: 4,
}

function get(itemType) {
	return WIDGETS[itemType] || UnknownWidget
}

function getComponent(itemType) {
	return get(itemType).component
}

function getOptionComponent(itemType) {
	return get(itemType).optionsComponent
}

function getChartOptions() {
	return VALID_CHARTS.map((chart) => ({
		value: chart,
		label: chart,
	}))
}

export function getChartIcon(itemType) {
	if (!itemType) return
	if (!VALID_CHARTS.includes(itemType)) return
	return get(itemType).icon
}

export default {
	...WIDGETS,
	list: Object.values(WIDGETS),
	get,
	getComponent,
	getOptionComponent,
	getChartOptions,
	getChartIcon,
}
