import * as PIXI from 'pixi.js';
import { Board } from './components/Board';
import { PropertyHouse } from './components/Houses/PropertyHouse';
import { Houses } from './config/Houses';

export class MainView extends PIXI.Container {
	constructor (dimensions) {
		super();

		this.dimensions = dimensions;
		this._cellSize = { width: 39, height: 55 };

		// this._drawOutline();
		this._setupBoard();
		// this._testHouse();

		// const airport = Houses[5];
		// const h = new GoHouse(this._cellSize, airport.properties);
		// this.addChild(h);
		// h.x = 200;
		// h.y = 200;
	}

	_drawOutline () {
		this._outline = new PIXI.Graphics();
		this.addChild(this._outline);
		this._outline.beginFill('0xffffff');
		this._outline.lineStyle(2, '0xd0d0d0');

		const { width, height } = this.dimensions;
		this._outline.drawRect(0, 0, width, height);
	}

	_setupBoard () {
		const boardSize = 9 * this._cellSize.width + 2 * this._cellSize.height;
		const boardDimensions = { width: boardSize, height: boardSize };
		this._board = new Board(boardDimensions, this._cellSize);
		this.addChild(this._board);
		this._board.x = 1;
		this._board.y = 1;
	}

	_testHouse () {
		let x = 0;
		let y = 0;
		Houses.filter((houseInfo) => houseInfo.type === 'property').forEach((houseInfo) => {
			const { properties } = houseInfo;
			const house = new PropertyHouse(this._cellSize, properties);
			this.addChild(house);

			house.x = x;
			x += 42;
			house.y = y;
			y = x >= 40 * 11 ? y + 60 : y;
			x = x >= 40 * 11 ? 0 : x;
		});
	}
}
