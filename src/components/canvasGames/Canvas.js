import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { doruaamon } from './doruaamon';
import { game } from './avoidGame';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
let outObj = {};
export function Canvas() {
	const canvasRef = useRef(null);
	const [ canvas, setCanvas ] = useState({});
	const [ ctx, setCtx ] = useState({});
	let times = { time: null };

	const Ball = function(x, y, r, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		this.render = function() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			ctx.fillstyle = this.color;
			ctx.fill();
		};
		this.updata = function() {
			this.x = this.x + 100;
			if (this.x > 500) clearInterval(times);
		};
	};
	Ball.prototype = {
		cons: function() {
			console.log('123123');
		}
	};
	const Aaa = function() {
		this.x = 1;
		this.y = 1;
	};
	Aaa.prototype = new Ball();
	useEffect(() => {
		console.log('canv', canvasRef);
		if (canvasRef.current.getContext) {
			setCanvas(canvasRef.current);
			setCtx(canvasRef.current.getContext('2d'));

			//canvasRef.current.getContext('2d').strokeRect(50, 50, 50, 50);
		}
	}, []);

	return (
		<div style={{ border: '1px solid #999', width: 1800, height: 800, display: 'flex' }}>
			<canvas width={800} height={800} ref={canvasRef} style={{ border: '1px solid #999' }} />
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Button
					onClick={() => {
						clearInterval(times.time);
						doruaamon.run({ canvas, times, outObj });
					}}
				>
					跟随鼠标
				</Button>
				<Button
					onClick={() => {
						canvas.removeEventListener('mousemove', outObj.moveMouse);
						clearInterval(times.time);
						game.init({ bindCanvas: canvas, times, fpss: 30 });
					}}
				>
					躲避火球小游戏
				</Button>
				{/* <Button
					onClick={() => {
						ctx.translate(100, 100);
						ctx.rotate(Math.atan(2));
						ctx.beginPath();
						ctx.moveTo(100, 100);
						ctx.lineTo(200, 100);
						ctx.stroke();
						ctx.rotate(Math.atan(-2));
						ctx.beginPath();
						ctx.moveTo(100, 100);
						ctx.lineTo(200, 100);
						ctx.stroke();
					}}
				>
					旋转
				</Button>
				<Button
					onClick={() => {
						const image = new Image();
						image.src = 'http://img5.imgtn.bdimg.com/it/u=3080080567,3540172556&fm=26&gp=0.jpg';
						image.onload = () => {
							let x = 200,
								y = 200;
							setInterval(() => {
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								ctx.drawImage(image, x, y);
								x++;
							}, 20);
						};
					}}
				>
					绘制图片
				</Button>
				<Button
					onClick={() => {
						const yuan = new Ball(50, 50, 20, 'red');
						yuan.render();
						times = setInterval(() => {
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							yuan.render();
							yuan.updata();
						}, 100);
					}}
				>
					绘制小球(面向对象)
				</Button> */}
			</div>
		</div>
	);
}

// function Person() {}
// Person.names = '123';
// Person.bbb = function() {
// 	console.log(this.abc);
// };

// Person.prototype.names = 'Sunshine';
// Person.prototype.age = 23;
// Person.prototype.job = 'chengxuyuan';
// Person.prototype.sayName = function() {
// 	console.log(this.names);
// };
// const person1 = new Person();
// person1.ccc = '123';
// person1.sayName();

// console.log(person1);
// const person2 = new Person();
// person1.name = 'my name';

// let name = 'windows';
// let a = {
// 	name: 'a',
// 	func: function() {
// 		console.log(this.name);
// 	}
// };
// a.func.call(this);
