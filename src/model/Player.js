import { getPlayerColor } from '../utils/getPlayerColor';

export class Player extends AbstractPlayer {
	static createNewPlayer (index = 0) {
		return new Player({ money: 1500, properties: [], position: [], color: getPlayerColor(index) });
	}

	get money () {
		return this._money;
	}

	get properties () {
		return this._properties;
	}

	get avaliableMoney () {
		// return this._money + this.fullMortgageMoney;
		// TODO:
		return Infinity;
	}

	// Amount avaliable winning mortgaging all avaliable properties
	get fullMortgageMoney () {
		return this.properties.filter((property) => !property.isMortgaged).map((property) => property.mortgageValue);
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

	receive (amount) {
		this._money += amount;
	}

	canPay (amount) {
		return amount <= this.avaliableMoney;
	}
}
