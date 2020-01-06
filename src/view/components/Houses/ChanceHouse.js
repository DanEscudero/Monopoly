import * as PIXI from 'pixi.js';

import { AbstractHouse } from './AbstractHouse';
import { adjustWidth } from '../../../utils/adjustText';

import questionMarkAsset from '../../../assets/questionMark.png';

export class ChanceHouse extends AbstractHouse {
	get questionMarkDimensions () {
		return { width: 256 * this._questionMarkScale, height: 256 * this._questionMarkScale };
	}

	get coreInfo () {
		return {};
	}

	_setup () {
		super._setup();

		this._questionMark = new PIXI.Sprite.from(questionMarkAsset);
		this.addChild(this._questionMark);

		this._questionMarkScale = 0.22;
		this._questionMark.scale.set(this._questionMarkScale);
		this._questionMark.anchor.set(0.5, 0.5);

		const style = new PIXI.TextStyle({
			wordWrap: true,
			wordWrapWidth: this._dimensions.width,
			align: 'center'
		});

		// Setup name text
		this._name = new PIXI.Text('Sorte', style);
		this.addChild(this._name);
	}

	_render () {
		super._render();

		const offset = 12;

		// Position text
		{
			adjustWidth(this._name, this._dimensions.width);
			const { text, style } = this._name;
			const { width, height } = new PIXI.TextMetrics.measureText(text, style);
			this._name.x = (this._dimensions.width - width) / 2;
			this._name.y = (this._dimensions.height - height) / 2 - offset;
		}

		this._questionMark.x = this._dimensions.width / 2;
		this._questionMark.y = this._dimensions.height / 2 + offset;
	}
}
