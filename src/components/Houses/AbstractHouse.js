import * as PIXI from 'pixi.js';

export class AbstractHouse extends PIXI.Container {
	constructor (dimensions, houseInfo) {
		super();

		this._dimensions = dimensions;
		this._houseInfo = houseInfo;

		this._setup();
		this._render();
	}

	_setup () {
		this._outline = new PIXI.Graphics();
		this.addChild(this._outline);
	}

	_render () {
		this._outline.lineStyle(1, '0xd0d0d0');
		const { width, height } = this._dimensions;
		this._outline.drawRect(0, 0, width, height);
	}
}
