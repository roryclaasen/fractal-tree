import P5 from 'p5';

/**
 * Branches for the tree
 *
 * @export
 * @class Branch
 */
export default class Branch {
	/**
	 * Creates an instance of Branch.
	 * @param {P5.Vector} begin
	 * @param {P5.Vector} end
	 * @param {*} options
	 * @param {number} [level=0]
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
	 * @param {*} sketch
	 * @memberof Branch
	 */
	draw(sketch) {
		sketch.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

	/**
	 * Create child branch, left or right
	 * @param {number} level
	 * @param {boolean} [left=false]
	 * @returns {Branch}
	 * @memberof Branch
	 */
	branch(level, left = false) {
		const { angle, branchMultiplier } = this.options;

		const dir = P5.Vector.sub(this.end, this.begin);
		dir.rotate(angle * (left ? 1 : -1));
		if (branchMultiplier) dir.mult(branchMultiplier);

		const newEnd = P5.Vector.add(this.end, dir);
		const branch = new Branch(this.end, newEnd, this.options, level);
		return branch;
	}
}
