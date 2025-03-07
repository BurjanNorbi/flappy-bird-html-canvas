const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

draw();

function draw() {
	ctx.fillStyle = 'blue';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}