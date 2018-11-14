import { GUI } from 'dat.gui';
import P5 from 'p5';

const options = {};

/* eslint no-unused-vars: 0 */
const myp5 = new P5((sketch) => {
	const gui = new GUI();

	sketch.setup = () => {
		sketch.createCanvas(window.innerWidth, window.innerHeight);
		sketch.noLoop();
	};

	sketch.draw = () => {
		sketch.background(255);
	};
}, document.getElementById('root'));
