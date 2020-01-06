import * as PIXI from 'pixi.js';

import { CornerHouse } from './CornerHouse';

export class GoHouse extends CornerHouse {
	get coreInfo () {
		const { name } = this._houseProps;
		return { name };
	}

	_setup () {
		super._setup();

		this._arrowGraphics = new PIXI.Graphics();
		this.addChild(this._arrowGraphics);

		const { name } = this.coreInfo;
		this._goText = new PIXI.Text(name);
		this.addChild(this._goText);
	}

	_render () {
		super._render();

		this._arrowGraphics.clear();
		this._arrowGraphics.beginFill('0x00e02f');
		this._arrowGraphics.lineStyle(1, '0xffffff');

		const points = this._getArrowPoints();
		this._arrowGraphics.drawPolygon(points);

		const { text, style } = this._goText;
		const { height, width } = PIXI.TextMetrics.measureText(text, style);
		this._goText.x = 0.5 * (this._dimensions.width - width);
		this._goText.y = this._dimensions.height - height;
	}

	_getArrowPoints () {
		let x, y;
		const points = [];

		const tailHeight = 10;
		const arrowHeight = 8;
		const tailLength = 17;
		const arrowWidth = 15;

		x = 0;
		y = arrowHeight + tailHeight * 0.5;
		points.push({ x, y });

		x = arrowWidth;
		y = 0;
		points.push({ x, y });

		x = arrowWidth;
		y = arrowHeight;
		points.push({ x, y });

		x = tailLength + arrowWidth;
		y = arrowHeight;
		points.push({ x, y });

		x = tailLength + arrowWidth;
		y = arrowHeight + tailHeight;
		points.push({ x, y });

		x = arrowWidth;
		y = arrowHeight + tailHeight;
		points.push({ x, y });

		x = arrowWidth;
		y = 2 * arrowHeight + tailHeight;
		points.push({ x, y });

		const xOff = 0.5 * (this._dimensions.width - (arrowWidth + tailLength));
		const { text, style } = this._goText;
		const textHeight = PIXI.TextMetrics.measureText(text, style).height;
		const yOff = 0.5 * (this._dimensions.height - textHeight - (2 * arrowHeight + tailHeight));
		return points.map((pt) => new PIXI.Point(pt.x + xOff, pt.y + yOff));
	}
}
