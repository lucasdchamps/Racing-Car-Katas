// The reading of the pressure value from the sensor is simulated in this implementation.
// Because the focus of the exercise is on the other class.

export interface ISensor {
	popNextPressurePsiValue(): number;
}

export default class Sensor implements ISensor {

	popNextPressurePsiValue() {
		const pressureTelemetryValue = this.samplePressure();

		return this.offset() + pressureTelemetryValue;
	}

	private samplePressure() {
		// placeholder implementation that simulate a real sensor in a real tire
		const pressureTelemetryValue = Math.floor(6 * Math.random() * Math.random());
		return pressureTelemetryValue;
	}

	private offset() { return 16; }

}
