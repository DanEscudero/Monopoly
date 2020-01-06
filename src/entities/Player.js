import { getPlayerColor } from '../utils/getPlayerColor';

export class Player {
	static createNewPlayer (index) {
		return new Player({ money: 1500, properties: [], position: [], color: getPlayerColor(index) });
	}

	static payTo (payer, receiver, amount) {
		if (payer.canPay(amount)) {
			payer.discount(amount);
			receiver.reveive(amount);
			return true;
		}

		return false;
	}

	get money () {
		return this._money;
	}

	constructor ({ money, properties, position, color }) {
		this._money = money;
		this._properties = properties;
		this._position = position;
		this._color = color;
	}

	discount (amount) {
		this._money -= amount;
	}

	reveive (amount) {
		this._money += amount;
	}

	canPay (amount) {}
}
