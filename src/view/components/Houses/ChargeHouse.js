import { AbstractHouse } from './AbstractHouse';
import { adjustWidth, adjustHeight } from '../../../utils/adjustText';

export class ChargeHouse extends AbstractHouse {
	get coreInfo () {
		const { name } = this._houseProps;
		return { name };
	}

	_setup () {
		super._setup();

		const { name, info } = this._houseProps;
		const value = info.pay;

		const style = new PIXI.TextStyle({
			wordWrap: true,
			wordWrapWidth: this._dimensions.width,
			align: 'center'
		});
		// Setup name text
		this._name = new PIXI.Text(name, style);
		this.addChild(this._name);

		// Setup price text
		this._value = new PIXI.Text(value);
		this.addChild(this._value);
		this._valueHeight = 21;
	}

	_render () {
		super._render();

		{
			const avaliableWidth = this._dimensions.width * 0.9;
			adjustWidth(this._name, avaliableWidth);

			const { text, style } = this._name;
			const { width } = PIXI.TextMetrics.measureText(text, style);
			this._name.x = (this._dimensions.width - width) / 2;
		}

		{
			adjustHeight(this._value, this._valueHeight);

			const { text, style } = this._value;
			const { width, height } = PIXI.TextMetrics.measureText(text, style);
			this._value.x = (this._dimensions.width - width) / 2;
			this._value.y = this._dimensions.height - height;
		}
	}
}
