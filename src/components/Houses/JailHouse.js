import * as PIXI from 'pixi.js';

import { CornerHouse } from './CornerHouse';
import { adjustWidth } from '../../utils/adjustText';

import jailBarsAsset from '../../assets/jailBars.png';

export class JailHouse extends CornerHouse {
	get jailBarDimensions () {
		return { width: 600 * this._jailBarsScale, height: 600 * this._jailBarsScale };
	}

	getCoreInfo () {
		return {};
	}

	_setup () {
		super._setup();

		const style = new PIXI.TextStyle(this._getNameStyle());

		this._name = new PIXI.Text(name, style);
		this.addChild(this._name);

		this._jailBars = new PIXI.Sprite.from(jailBarsAsset);
		this.addChild(this._jailBars);
		this._jailBars.anchor.set(0.5, 0.5);

		this._jailBarsScale = 0.05;
	}

	_render () {
		super._render();

		this._name.text = this._getNameText();
		adjustWidth(this._name, this._dimensions.width);

		this._jailBars.scale.set(this._jailBarsScale);

		const offset = 10;
		const jailBarsPosition = { x: this._dimensions.width / 2, y: this._dimensions.height / 2 + offset };
		this._jailBars.x = jailBarsPosition.x;
		this._jailBars.y = jailBarsPosition.y;
	}

	_getNameStyle () {
		return {
			wordWrap: true,
			wordWrapWidth: this._dimensions.width,
			align: 'center'
		};
	}

	_getNameText () {
		return 'Prisão';
	}
}
