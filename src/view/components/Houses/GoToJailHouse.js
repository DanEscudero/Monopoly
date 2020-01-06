import * as PIXI from 'pixi.js';

import { JailHouse } from './JailHouse';
import { adjustWidth } from '../../utils/adjustText';

export class GoToJailHouse extends JailHouse {
	_getNameText () {
		return 'Vá para Prisão';
	}

	_render () {
		super._render();

		const avaliableWidth = this._dimensions.width * 0.55;
		adjustWidth(this._name, avaliableWidth);

		const { text, style } = this._name;
		const { width } = PIXI.TextMetrics.measureText(text, style);

		this._name.x = (this._dimensions.width - width) / 2;
	}
}
