const GAP = 150;
const PILLAR_DISTANCE = 300;
const PILLAR_XSPEED = -200;

function random(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a);
}

class Pillar {
	constructor(canvasW, canvasH) {
		const h = random(10, canvasH / 2);

		this.x = canvasW - 30;
		this.upperY = 0;
		this.lowerY = h + GAP;
		this.w = 30;
		this.upperH = h;
		this.lowerH = canvasH - GAP - h;
	}
}