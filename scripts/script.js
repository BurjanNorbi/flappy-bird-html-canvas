const images = {
	background: new Image(),
	bird: new Image(),
	pillar: new Image()
};
images.background.src = './images/bg.png';
images.bird.src = './images/bird.png';
images.pillar.src = './images/pillar.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let isGameOver = false;
const bird = new Bird(50, canvas.height / 2, 30, 50);
const pillars = [];
pillars.push(new Pillar(canvas.width, canvas.height));

document.addEventListener('keydown', (e) => {
	if(e.code === 'Space') {
		bird.onJump();
	}
})

function update(deltaTime) {
	bird.update(deltaTime);
	isGameOver = bird.y > canvas.height;

	pillars.forEach((pillar) => {
		pillar.update(deltaTime);

		if(pillar.isCollidingWith(bird)){
			isGameOver = true;
		}
	});

	for(let i = pillars.length - 1; i >= 0; --i) {
		const pillar = pillars[i];
		if(pillar.isOffScreen()) {
			pillars.pop();
			pillars.push(new Pillar(canvas.width, canvas.height));
		}
	}
}

function draw() {
	// draw the backgound
	// ctx.fillStyle = 'blue';
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);

	// draw the pillars
	ctx.fillStyle = 'white';
	pillars.forEach((pillar) => {
		// ctx.fillRect(pillar.x, pillar.upperY, pillar.w, pillar.upperH);
		ctx.drawImage(images.pillar, pillar.x, pillar.upperY, pillar.w, pillar.upperH);
		// ctx.fillRect(pillar.x, pillar.lowerY, pillar.w, pillar.lowerH);
		ctx.drawImage(images.pillar, pillar.x, pillar.lowerY, pillar.w, pillar.lowerH);
	});
	
	// draw the bird
	// ctx.fillStyle = 'brown';
	// ctx.fillRect(bird.x, bird.y, bird.w, bird.h);
	ctx.drawImage(images.bird, bird.x, bird.y, bird.w, bird.h);

	// draw game over state
	if(isGameOver) {
		ctx.fillStyle = 'red';
		ctx.font = '100px serif';
		ctx.fillText('Game Over', 70, 230);
	}
}

let previousTime = performance.now();

function gameLoop(now = performance.now()) {
	// calculate the delta time in seconds
	const deltaTime = (now - previousTime) / 1000;
	previousTime = now;

	update(deltaTime);
	draw();

	if(!isGameOver) {
		requestAnimationFrame(gameLoop);
	}
}

// Start
gameLoop();