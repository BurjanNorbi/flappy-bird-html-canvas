const GAP = 150;
const PILLAR_DISTANCE = 300;
const PILLAR_XSPEED = -200;

function random(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a);
}

class Pillar {
	constructor(canvasW = canvas.width, canvasH = canvas.height) {
		const h = random(10, canvasH / 2);

		this.x = canvasW;
		this.upperY = 0;
		this.lowerY = h + GAP;
		this.w = 30;
		this.upperH = h;
		this.lowerH = canvasH - GAP - h;
	}

	update(deltaTime) {
		this.x += PILLAR_XSPEED * deltaTime; 
	}

	isOffScreen() {
		return this.x + this.w < 0;
	}

	isCollidingWith(bird) {
		const colliding = (a, b) => {
			return !(
					b.y + b.h  < a.y ||
					a.x + a.w < b.x ||
					a.y + a.h  < b.y ||
					b.x + b.w < a.x
			);
		}

		return colliding(
			{x: bird.x, y: bird.y, w: bird.w, h: bird.h}, 
			{x: this.x, y: this.upperY, w: bird.w, h: this.upperH}
		) || colliding(
			{x: bird.x, y: bird.y, w: this.w, h: bird.h}, 
			{x: this.x, y: this.lowerY, w: this.w, h: this.lowerH}
		);
	}
}