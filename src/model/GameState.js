export class GameState {
	constructor () {
		this.nPlayers = 1; // TODO:
		this.playersState = [];
		this.playerOrder = [];
		this.propertiesState = [];
		this.currentPlayer = undefined;

		this._setupGame();
	}

	_setupGame () {
		this.playersState = Array(this.nPlayers).fill(undefined).map(() => {
			
		});
	}
}
