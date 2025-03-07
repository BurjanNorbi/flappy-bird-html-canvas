const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const bird = new Bird(50, canvas.height / 2, 30, 50);

function update(deltaTime) {
	bird.update(deltaTime);
}

function draw() {
	// draw the backgound
	ctx.fillStyle = 'blue';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// draw the bird
	ctx.fillStyle = 'brown';
	ctx.fillRect(bird.x, bird.y, bird.w, bird.h);
}

let previousTime = performance.now();

function gameLoop(now = performance.now()) {
	// calculate the delta time in seconds
	const deltaTime = (now - previousTime) / 1000;
	previousTime = now;

	update(deltaTime);
	draw();

	requestAnimationFrame(gameLoop);
}

// Start
gameLoop();