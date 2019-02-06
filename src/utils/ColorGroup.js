export function getColorByGroup (groupID) {
	return ColorGroups[groupID];
}

export const ColorGroups = Object.freeze({
	1: '0x712726', // Brown
	2: '0xA8E7FF', // Light Blue
	3: '0xF43FFF', // Pink
	4: '0xF05738', // Orange
	5: '0xFF1B1B', // Red
	6: '0xF0FF00', // Yellow
	7: '0x1CCE00', // Green
	8: '0x2200FF' // Dark Blue
});
