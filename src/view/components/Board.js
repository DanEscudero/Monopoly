import * as PIXI from 'pixi.js';

import { Houses } from '../../config/Houses';

import { GoHouse } from './Houses/GoHouse';
import { JailHouse } from './Houses/JailHouse';
import { FreeHouse } from './Houses/FreeHouse';
import { ChargeHouse } from './Houses/ChargeHouse';
import { ChanceHouse } from './Houses/ChanceHouse';
import { AirportHouse } from './Houses/AirportHouse';
import { ServiceHouse } from './Houses/ServiceHouse';
import { GoToJailHouse } from './Houses/GoToJailHouse';
import { PropertyHouse } from './Houses/PropertyHouse';

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

		// this._setupBank();

		// this._debugHouses();
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
		this._createHouses();
		this._positionHouses();
	}

	_createHouses () {
		for (const houseInfo of Houses) {
			const { type } = houseInfo;
			const houseTypes = {
				go: GoHouse,
				free: FreeHouse,
				jail: JailHouse,
				charge: ChargeHouse,
				chance: ChanceHouse,
				service: ServiceHouse,
				airport: AirportHouse,
				toJail: GoToJailHouse,
				property: PropertyHouse
			};

			const HouseClass = houseTypes[type];
			const house = new HouseClass(this._cellDimensions, houseInfo.properties);
			this.addChild(house);

			this._houses.push(house);
		}
	}

	_positionHouses () {
		for (const [index, house] of this._houses.entries()) {
			const cellWidth = this._cellDimensions.width;
			const cellHeight = this._cellDimensions.height;
			let x, y, rotation;
			if (index === 0) {
				// Position Go House
				x = this._dimensions.width - cellHeight;
				y = this._dimensions.height - cellHeight;
				rotation = 0;
			} else if (index <= 9) {
				// Position bottom line
				x = this._dimensions.width - cellHeight - index * cellWidth;
				y = this._dimensions.height - this._cellDimensions.height;
				rotation = 0;
			} else if (index === 10) {
				// Position Jail
				x = 0;
				y = this._dimensions.height - this._cellDimensions.height;
				rotation = 0;
			} else if (index <= 19) {
				// Position left line
				x = cellHeight;
				y = this._dimensions.height - cellHeight - (index - 10) * cellWidth;
				rotation = 0;
				rotation = Math.PI / 2;
			} else if (index === 20) {
				// Position free stop
				x = 0;
				y = 0;
				rotation = 0;
			} else if (index <= 29) {
				// Position upper line
				x = cellHeight + (index - 20) * cellWidth;
				y = cellHeight;
				rotation = 0;
				rotation = Math.PI;
			} else if (index === 30) {
				// Position go to jail
				x = this._dimensions.width - cellHeight;
				y = 0;
				rotation = 0;
			} else if (index <= 39) {
				// Position right line
				x = this._dimensions.width - cellHeight;
				y = cellHeight + (index - 30) * cellWidth;
				rotation = 0;
				rotation = (3 * Math.PI) / 2;
			}

			house.x = x;
			house.y = y;
			house.rotation = rotation;
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
