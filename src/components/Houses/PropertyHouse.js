import * as PIXI from 'pixi.js';
import { AbstractHouse } from './AbstractHouse';
import { getColorByGroup } from '../../utils/ColorGroup';
import { adjustWidth, adjustHeight } from '../../utils/adjustText';

export class PropertyHouse extends AbstractHouse {
	/**
	 * Returns info needed to render card miniature on board
	 */
	get coreInfo () {
		const { name, colorGroup, info } = this._houseInfo;
		const { price } = info;

		return { name, colorGroup, price };
	}

	_setup () {
		super._setup();

		const { name, colorGroup, price } = this.coreInfo;
		const color = getColorByGroup(colorGroup);
		this._colorHeight = 10;

		// Setup color block
		this._colorBlock = new PIXI.Graphics();
		this._colorBlock.beginFill(color);
		this.addChild(this._colorBlock);

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

		// Setup button
		this._infoButton = new PIXI.Container();
		this.addChild(this._infoButton);
		this._infoButton.interactive = true;
		this._infoButton.buttonMode = true;
		const { width, height } = this._dimensions;
		this._infoButton.hitArea = new PIXI.Rectangle(0, 0, width, height);
		this._setupButtonEvents();
	}

	_setupButtonEvents () {
		this._infoButton.on('click', () => console.log(this._houseInfo));
	}

	_render () {
		super._render();
		this._colorBlock.drawRect(
			0,
			0,
			this._dimensions.width,
			this._colorHeight
		);

		// Update text font sizes to fit
		const nameHeight =
			this._dimensions.height - this._colorHeight - this._priceHeight;
		adjustWidth(this._name, this._dimensions.width);
		adjustHeight(this._name, nameHeight);
		adjustHeight(this._price, this._priceHeight);

		// Position texts
		{
			const { text, style } = this._name;
			const { width } = PIXI.TextMetrics.measureText(text, style);
			this._name.x = (this._dimensions.width - width) / 2;
			this._name.y = this._colorHeightca;
		}
		{
			const { text, style } = this._price;
			const { height, width } = PIXI.TextMetrics.measureText(text, style);
			this._price.x = (this._dimensions.width - width) / 2;
			this._price.y = this._dimensions.height - height;
		}
	}
}
