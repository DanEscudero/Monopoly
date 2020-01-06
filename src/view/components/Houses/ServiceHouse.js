import waterService from '../../../assets/waterService.png';
import lightService from '../../../assets/lightService.png';

import { ImageHouse } from './ImageHouse';

export class ServiceHouse extends ImageHouse {
	get assetDimensions () {
		const scale = this._getAssetScale();
		return { width: 256 * scale, height: 256 * scale };
	}

	get coreInfo () {
		const { name, info } = this._houseProps;
		const { price } = info;

		return { name, price };
	}

	_getAssetScale () {
		return 0.05;
	}

	_getAsset () {
		const assets = {
			light: lightService,
			water: waterService
		};

		return assets[this._houseProps.info.type];
	}
}
