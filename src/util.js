/**
 * Generates a HSB array
 * @export
 * @param {number} index
 * @param {number} max
 * @param {boolean} useColor
 * @returns {[number, number, number, number]} HSBA array
 */
export function GenerateHSBColor(index, max, useColor = true) {
	let h = max;
	let s = 0;
	const b = max;
	if (useColor) {
		h = index;
		s = max;
	}
	return [h, s, b, max];
}

export default { GenerateHSBColor };
