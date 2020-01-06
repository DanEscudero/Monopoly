import { AbstractHouse } from './AbstractHouse';
import * as PIXI from 'pixi.js';

import { adjustWidth, adjustHeight } from '../../../utils/adjustText';

// Creates house with name, image and price
export class ImageHouse extends AbstractHouse {
	// Abstract
	get assetDimensions () {
		throw new Error('Abstract method must be implemented');
	}

	// Abstract
	get coreInfo () {
		throw new Error('Abstract method must be implemented');
	}

	// Abstract - should return object with name and price
	_getAssetScale () {
		throw new Error('Abstract method must be implemented');
	}

	// Abstract
	_getAsset () {
		throw new Error('Abstract method must be implemented');
	}

	_setup () {
		super._setup();

		// Setup asset
		this._asset = new PIXI.Sprite.from(this._getAsset());
		this.addChild(this._asset);
		this._asset.anchor.set(0.5, 0);

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

		// Position asset, and draw asset outline
		{
			const assetHeight = 15;
			this._asset.scale.set(this._getAssetScale());
			this._asset.x = this._dimensions.width / 2;
			this._asset.y = nameHeight;

			const { width, height } = this.assetDimensions;
			this._outline.drawRect(this._asset.x - width / 2, this._asset.y, width, height);
		}
	}
}
