import { expect } from 'chai';
import 'mocha';
import TelemetryDiagnosticControls from '../telemetry-system/telemetry-diagnostic-controls';

describe('Telemetry System', () => {

	describe('TelemetryDiagnosticControls', () => {

		it('CheckTransmission should send a diagnostic message and receive a status message response', () => {
			const diagnosticControls = new TelemetryDiagnosticControls();

			diagnosticControls.checkTransmission();

			expect(diagnosticControls.readDiagnosticInfo()).to.include("LAST TX rate");
		});

	});

});
