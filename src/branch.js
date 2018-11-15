import P5 from 'p5';

export default class Branch {
	constructor(begin, end, angle, branchMultiplier, level = 0) {
		this.begin = begin;
		this.end = end;
		this.angle = angle;
		this.branchMultiplier = branchMultiplier;
		this.level = level;

		this.finished = false;
	}

	draw(sketch) {
		sketch.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

	branch(level, left = false) {
		const dir = P5.Vector.sub(this.end, this.begin);
		dir.rotate(this.angle * (left ? 1 : -1));
		dir.mult(this.branchMultiplier);
		const newEnd = P5.Vector.add(this.end, dir);
		const branch = new Branch(this.end, newEnd, this.angle, this.branchMultiplier, level);
		return branch;
	}
}
