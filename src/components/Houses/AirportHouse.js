import airplaneAsset from '../../assets/airplane.png';
import { ImageHouse } from './ImageHouse';

export class AirportHouse extends ImageHouse {
	get assetDimensions () {
		const scale = this._getAssetScale();
		return { width: 128 * scale, height: 128 * scale };
	}

	get coreInfo () {
		const { name, info } = this._houseProps;
		const { price } = info;

		return { name, price };
	}

	_getAssetScale () {
		return 0.1;
	}

	_getAsset () {
		return airplaneAsset;
	}
}
