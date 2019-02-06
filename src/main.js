import * as PIXI from 'pixi.js';
import { MainView } from './MainView';

const dimensions = { width: 540, height: 463 };
const app = new PIXI.Application({
	width: dimensions.width,
	height: dimensions.height,
	resolution: 2,
	backgroundColor: 0xffffff
});

document.body.appendChild(app.view);

const mainView = new MainView(dimensions);

app.stage.addChild(mainView);
