import { expect } from 'chai';
import 'mocha';
import Alarm from '../tire-pressure-monitoring-system/alarm';
import {ISensor} from "../tire-pressure-monitoring-system/sensor";
import {stubInterface, stubObject} from "ts-sinon";

describe('Tyre Pressure Monitoring System', () => {
	describe('Alarm', () => {
		it('foo', () => {
			const fakeSensor = stubInterface<ISensor>();
			fakeSensor.popNextPressurePsiValue.returns(18);
			const alarm = new Alarm(fakeSensor);

			alarm.check();

			expect(alarm.isAlarmOn()).eql(false);
			expect(fakeSensor.popNextPressurePsiValue).calledOnce;
		});

		it('foo', () => {
			const fakeSensor = stubInterface<ISensor>({
				popNextPressurePsiValue: 22
			});
			const alarm = new Alarm(fakeSensor);

			alarm.check();

			expect(alarm.isAlarmOn()).eql(true);
		});
	});

});
