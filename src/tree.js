import Branch from './branch';

export default class Tree {
	constructor(root, options) {
		this.options = options;
		this.makeTree(root, options);
	}

	makeTree(root, options) {
		this.options = options;
		this.rootBranch = new Branch(root[0], root[1], options.angle, options.branchMultiplier);
		this.branches = [];
		this.branches[0] = this.rootBranch;
		for (let i = 0; i < options.treeLength; i += 1) {
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

	draw(sketch) {
		sketch.colorMode(sketch.HSB, this.options.treeLength);
		for (let i = 0; i < this.branches.length; i += 1) {
			const branch = this.branches[i];
			sketch.stroke(this.generateColor(branch.level, this.options.treeLength));
			branch.draw(sketch);
		}
		sketch.colorMode(sketch.RGB, 255);
	}

	generateColor(index, length) {
		let h = length;
		let s = 0;
		const b = length;
		if (this.options.useColors) {
			s = length;
			h = index;
		}
		return [h, s, b, length];
	}
}
