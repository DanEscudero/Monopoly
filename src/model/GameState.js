import _ from 'lodash';

import { Player } from './Player';
import { Houses } from '../config/Houses';

export class GameState {
	constructor () {
		this.nPlayers = 1; // TODO:
		this._setupPlayers();
		this._setupProperties();

		this.propertiesState = [];
		this.currentPlayer = undefined;
	}

	_setupPlayers () {
		this.playersState = Array(this.nPlayers)
			.fill(undefined)
			.map((_, index) => {
				return Player.createNewPlayer(index + 1);
			});

		this.playerOrder = this.playersState.map((player) => player.index);
	}

	_setupProperties () {
		const buyableTypes = ['property', 'airport', 'service'];
		const isBuyable = (house) => buyableTypes.includes(house.type);

		const setHouseState = (house) => {
			return _.merge({}, house, { owner: 'bank', isMortgaged: false });
		};

		this.propertiesState = Houses.filter(isBuyable).map(setHouseState);
	}
}
