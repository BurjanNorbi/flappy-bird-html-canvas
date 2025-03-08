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
let gameModel = new GameModel();

document.addEventListener('keydown', (e) => {
	if(e.code === 'Space') {
		if(gameModel.isGameOver) {
			gameModel.startNewGame();
		}
		else if(!gameModel.isGameRunning) {
			gameModel.resumeGame();
			isFirstGame = false;
		} else {
			gameModel.onJump();
		}
	}
})

function update(deltaTime) {
	gameModel.update(deltaTime);
}

function draw() {
	// draw the backgound
	ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);

	// draw the pillars
	ctx.fillStyle = 'white';
	gameModel.pillars.forEach((pillar) => {
		ctx.drawImage( 
			images.pillar,
			pillar.x, pillar.upperY,
			pillar.w, pillar.upperH
		);
		ctx.drawImage(
			images.pillar,
			pillar.x, pillar.lowerY,
			pillar.w, pillar.lowerH
		);
	});
	
	// draw the bird
	ctx.drawImage(
		images.bird,
		gameModel.bird.x, gameModel.bird.y,
		gameModel.bird.w, gameModel.bird.h
	);

	// draw the points
	ctx.textAlign ='center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = 'red';
	ctx.font = '50px serif';
	ctx.fillText(`${gameModel.points}`, canvas.width / 2, 50);

	if(gameModel.isGameOver || isFirstGame) {

		if(gameModel.isGameOver && !isFirstGame) {
			// draw game over text
			ctx.textAlign ='center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'red';
			ctx.font = '100px serif';
			ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);
		} else if(isFirstGame) {
			// draw game title on start text
			ctx.textAlign ='center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'red';
			ctx.font = '90px serif';
			ctx.fillText('Flappy Bird', canvas.width / 2, canvas.height / 2);

			gameModel.pauseGame();
		}

		// draw user info text
		ctx.textAlign ='center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = 'red';
		ctx.font = '25px serif';
		ctx.fillText(
			'Press SPACE to play...',
			canvas.width / 2, canvas.height / 2 + 70
		);
	}
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
let imagesLoaded = 0;
Object.values(images).forEach((img) => {
	img.onload = () => {
			++imagesLoaded;
			if (imagesLoaded === Object.keys(images).length) {
				gameModel.startNewGame();
				gameLoop();  // Start the game only after images are loaded
			}
	};
});