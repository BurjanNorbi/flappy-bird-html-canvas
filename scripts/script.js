const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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

	pillars.forEach((pillar) => {
		pillar.update(deltaTime);
		if(pillar.isCollidingWith(bird)) {
			console.log('collide');
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
	ctx.fillStyle = 'blue';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// draw the pillars
	ctx.fillStyle = 'white';
	pillars.forEach((pillar) => {
		ctx.fillRect(pillar.x, pillar.upperY, pillar.w, pillar.upperH);
		ctx.fillRect(pillar.x, pillar.lowerY, pillar.w, pillar.lowerH);
	});
	
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