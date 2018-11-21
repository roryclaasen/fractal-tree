import P5 from 'p5';

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
	}

	/**
	 * Draw the current branch
	 * @param {P5} sketch
	 * @memberof Branch
	 */
	draw(sketch) {
		sketch.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

	/**
	 * Create child branch, left or right
	 * @param {number} level How far along is the Branch
	 * @param {boolean} [left=false] Is the left most branch
	 * @returns {Branch} New child Branch Object
	 * @memberof Branch
	 */
	branch(level, left = false) {
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
		const branch = new Branch(this.end, newEnd, this.options, level);
		return branch;
	}
}
