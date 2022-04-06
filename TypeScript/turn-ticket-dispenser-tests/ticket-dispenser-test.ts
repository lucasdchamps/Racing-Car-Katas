import { expect } from 'chai';
import 'mocha';
import TicketDispenser, {INumberGenerator} from '../turn-ticket-dispenser/ticket-dispenser';

describe('Turn Ticket Dispenser', () => {

	describe('TurnTicketDispenser', () => {

		it('foo', () => {
			const n = 18;
			const dispenser = new TicketDispenser();
			const ticket = dispenser.getTurnTicket(new TestableNumberGenerator(n));
			expect(ticket.getTurnNumber()).to.eql(n);
		});

		class TestableNumberGenerator implements INumberGenerator {
			private readonly n: number;
			constructor(n: number) {
				this.n = n;
			}
			public getNextNumber(): number {
				return this.n;
			}
		}
	});

});
