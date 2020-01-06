import { AbstractPlayer } from './AbstractPlayer';

export class Bank extends AbstractPlayer {
	discount () {}

	receive () {}

	canPay () {
		return true;
	}
}
