import Sensor, {ISensor} from './sensor';

export default class Alarm {
	private highPressureThreshold: number;
	private lowPressureThreshold: number;

	private sensor: ISensor;
	private alarmOn: boolean;

	constructor(sensor:ISensor = new Sensor()) {
		this.lowPressureThreshold = 17;
		this.highPressureThreshold = 21;
		this.sensor = sensor;
		this.alarmOn = false;
	}

	public check() {
		const psiPressureValue = this.sensor.popNextPressurePsiValue();

		if (psiPressureValue < this.lowPressureThreshold || this.highPressureThreshold < psiPressureValue) {
			this.alarmOn = true;
		}
	}
	public isAlarmOn() {
		return this.alarmOn;
	}

}
