import { AbstractHouse } from './AbstractHouse';

export class CornerHouse extends AbstractHouse {
	_initializeHouse () {
		// Override dimensions: Corner houses should be square, with (height x height) instead of (width x height)
		this._dimensions = { width: this._dimensions.height, height: this._dimensions.height };
		super._initializeHouse();
	}
}
