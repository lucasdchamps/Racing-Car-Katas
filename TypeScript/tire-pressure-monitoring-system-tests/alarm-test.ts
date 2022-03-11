import { expect } from 'chai';
import 'mocha';
import Alarm from '../tire-pressure-monitoring-system/alarm';
import {ISensor} from "../tire-pressure-monitoring-system/sensor";

describe('Tyre Pressure Monitoring System', () => {

	describe('Alarm', () => {
		it('foo', () => {
			const alarm = new Alarm(new FakeSensor(18));

			alarm.check();

			expect(alarm.isAlarmOn()).eql(false);
		});

		it('foo', () => {
			const alarm = new Alarm(new FakeSensor(22));

			alarm.check();

			expect(alarm.isAlarmOn()).eql(true);
		});

		class FakeSensor implements ISensor {
			tirePressure: number;
			constructor(tirePressure: number) {
				this.tirePressure = tirePressure;
			}
			popNextPressurePsiValue(): number {
				return this.tirePressure;
			}
		}
	});

});
