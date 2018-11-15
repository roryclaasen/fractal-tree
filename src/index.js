import { GUI } from 'dat.gui';
import P5 from 'p5';
import Tree from './tree';

const options = {
	length: 200,
	treeLength: 10,
	angle: Math.PI / 4,
	branchMultiplier: 0.67,
	xOffset: 0,
	yOffset: 0,
	showGround: true,
	useColors: true,
	background: '#000000',
	leaves: true,
	mirror: 'off',
	mirrorOptions: ['off', 'y', 'x y']
};

const width = window.innerWidth;
const height = window.innerHeight;

/* eslint-disable no-unused-vars */
const myp5 = new P5((sketch) => {
	function root(dir = 0) {
		const x = width / 2;
		const y = height;
		if (dir === 1) return [
			sketch.createVector(x, y),
			sketch.createVector(x, y + options.length)
		];
		if (dir === 2) return [
			sketch.createVector(x, y),
			sketch.createVector(x + options.length, y)
		];
		if (dir === 3) return [
			sketch.createVector(x, y),
			sketch.createVector(x - options.length, y)
		];
		return [
			sketch.createVector(x, y),
			sketch.createVector(x, y - options.length)
		];
	}

	const trees = [];
	trees[0] = new Tree(root(), options);

	function makeTrees() {
		for (let i = 0; i < trees.length; i += 1) {
			if (trees[i]) trees[i].makeTree(root(i), options);
		}
	}

	// DAT GUI OPTIONS

	const gui = new GUI();

	const optLength = gui.add(options, 'length', 0, 500);
	optLength.onChange((val) => makeTrees());

	const optTreeLength = gui.add(options, 'treeLength', 1, 20);
	optTreeLength.onChange((val) => makeTrees());

	const optAngle = gui.add(options, 'angle', 0, Math.PI);
	optAngle.onChange((val) => makeTrees());

	const optBranchMultiplier = gui.add(options, 'branchMultiplier', 0.1, 1);
	optBranchMultiplier.onChange((val) => makeTrees());

	const offset = gui.addFolder('Offset');
	offset.add(options, 'xOffset', -width, width);
	offset.add(options, 'yOffset', -height, height);

	const appearance = gui.addFolder('Appearance');

	appearance.add(options, 'useColors');
	appearance.addColor(options, 'background');
	appearance.add(options, 'leaves');
	appearance.add(options, 'showGround');

	const mirror = appearance.add(options, 'mirror', options.mirrorOptions);
	mirror.onChange((val) => {
		const index = options.mirrorOptions.indexOf(val);
		for (let i = 0; i < trees.length; i += 1) {
			trees.pop();
		}
		trees[0] = new Tree(root(0), options);
		if (index === 1) {
			trees.push(new Tree(root(1), options));
		}
		if (index === 2) {
			trees.push(new Tree(root(1), options));
			trees.push(new Tree(root(2), options));
			trees.push(new Tree(root(3), options));
		}
	});

	// P5 Renderer

	sketch.setup = () => {
		sketch.createCanvas(width, height);
	};

	sketch.draw = () => {
		sketch.background(options.background);
		sketch.translate(0, -options.yOffset);
		if (options.showGround) {
			sketch.stroke(255);
			sketch.line(0, root()[0].y - 1, width, root()[0].y - 1);
		}
		sketch.translate(options.xOffset, 0);

		for (let i = 0; i < trees.length; i += 1) {
			if (trees[i]) trees[i].draw(sketch);
		}
	};
}, document.getElementById('root'));
