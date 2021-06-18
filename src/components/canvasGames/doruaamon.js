import imgURL from './img/doraamon.png';
const lient = { x: 0, y: 0 };
function moveMouse(e) {
	lient.x = e.clientX;
	lient.y = e.clientY;
	console.log('x,y', lient.x, lient.y);
}
export const doruaamon = {
	run: ({ canvas, times, outObj }) => {
		outObj.moveMouse = moveMouse;
		const ctx = canvas.getContext('2d');

		const image = new Image();
		image.src = imgURL;
		image.onload = () => {
			canvas.addEventListener('mousemove', moveMouse);
			console.log('123123');
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const dorua = {
				image: image,
				sx: 0, //原图位置左上角xy
				sy: 0,
				sWidth: 25, //原图裁剪尺寸
				sHeight: 38,
				dx: 0, //画布图片位置左上角xy
				dy: 0,
				dWidth: 50, //画布图片尺寸
				dHeight: 76,
				state: 0,
				direction: 0
			};

			times.time = setInterval(() => {
				console.log('lint', lient);
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				ctx.drawImage(
					dorua.image,
					dorua.sx + 25 * dorua.state,
					dorua.sy + 40 * dorua.direction,
					dorua.sWidth,
					dorua.sHeight,
					dorua.dx,
					dorua.dy,
					dorua.dWidth,
					dorua.dHeight
				);
				dorua.state = (dorua.state + 1) % 4;
				const x = lient.x - dorua.dx,
					y = lient.y - dorua.dy;
				if (0 <= x && x <= 50 && 0 <= y && y <= 76) {
					dorua.direction = 0;
				} else if (Math.abs(x) > Math.abs(y)) {
					if (x < 0) {
						dorua.direction = 1;
						if (dorua.dx >= 6) dorua.dx = dorua.dx - 6;
					} else {
						dorua.direction = 2;
						if (dorua.dx <= canvas.width - 56) dorua.dx = dorua.dx + 6;
					}
				} else {
					if (y < 0) {
						dorua.direction = 3;
						if (dorua.dy >= 6) dorua.dy = dorua.dy - 6;
					} else {
						dorua.direction = 0;
						if (dorua.dy <= canvas.height - 82) dorua.dy = dorua.dy + 6;
					}
				}
			}, 100);
		};
	}
};
