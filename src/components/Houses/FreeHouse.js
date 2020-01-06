import * as PIXI from 'pixi.js';

import { CornerHouse } from './CornerHouse';
import { adjustWidth, adjustHeight } from '../../utils/adjustText';

import carAsset from '../../assets/car.png';

export class FreeHouse extends CornerHouse {
	get carDimensions () {
		return { width: 1859 * this._carScale, height: 534 * this._carScale };
	}

	getCoreInfo () {
		return {};
	}

	_setup () {
		super._setup();

		this._car = new PIXI.Sprite.from(carAsset);
		this.addChild(this._car);
		this._car.anchor.set(0.5, 0.5);

		this._carScale = 0.02;
		this._car.scale.set(this._carScale);

		const style = new PIXI.TextStyle({
			wordWrap: true,
			wordWrapWidth: this._dimensions.width,
			align: 'center'
		});

		// Setup name text
		this._name = new PIXI.Text('Parada Livre', style);
		this.addChild(this._name);
	}

	_render () {
		super._render();

		adjustWidth(this._name, this._dimensions.width);

		const yOffset = 4;
		this._car.y = this._dimensions.height - this.carDimensions.height / 2 - yOffset;
		this._car.x = this._dimensions.width / 2;
	}
}
