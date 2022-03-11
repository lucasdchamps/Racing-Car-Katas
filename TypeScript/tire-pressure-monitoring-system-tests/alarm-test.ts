import { expect } from 'chai';
import 'mocha';
import Alarm from '../tire-pressure-monitoring-system/alarm';

describe('Tyre Pressure Monitoring System', () => {

	describe('Alarm', () => {
		it('foo', () => {
			const alarm = new TestableAlarm(18);

			alarm.check();

			expect(alarm.isAlarmOn()).eql(false);
		});

		it('foo', () => {
			const alarm = new TestableAlarm(22);

			alarm.check();

			expect(alarm.isAlarmOn()).eql(true);
		});

		class TestableAlarm extends Alarm {
			tirePressure: number;

			constructor(tirePressure: number) {
				super();
				this.tirePressure = tirePressure;
			}

			protected getPsiPressureValue(): number {
				return this.tirePressure;
			}
		}
	});

});
