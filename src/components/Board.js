import * as PIXI from 'pixi.js';
import { Houses } from '../config/houses';

export class Board extends PIXI.Container {
	constructor (dimensions, cellDimensions) {
		super();

		this._dimensions = dimensions;
		this._cellDimensions = cellDimensions;

		const { width, height } = dimensions;
		this._bounds = new PIXI.Rectangle(0, 0, width, height);

		this._guideLines = new PIXI.Graphics();
		this.addChild(this._guideLines);

		this._drawOutline();
		this._setupHouses();

		this._debugHouses();
	}

	getHouse (index) {}

	_drawOutline () {
		this._guideLines.beginFill('0xffffff');
		this._guideLines.lineStyle(1, '0x000000');
		this._guideLines.drawShape(this._bounds);

		this._guideLines.drawRect(
			this._cellDimensions.height,
			this._cellDimensions.height,
			9 * this._cellDimensions.width,
			9 * this._cellDimensions.width
		);
	}

	_setupHouses () {
		this._houses = [];
		console.log(Houses);
	}

	_debugHouses () {
		const { width, height } = this._cellDimensions;
		for (let i = 0; i <= 9; i++) {
			const current = height + width * i;
			this._guideLines.moveTo(current, 0);
			this._guideLines.lineTo(current, height);

			this._guideLines.moveTo(current, height + 9 * width);
			this._guideLines.lineTo(current, 2 * height + 9 * width);

			this._guideLines.moveTo(0, current);
			this._guideLines.lineTo(height, current);

			this._guideLines.moveTo(height + 9 * width, current);
			this._guideLines.lineTo(2 * height + 9 * width, current);
		}
	}
}
