import * as PIXI from 'pixi.js';
import { Houses } from '../config/Houses';
import { PropertyHouse } from './Houses/PropertyHouse';
import { AirportHouse } from './Houses/AirportHouse';

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
		let house;
		for (const houseInfo of Houses) {
			const { type } = houseInfo;
			switch (type) {
				case 'property':
					house = new PropertyHouse(this._cellDimensions, houseInfo.properties);
					this.addChild(house);
					break;

				case 'airport':
					house = new AirportHouse(this._cellDimensions, houseInfo.properties);
					this.addChild(house);
					break;

				default:
					house = houseInfo;
					break;
			}
			this._houses.push(house);
		}

		for (const [index, house] of this._houses.entries()) {
			const cellWidth = this._cellDimensions.width;
			const cellHeight = this._cellDimensions.height;
			let x, y;
			if (index === 0) {
				// Position Go House
				x = this._dimensions.width - cellHeight;
				y = this._dimensions.height - cellHeight;
			} else if (index <= 9) {
				// Position bottom line
				x = this._dimensions.width - cellHeight - index * cellWidth;
				y = this._dimensions.height - this._cellDimensions.height;
			} else if (index === 10) {
				// Position Jail
				x = 0;
				y = this._dimensions.height - this._cellDimensions.height;
			} else if (index <= 19) {
				// Position left line
				x = cellHeight;
				y = this._dimensions.height - cellHeight - (index - 10) * cellWidth;
				house.rotation = Math.PI / 2;
			} else if (index === 20) {
				// Position free stop
				x = 0;
				y = 0;
			} else if (index <= 29) {
				// Position upper line
				x = cellHeight + (index - 20) * cellWidth;
				y = cellHeight;
				house.rotation = Math.PI;
			} else if (index === 30) {
				// Position go to jail
				x = this._dimensions.width - cellHeight;
				y = 0;
			} else if (index <= 39) {
				// Position right line
				x = this._dimensions.width - cellHeight;
				y = cellHeight + (index - 30) * cellWidth;
				house.rotation = (3 * Math.PI) / 2;
			}

			house.x = x;
			house.y = y;
		}
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
