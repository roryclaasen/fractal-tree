import { GenerateHSBColor } from './util';
import Branch from './branch';
/**
 * Tree, contains branches
 *
 * @export
 * @class Tree
 */
export default class Tree {
	/**
	 * Remkate the tree from the root with the options specified
	 *
	 * @param {P5.Vector[]} root
	 * @param {*} options
	 * @memberof Tree
	 */
	constructor(root, options) {
		this.options = options;
		this.makeTree(root, options);
	}

	/**
	 * Remkate the tree from the root with the options specified
	 *
	 * @param {P5.Vector[]} root
	 * @param {*} options
	 * @memberof Tree
	 */
	makeTree(root, options) {
		this.options = options;
		this.rootBranch = new Branch(root[0], root[1], options);
		this.branches = [];
		this.branches[0] = this.rootBranch;
		for (let i = 1; i < options.tree.maxBranches; i += 1) {
			for (let j = this.branches.length - 1; j >= 0; j -= 1) {
				const branch = this.branches[j];
				if (!branch.finished) {
					this.branches.push(branch.branch(i, false));
					this.branches.push(branch.branch(i, true));
				}
				this.branches[j].finished = true;
			}
		}
	}

	/**
	 * Draw the current Tree
	 * @param {P5} sketch
	 * @memberof Tree
	 */
	draw(sketch) {
		const { maxBranches } = this.options.tree;

		sketch.colorMode(sketch.HSB, maxBranches);

		for (let i = 0; i < this.branches.length; i += 1) {
			const branch = this.branches[i];

			sketch.stroke(GenerateHSBColor(branch.level, maxBranches, this.options.appearance.useColors));
			branch.draw(sketch);

			if (this.options.appearance.leaves && branch.level === maxBranches - 1) {
				sketch.stroke(maxBranches, 0, maxBranches, maxBranches);
				sketch.ellipse(branch.end.x, branch.end.y, 1);
			}
		}

		sketch.colorMode(sketch.RGB, 255);
	}
}
