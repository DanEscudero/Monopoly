export function getPlayerColor (index) {
	const colors = ['red', 'blue', 'green', 'yellow', 'white', 'black'];
	return colors[index % colors.length];
}
