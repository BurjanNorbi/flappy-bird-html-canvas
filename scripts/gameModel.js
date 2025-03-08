class GameModel {
	constructor() {
		this.isGameRunning = false;
		this.isGameOver = false;
		this.points = 0;
		this.bird = null;
		this.pillars = null;
	}

	startNewGame() {
		this.bird = new Bird(50, canvas.height / 2, 30, 50);

		this.pillars = [];
		this.pillars.push(new Pillar());

		this.points = 0;

		this.isGameRunning = true;
		this.isGameOver = false;
	}

	update(deltaTime) {
		this.bird.update(deltaTime);
		this.isGameOver = this.bird.y > canvas.height;

		this.pillars.forEach((pillar) => {
			pillar.update(deltaTime);

			if(pillar.isCollidingWith(this.bird)){
				this.isGameOver = true;
			}
		});

		for(let i = this.pillars.length - 1; i >= 0; --i) {
			const pillar = this.pillars[i];
			if(pillar.isOffScreen()) {
				this.pillars.pop();
				++this.points;
				this.pillars.push(new Pillar());
			}
		}
	}

	onJump() {
		this.bird.onJump();
	}
}