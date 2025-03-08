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

let isFirstGame = true;
let isGameRunning = true;
let isGameOver = false;
let points = 0;
const bird = new Bird(50, canvas.height / 2, 30, 50);
const pillars = [];
pillars.push(new Pillar(canvas.width, canvas.height));

document.addEventListener('keydown', (e) => {
	if(e.code === 'Space') {
		if(!isGameRunning) {
			isGameRunning = true;
		} else {
			bird.onJump();
		}
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
			++points;
			pillars.push(new Pillar(canvas.width, canvas.height));
		}
	}
}

function draw() {
	// draw the backgound
	ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);

	// draw the pillars
	ctx.fillStyle = 'white';
	pillars.forEach((pillar) => {
		ctx.drawImage(images.pillar, pillar.x, pillar.upperY, pillar.w, pillar.upperH);
		ctx.drawImage(images.pillar, pillar.x, pillar.lowerY, pillar.w, pillar.lowerH);
	});
	
	// draw the bird
	ctx.drawImage(images.bird, bird.x, bird.y, bird.w, bird.h);

	ctx.textAlign ='center';
	ctx.textBaseline = 'middle';

	// draw the points
	ctx.fillStyle = 'red';
	ctx.font = '50px serif';
	ctx.fillText(`${points}`, canvas.width / 2, 50);

	// draw game over state
	if(isGameOver && !isFirstGame) {
		ctx.fillStyle = 'red';
		ctx.font = '100px serif';
		ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);
	} else if(isFirstGame) {
		ctx.fillStyle = 'red';
		ctx.font = '50px serif';
		ctx.fillText('Flappy Bird', canvas.width / 2, canvas.height / 2);
		ctx.font = '25px serif';
		ctx.fillText('Press SPACE to play...', canvas.width / 2, canvas.height / 2 + 40);
		isGameRunning = false;
		isFirstGame = false;
	}
}

let previousTime = performance.now();

function gameLoop(now = performance.now()) {
	// calculate the delta time in seconds
	const deltaTime = (now - previousTime) / 1000;
	previousTime = now;

	if(isGameRunning && !isGameOver) {
		update(deltaTime);
		draw();
	}

	requestAnimationFrame(gameLoop);
}

// Start
let imagesLoaded = 0;
Object.values(images).forEach((img) => {
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === Object.keys(images).length) {
            gameLoop();  // Start the game only after images are loaded
        }
    };
});