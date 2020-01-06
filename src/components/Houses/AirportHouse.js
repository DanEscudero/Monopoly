import { AbstractHouse } from './AbstractHouse';
import * as PIXI from 'pixi.js';

import airplaneAsset from '../../assets/airplane.png';
import { adjustWidth, adjustHeight } from '../../utils/adjustText';

export class AirportHouse extends AbstractHouse {
	get planeDimensions () {
		return { width: 128 * this._planeScale, height: 128 * this._planeScale };
	}

	/**
	 * Returns info needed to render card miniature on board
	 */
	get coreInfo () {
		const { name, info } = this._houseProps;
		const { price } = info;

		return { name, price };
	}

	_setup () {
		super._setup();

		this._airplane = new PIXI.Sprite.from(airplaneAsset);
		this.addChild(this._airplane);
		this._airplane.anchor.set(0.5, 0);

		this._planeScale = 1;

		const { name, price } = this.coreInfo;

		const style = new PIXI.TextStyle({
			wordWrap: true,
			wordWrapWidth: this._dimensions.width,
			align: 'center'
		});
		// Setup name text
		this._name = new PIXI.Text(name, style);
		this.addChild(this._name);

		// Setup price text
		this._price = new PIXI.Text(price);
		this.addChild(this._price);
		this._priceHeight = 21;
	}

	_render () {
		super._render();

		const nameHeight = 20;
		adjustWidth(this._name, this._dimensions.width);
		adjustHeight(this._name, nameHeight);
		adjustHeight(this._price, this._priceHeight);

		// Position texts
		{
			const { text, style } = this._name;
			const { width } = PIXI.TextMetrics.measureText(text, style);
			this._name.x = (this._dimensions.width - width) / 2;
			this._name.y = 0;
		}
		{
			const { text, style } = this._price;
			const { height, width } = PIXI.TextMetrics.measureText(text, style);
			this._price.x = (this._dimensions.width - width) / 2;
			this._price.y = this._dimensions.height - height;
		}

		// Position plane, and draw plane outline
		{
			const planeHeight = 15;
			this._planeScale = planeHeight / this.planeDimensions.height;
			this._airplane.scale.set(this._planeScale);
			this._airplane.x = this._dimensions.width / 2;
			this._airplane.y = nameHeight;

			const { width, height } = this.planeDimensions;
			this._outline.drawRect(this._airplane.x - width / 2, this._airplane.y, width, height);
		}
	}
}
