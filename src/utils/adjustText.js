import * as PIXI from 'pixi.js';

const fontSizeTreshold = 4;
export function adjustWidth (text, width) {
	let curWidth = PIXI.TextMetrics.measureText(text.text, text.style).width;

	while (curWidth > width && text.style.fontSize >= fontSizeTreshold) {
		text.style.fontSize -= 0.5;
		curWidth = PIXI.TextMetrics.measureText(text.text, text.style).width;
	}
}

export function adjustHeight (text, height) {
	let curHeight = PIXI.TextMetrics.measureText(text.text, text.style).height;

	while (curHeight > height && text.style.fontSize >= fontSizeTreshold) {
		text.style.fontSize -= 0.5;
		curHeight = PIXI.TextMetrics.measureText(text.text, text.style).height;
	}
}
