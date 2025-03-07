class Bird {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.vy = 0;
		this.ay = 250;
	}

	update(deltaTime) {
		this.vy += this.ay * deltaTime;
		this.y += this.vy * deltaTime;
	}
}