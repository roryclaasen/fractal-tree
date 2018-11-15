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
	background: '#000000'
};

const width = window.innerWidth;
const height = window.innerHeight;

/* eslint no-unused-vars: 0 */
const myp5 = new P5((sketch) => {
	function root() {
		const x = width / 2;
		const y = height;
		return [
			sketch.createVector(x, y),
			sketch.createVector(x, y - options.length)
		];
	}

	const tree = new Tree(root(), options);

	// DAT GUI OPTIONS

	const gui = new GUI();

	const optLength = gui.add(options, 'length', 0, 500);
	optLength.onChange((val) => tree.makeTree(root(), options));

	const optTreeLength = gui.add(options, 'treeLength', 1, 20);
	optTreeLength.onChange((val) => tree.makeTree(root(), options));

	const optAngle = gui.add(options, 'angle', 0, Math.PI);
	optAngle.onChange((val) => tree.makeTree(root(), options));

	const optBranchMultiplier = gui.add(options, 'branchMultiplier', 0.1, 1);
	optBranchMultiplier.onChange((val) => tree.makeTree(root(), options));

	const offset = gui.addFolder('Offset');
	offset.add(options, 'xOffset', -width, width);
	offset.add(options, 'yOffset', -height, height);

	gui.add(options, 'showGround');
	const colors = gui.addFolder('Colors');
	const optUseColors = colors.add(options, 'useColors');
	optUseColors.onChange((val) => tree.makeTree(root(), options));

	colors.addColor(options, 'background');

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
		tree.draw(sketch);
	};
}, document.getElementById('root'));
