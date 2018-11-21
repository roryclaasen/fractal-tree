/**
 * Makes sure that the HSB color is withen color bounds
 *
 * @export
 * @param {number} H Hue
 * @param {number} S Saturation
 * @param {number} B Brightness
 * @param {number} [max=360] Color range
 * @returns {[number, number, number, number]} HSBA array
 */
export function NormalizeHSBColor(H, S, B, max = 360) {
	let h = H;
	let s = S;
	let b = B;
	if (h > max) h = max;
	if (h < 0) h = 0;
	if (s > max) s = max;
	if (s < 0) s = 0;
	if (b > max) b = max;
	if (b < 0) b = 0;
	return [h, s, b, max];
}

export default { NormalizeHSBColor };
