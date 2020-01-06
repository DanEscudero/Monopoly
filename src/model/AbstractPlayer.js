export class AbstractPlayer {
	static payTo (payer, receiver, amount) {
		const canPay = payer.canPay(amount);

		if (canPay) {
			payer.discount(amount);
			receiver.receive(amount);
		}

		return canPay;
	}

	// Abstract
	discount () {
		throw new Error('Abstract method must be implemented');
	}

	// Abstract
	receive () {
		throw new Error('Abstract method must be implemented');
	}

	// Abstract
	canPay () {
		throw new Error('Abstract method must be implemented');
	}
}
