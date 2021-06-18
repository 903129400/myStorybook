import fire from './img/fire.png';
import imp from './img/imp.png';
let fps = 20;
let time = {};
let canvas = 1;
let fireImg, impImg;
let impObj = {};
let ctx = null;
let width = 800;
let height = 800;
let fireArr = [];
let bgTime = null;
let endTime = null;
let lient = { x: 0, y: 0 };
function moveMouse(e) {
	lient.x = e.clientX;
	lient.y = e.clientY;
}
function clickMouse(e) {
	game.run();
}
function clickCover(e) {
	impObj.dx = 400;
	impObj.dy = 400;
	fireArr = [];
	game.cover();
	canvas.removeEventListener('click', clickCover);
}
function AddFire(x, y, dx, dy) {
	this.x = x; //坐标
	this.y = y;
	this.dx = dx; //偏移量
	this.dy = dy;
}
AddFire.prototype.draw = function() {
	ctx.translate(this.x + 10, this.y + 18);
	let a;
	if (this.dx !== 0 && this.dy !== 0) a = -(Math.atan2(this.dy, this.dx) + 0.5 * Math.PI);
	else {
		this.dx === 0
			? this.dy >= 0 ? (a = Math.PI) : (a = 0)
			: this.dx >= 0 ? (a = -0.5 * Math.PI) : (a = 0.5 * Math.PI);
	}

	ctx.rotate(-a);
	ctx.drawImage(fireImg, 0, 0, 20, 36);
	ctx.rotate(a);
	ctx.translate(-(this.x + 10), -(this.y + 18));
};
AddFire.prototype.run = function() {
	this.x = this.x + this.dx;
	this.y = this.y + this.dy;
	if (impObj.dx + 12 <= this.x && impObj.dx + 36 >= this.x && impObj.dy <= this.y + 16 && impObj.dy + 48 >= this.y) {
		game.end();
	}
	if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) return false;
	return true;
};
export const game = {
	init: ({ bindCanvas, times, fpss }) => {
		time = times;
		fps = fpss;
		canvas = bindCanvas;
		ctx = canvas.getContext('2d');
		width = canvas.width;
		height = canvas.height;
		let promiseAll = [
			new Promise((res, rej) => {
				fireImg = new Image();
				fireImg.src = fire;
				fireImg.onload = function() {
					res(fireImg);
				};
			}),
			new Promise((res, rej) => {
				impImg = new Image();
				impImg.src = imp;
				impImg.onload = function() {
					res(impImg);
				};
				impObj = {
					image: impImg,
					sx: 0, //原图位置左上角xy
					sy: 0,
					sWidth: 48, //原图裁剪尺寸
					sHeight: 64,
					dx: 400, //画布图片位置左上角xy
					dy: 400,
					dWidth: 48, //画布图片尺寸
					dHeight: 64,
					state: 0,
					direction: 0,
					drawImp: function() {
						if (ctx !== null) {
							ctx.drawImage(
								this.image,
								this.sx + 48 * this.state,
								this.sy + 64 * this.direction,
								this.sWidth,
								this.sHeight,
								this.dx,
								this.dy,
								this.dWidth,
								this.dHeight
							);
						}
					},

					run: function() {
						impObj.state = (impObj.state + 1) % 4;

						const x = lient.x - impObj.dx,
							y = lient.y - impObj.dy;
						if (0 <= x && x <= 50 && 0 <= y && y <= 76) {
							impObj.direction = 0;
						} else if (Math.abs(x) > Math.abs(y)) {
							if (x < 0) {
								impObj.direction = 1;
								if (impObj.dx >= 6) impObj.dx = impObj.dx - 6;
							} else {
								impObj.direction = 2;
								if (impObj.dx <= canvas.width - 56) impObj.dx = impObj.dx + 6;
							}
						} else {
							if (y < 0) {
								impObj.direction = 3;
								if (impObj.dy >= 6) impObj.dy = impObj.dy - 6;
							} else {
								impObj.direction = 0;
								if (impObj.dy <= canvas.height - 82) impObj.dy = impObj.dy + 6;
							}
						}
					}
				};
			})
		];
		Promise.all(promiseAll).then(() => {
			game.cover();
		});
	},
	cover: () => {
		//游戏封面
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const fire1 = new AddFire(360, 360, 1, 1);
		const fire2 = new AddFire(460, 360, -1, 1);
		const fire3 = new AddFire(360, 460, 1, -1);
		const fire4 = new AddFire(460, 460, -1, -1);

		fire1.draw();
		fire2.draw();
		fire3.draw();
		fire4.draw();
		impObj.drawImp();
		ctx.font = '28px serif';
		ctx.fillText('点击框内区域开始游戏，小鬼随鼠标位置方向移动', 200, 100, [ 500 ]);
		canvas.addEventListener('click', clickMouse);
	},
	end: function() {
		clearInterval(time.time);
		fireArr = [];
		canvas.removeEventListener('mousemove', moveMouse);

		endTime = new Date().getTime();
		console.log('time', endTime, bgTime);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText('生存时间:' + (endTime - bgTime) + '毫秒', 200, 100, [ 500 ]);
		ctx.fillText('点击框内区域开始游戏，小鬼随鼠标位置方向移动', 200, 300, [ 500 ]);

		canvas.addEventListener('click', clickCover);
	},
	run: () => {
		canvas.removeEventListener('click', clickMouse);
		bgTime = new Date().getTime();
		console.log('time', endTime, bgTime);
		canvas.addEventListener('mousemove', moveMouse);
		time.time = setInterval(() => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			impObj.drawImp();
			impObj.run();
			fireArr = fireArr.filter((item) => {
				if (item) {
					item.draw();
					let save = item.run();
					if (save) return true;
				}
				return false;
			});

			if (fireArr.length < 40) {
				let ran = Math.random() * 20;
				for (let i = 0; i < ran; i++) {
					let xs = Math.random() * 20 - 10;
					let ys = Math.random() * 20 - 10;

					if (ys < xs)
						fireArr.push(new AddFire(xs > 0 ? 0 : canvas.width, canvas.height * Math.random(), xs, ys));
					else fireArr.push(new AddFire(canvas.width * Math.random(), ys > 0 ? 0 : canvas.height, xs, ys));
				}
			}
		}, 1000 / fps);
	}
};
