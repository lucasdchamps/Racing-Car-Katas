import TurnNumberSequence from './turn-number-sequence';
import TurnTicket from './turn-ticket';

export default class TicketDispenser {

	public getTurnTicket(generator: INumberGenerator = new NumberGenerator()) {
		const newTurnNumber = generator.getNextNumber();
		const newTurnTicket = new TurnTicket(newTurnNumber);

		return newTurnTicket;
	}

}

export interface INumberGenerator {
	getNextNumber(): number;
}

class NumberGenerator implements INumberGenerator {
	public getNextNumber() {
		return TurnNumberSequence.getNextTurnNumber();
	}
}
