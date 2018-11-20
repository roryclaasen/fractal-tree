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
			options.tree.xOffset = 200;
			options.tree.yOffset = 10;
			options.tree.scale = Math.PI / 4;
			options.tree.rotate = 0.67;
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
		useColors: true,
		background: '#000000',
		leaves: true,
		mirror: 'off',
		mirrorOptions: ['off', 'y', 'x y']
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
treeOptions.add(options.tree, 'length', 0, 500).onChange((val) => makeTrees());
treeOptions.add(options.tree, 'maxBranches', 1, 20, 1).onChange((val) => makeTrees());
treeOptions.add(options.tree, 'angle', -Math.PI, Math.PI, 0.1).onChange((val) => makeTrees());
treeOptions.add(options.tree, 'branchMultiplier', 0.1, 2).onChange((val) => makeTrees());
treeOptions.add(options.tree, 'reset');

const offset = gui.addFolder('Transform');
offset.add(options.transform, 'xOffset', -width, width).listen();
offset.add(options.transform, 'yOffset', -height, height).listen();
offset.add(options.transform, 'scale', 0, 10).listen();
offset.add(options.transform, 'rotate', -Math.PI, Math.PI, 0.1).listen();
offset.add(options.transform, 'center');
offset.add(options.transform, 'reset');

const appearance = gui.addFolder('Appearance');
appearance.add(options.appearance, 'useColors');
appearance.addColor(options.appearance, 'background');
appearance.add(options.appearance, 'leaves');
appearance.add(options.appearance, 'mirror', options.appearance.mirrorOptions);

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
