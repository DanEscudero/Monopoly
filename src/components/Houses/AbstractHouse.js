import * as PIXI from 'pixi.js';

export class AbstractHouse extends PIXI.Container {
	constructor (dimensions, houseProps) {
		super();

		this._dimensions = dimensions;
		this._houseProps = houseProps;

		this._initializeHouse();

		// Classes that extends this one should:
		// Implement _setup, with call to super in the begining;
		// Implement _render, with call to super in the begining;
		// Implement coreInfo getter, with all information required to render house in the board.
		// Could, optionally, implement _initializeHouse as well
	}

	_initializeHouse () {
		this._setup();
		this._render();
	}

	/**
	 * Initializes outline graphics;
	 * Setup Button mode
	 */
	_setup () {
		this._outline = new PIXI.Graphics();
		this.addChild(this._outline);

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
		this._infoButton.on('click', () => console.log(this._houseProps));
	}

	/**
	 * Draws outline
	 */
	_render () {
		this._outline.lineStyle(1, '0xd0d0d0');
		const { width, height } = this._dimensions;
		this._outline.drawRect(0, 0, width, height);
	}
}
