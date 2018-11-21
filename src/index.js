/* eslint-disable no-unused-vars */

import { GUI } from 'dat.gui';
import P5 from 'p5';

import Tree from './tree';

const width = window.innerWidth;
const height = window.innerHeight;

const options = {
	tree: {
		length: 200,
		maxBranches: 10,
		angle: Math.PI / 4,
		branchMultiplier: 0.67,
		reset: () => {
			options.tree.length = 200;
			options.tree.maxBranches = 10;
			options.tree.angle = Math.PI / 4;
			options.tree.branchMultiplier = 0.67;
			// eslint-disable-next-line no-use-before-define
			makeTrees();
		}
	},
	mutate: {
		active: false,
		branch: 1,
		angle: 0,
		branchMultiplier: 0,
		make: () => {
			// eslint-disable-next-line no-use-before-define
			makeTrees();
		},
		reset: () => {
			options.mutate.active = false;
			options.mutate.branch = 0;
			options.mutate.angle = 1;
			options.mutate.branchMultiplier = 0;
		}
	},
	transform: {
		xOffset: 0,
		yOffset: 0,
		scale: 1,
		rotate: 0,
		center: () => {
			options.transform.xOffset = 0;
			options.transform.yOffset = height / 2;
		},
		reset: () => {
			options.transform.xOffset = 0;
			options.transform.yOffset = 0;
			options.transform.scale = 1;
			options.transform.rotate = 0;
		}
	},
	appearance: {
		saturation: 360,
		brightness: 360,
		gradient: false,
		weight: 1,
		background: '#000000',
		leaves: true,
		mirror: 'off',
		mirrorOptions: ['off', 'y', 'x y'],
		reset: () => {
			options.appearance.saturation = 360;
			options.appearance.brightness = 360;
			options.appearance.gradient = false;
			options.appearance.weight = 1;
			options.appearance.background = '#000000';
			options.appearance.weight = true;
			options.appearance.mirror = 'off';
		}
	},
	save: () => {
		// eslint-disable-next-line no-use-before-define
		myp5.saveCanvas('fractal_tree');
	}
};

/**
 * Creates the two root vectors
 * @returns {P5.Vector[]}
 */
function root() {
	const x = 0;
	const y = 0;
	return [
		new P5.Vector(x, y),
		new P5.Vector(x, y - options.tree.length)
	];
}

const tree = new Tree(root(), options);

function makeTrees() {
	tree.makeTree(root(), options);
}

const gui = new GUI();
const treeOptions = gui.addFolder('Tree');
treeOptions.add(options.tree, 'length', 0, 500).onChange((val) => makeTrees()).listen();
treeOptions.add(options.tree, 'maxBranches', 1, 20, 1).onChange((val) => makeTrees()).listen();
treeOptions.add(options.tree, 'angle', -Math.PI, Math.PI, 0.1).onChange((val) => makeTrees()).listen();
treeOptions.add(options.tree, 'branchMultiplier', 0.1, 2).onChange((val) => makeTrees()).listen();
treeOptions.add(options.tree, 'reset');

const mutate = gui.addFolder('Mutate');
mutate.add(options.mutate, 'active').onChange((val) => makeTrees());
mutate.add(options.mutate, 'branch', 0, 1, 0.05).onChange((val) => makeTrees()).listen();
mutate.add(options.mutate, 'angle', 0, Math.PI, 0.1).onChange((val) => makeTrees()).listen();
mutate.add(options.mutate, 'branchMultiplier', 0, 1, 0.05).onChange((val) => makeTrees()).listen();
mutate.add(options.mutate, 'make');
mutate.add(options.mutate, 'reset');

const offset = gui.addFolder('Transform');
offset.add(options.transform, 'xOffset', -width, width).listen();
offset.add(options.transform, 'yOffset', -height, height).listen();
offset.add(options.transform, 'scale', 0, 5, 0.01).listen();
offset.add(options.transform, 'rotate', -Math.PI, Math.PI, 0.01).listen();
offset.add(options.transform, 'center');
offset.add(options.transform, 'reset');

const appearance = gui.addFolder('Appearance');
appearance.add(options.appearance, 'saturation', 0, 360).listen();
appearance.add(options.appearance, 'brightness', 0, 360).listen();
appearance.add(options.appearance, 'gradient').listen();
appearance.add(options.appearance, 'weight', 1, 15, 1).listen();
appearance.addColor(options.appearance, 'background').listen();
appearance.add(options.appearance, 'leaves').listen();
appearance.add(options.appearance, 'mirror', options.appearance.mirrorOptions).listen();
appearance.add(options.appearance, 'reset');

gui.add(options, 'save');

/**
 * Wrapper function for sketch
 * (also provides JS intellisense in Visual Studio Code)
 * @param {P5} sketch
 */
function renderer(sketch) {
	sketch.setup = () => {
		sketch.createCanvas(width, height);
	};

	sketch.draw = () => {
		sketch.background(options.appearance.background);

		sketch.push();
		sketch.translate(width / 2, height);
		sketch.translate(options.transform.xOffset, -options.transform.yOffset);
		sketch.rotate(options.transform.rotate);
		sketch.scale(options.transform.scale);

		const mirrorIndex = options.appearance.mirrorOptions.indexOf(options.appearance.mirror);

		tree.draw(sketch);

		if (mirrorIndex >= 1) {
			sketch.push();
			sketch.rotate(Math.PI);
			tree.draw(sketch);
			sketch.pop();
		}

		if (mirrorIndex === 2) {
			sketch.push();
			sketch.rotate(Math.PI / 2);
			tree.draw(sketch);
			sketch.rotate(Math.PI);
			tree.draw(sketch);
			sketch.pop();
		}

		sketch.pop();
	};
}

const myp5 = new P5(renderer, document.getElementById('root'));
