import { expect } from 'chai';
import 'mocha';
import { assert } from 'sinon';
import { stubInterface } from "ts-sinon";
import { ITelemetryClient } from "../telemetry-system/telemetry-client";
import TelemetryDiagnosticControls from '../telemetry-system/telemetry-diagnostic-controls';

describe('Telemetry System', () => {

    describe('TelemetryDiagnosticControls', () => {

        it('CheckTransmission should send a diagnostic message and receive a status message response', () => {
            const stubTelemetryClient = stubInterface<ITelemetryClient>();
            stubTelemetryClient.getOnlineStatus.returns(true);
            stubTelemetryClient.diagnosticMessage.returns("toto");
            stubTelemetryClient.receive.returns("receive result");
            const diagnosticControls = new TelemetryDiagnosticControls(stubTelemetryClient);

            diagnosticControls.checkTransmission();

            expect(diagnosticControls.readDiagnosticInfo()).to.include("receive result");
            assert.calledOnce(stubTelemetryClient.send as any);
            assert.calledWith(stubTelemetryClient.send as any, "toto");
            assert.callOrder(
                stubTelemetryClient.disconnect as any,
                stubTelemetryClient.diagnosticMessage as any,
                stubTelemetryClient.connect as any,
                stubTelemetryClient.send as any,
                stubTelemetryClient.receive as any,
            );
        });

        it('should retry if connection failed the first time', () => {
            const stubTelemetryClient = stubInterface<ITelemetryClient>();
            stubTelemetryClient.getOnlineStatus.onCall(0).returns(false);
            stubTelemetryClient.getOnlineStatus.returns(true);
            const diagnosticControls = new TelemetryDiagnosticControls(stubTelemetryClient);

            diagnosticControls.checkTransmission();

            assert.calledOnce(stubTelemetryClient.connect as any);
            assert.callOrder(
                stubTelemetryClient.disconnect as any,
                stubTelemetryClient.connect as any,
                stubTelemetryClient.diagnosticMessage as any,
                stubTelemetryClient.send as any,
                stubTelemetryClient.receive as any,
            );
        });

        it('should not retry more than 3 times', () => {
            const stubTelemetryClient = stubInterface<ITelemetryClient>();
            stubTelemetryClient.getOnlineStatus.returns(false);
            const diagnosticControls = new TelemetryDiagnosticControls(stubTelemetryClient);

            const call = () => diagnosticControls.checkTransmission();

            expect(call).to.throw();
            assert.calledThrice(stubTelemetryClient.connect as any);
        });
    });
});
