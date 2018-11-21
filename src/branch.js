import P5 from 'p5';

import { NormalizeHSBColor } from './util';

/**
 * Branches for the Tree
 *
 * @export
 * @class Branch
 */
export default class Branch {
	/**
	 * Creates an instance of Branch.
	 * @param {P5.Vector} begin Start Node
	 * @param {P5.Vector} end End Node
	 * @param {*} options
	 * @param {number} [level=0] How far along is the Branch
	 * @memberof Branch
	 */
	constructor(begin, end, options, level = 0) {
		this.begin = begin;
		this.end = end;
		this.options = options;
		this.level = level;

		this.finished = false;

		this.numSegments = 4;
		this.tStep = 1.0 / this.numSegments;
	}

	/**
	 * Draw the current branch
	 * @param {P5} sketch
	 * @param {number} saturation
	 * @param {number} brightness
	 * @memberof Branch
	 */
	draw(sketch, saturation, brightness) {
		const { appearance } = this.options;
		if (!appearance.gradient) {
			sketch.stroke(NormalizeHSBColor(this.level, saturation, brightness, this.options.tree.maxBranches));
			sketch.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
		} else {
			const colorStart = sketch.color(NormalizeHSBColor(this.level, saturation, brightness, this.options.tree.maxBranches - 1));
			const colorEND = sketch.color(NormalizeHSBColor(this.level + 1, saturation, brightness, this.options.tree.maxBranches - 1));

			const delta = P5.Vector.sub(this.end, this.begin);
			let t = 0.0;

			for (let i = 0; i < this.numSegments; i += 1) {
				const colorPos = i * (1 / this.numSegments);
				const stroke = sketch.lerpColor(colorStart, colorEND, colorPos);
				sketch.stroke(stroke);

				const nextT = t + this.tStep;
				sketch.line(this.begin.x + delta.x * t, this.begin.y + delta.y * t, this.begin.x + delta.x * nextT, this.begin.y + delta.y * nextT);
				t = nextT;
			}
		}
	}

	/**
	 * Create child branch, left or right
	 * @param {boolean} [left=false] Is the left most branch
	 * @returns {Branch} New child Branch Object
	 * @memberof Branch
	 */
	branch(left = false) {
		const { mutate } = this.options;
		const { angle, branchMultiplier } = this.options.tree;

		const dir = P5.Vector.sub(this.end, this.begin);
		let newAngle = angle;
		let multiplier = branchMultiplier || 1;
		if (mutate.active) {
			newAngle += Math.random() * mutate.angle;
			multiplier += ((Math.random() * 2) - 1) * mutate.branchMultiplier;
		}
		newAngle *= left ? 1 : -1;
		dir.rotate(newAngle);
		dir.mult(multiplier);

		const newEnd = P5.Vector.add(this.end, dir);
		const branch = new Branch(this.end, newEnd, this.options, this.level + 1);
		return branch;
	}
}
