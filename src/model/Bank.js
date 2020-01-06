import { AbstractPlayer } from './AbstractPlayer';

export class Bank extends AbstractPlayer {
	discount (amount) {}

	receive (amount) {}

	canPay (amount) {
		return true;
	}
}
