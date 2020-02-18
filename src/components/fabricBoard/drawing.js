import { fabric } from 'fabric';
const transformMouse = (mouseX, mouseY) => {
	return { x: mouseX / window.zoom, y: mouseY / window.zoom };
};
function drawArrow(fromX, fromY, toX, toY, theta, headlen) {
	theta = typeof theta != 'undefined' ? theta : 30;
	headlen = typeof theta != 'undefined' ? headlen : 10;
	// 计算各角度和对应的P2,P3坐标
	var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
		angle1 = (angle + theta) * Math.PI / 180,
		angle2 = (angle - theta) * Math.PI / 180,
		topX = headlen * Math.cos(angle1),
		topY = headlen * Math.sin(angle1),
		botX = headlen * Math.cos(angle2),
		botY = headlen * Math.sin(angle2);
	var arrowX = fromX - topX,
		arrowY = fromY - topY;
	var path = ' M ' + fromX + ' ' + fromY;
	path += ' L ' + toX + ' ' + toY;
	arrowX = toX + topX;
	arrowY = toY + topY;
	path += ' M ' + arrowX + ' ' + arrowY;
	path += ' L ' + toX + ' ' + toY;
	arrowX = toX + botX;
	arrowY = toY + botY;
	path += ' L ' + arrowX + ' ' + arrowY;
	return path;
}

const drawing = ({ canvas, drawType, mouseFrom, drawingObject, mouseTo, color, drawWidth, setTextBox, graphColor }) => {
	if (drawingObject) {
		canvas.remove(drawingObject);
	}

	canvas.skipTargetFind = true;
	canvas.selection = false;
	var canvasObject = null;
	switch (drawType) {
		case 'arrow': //箭头
			canvasObject = new fabric.Path(drawArrow(mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y, 30, 30), {
				stroke: color,
				fill: 'rgba(255,255,255,0)',
				strokeWidth: drawWidth
			});
			break;
		case 'line': //直线
			canvasObject = new fabric.Line([ mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y ], {
				stroke: color,
				strokeWidth: drawWidth
			});
			break;
		case 'dottedline': //虚线
			canvasObject = new fabric.Line([ mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y ], {
				strokeDashArray: [ 3, 1 ],
				stroke: color,
				strokeWidth: drawWidth
			});
			break;
		case 'circle': //正圆
			var left = mouseFrom.x,
				top = mouseFrom.y;
			var radius = Math.sqrt((mouseTo.x - left) * (mouseTo.x - left) + (mouseTo.y - top) * (mouseTo.y - top)) / 2;
			canvasObject = new fabric.Circle({
				left: left,
				top: top,
				stroke: color,
				fill: 'rgba(255, 255, 255, 0)',
				radius: radius,
				strokeWidth: drawWidth
			});
			break;
		case 'ellipse': //椭圆
			var left = mouseFrom.x,
				top = mouseFrom.y;
			var radius = Math.sqrt((mouseTo.x - left) * (mouseTo.x - left) + (mouseTo.y - top) * (mouseTo.y - top)) / 2;
			canvasObject = new fabric.Ellipse({
				left: left,
				top: top,
				stroke: color,
				fill: 'rgba(255, 255, 255, 0)',
				originX: 'center',
				originY: 'center',
				rx: Math.abs(left - mouseTo.x),
				ry: Math.abs(top - mouseTo.y),
				strokeWidth: drawWidth
			});
			break;
		case 'square': //TODO:正方形（后期完善）
			break;
		case 'rectangle': //长方形
			var left = mouseFrom.x < mouseTo.x ? mouseFrom.x : mouseTo.x,
				top = mouseFrom.y < mouseTo.y ? mouseFrom.y : mouseTo.y;
			var path =
				'M ' +
				mouseFrom.x +
				' ' +
				mouseFrom.y +
				' L ' +
				mouseTo.x +
				' ' +
				mouseFrom.y +
				' L ' +
				mouseTo.x +
				' ' +
				mouseTo.y +
				' L ' +
				mouseFrom.x +
				' ' +
				mouseTo.y +
				' L ' +
				mouseFrom.x +
				' ' +
				mouseFrom.y +
				' z';
			canvasObject = new fabric.Path(path, {
				left: left,
				top: top,
				stroke: color,

				strokeWidth: drawWidth,
				fill: graphColor
			});
			//也可以使用fabric.Rect
			break;
		case 'rightangle': //直角三角形
			var path =
				'M ' +
				mouseFrom.x +
				' ' +
				mouseFrom.y +
				' L ' +
				mouseFrom.x +
				' ' +
				mouseTo.y +
				' L ' +
				mouseTo.x +
				' ' +
				mouseTo.y +
				' z';
			canvasObject = new fabric.Path(path, {
				left: left,
				top: top,
				stroke: color,
				strokeWidth: drawWidth,
				fill: 'rgba(255, 255, 255, 0)'
			});
			break;
		case 'equilateral': //等边三角形
			var path =
				'M ' +
				mouseFrom.x +
				' ' +
				mouseFrom.y +
				' L ' +
				(2 * mouseTo.x - mouseFrom.x) +
				' ' +
				mouseFrom.y +
				' L ' +
				mouseTo.x +
				' ' +
				(mouseFrom.y - (mouseTo.x - mouseFrom.x) * Math.sqrt(3)) +
				' z';
			canvasObject = new fabric.Path(path, {
				left: left,
				top: top,
				stroke: color,
				strokeWidth: drawWidth,
				fill: 'rgba(255, 255, 255, 0)'
			});
			break;
		case 'isoscelesteral': //等腰三角形
			var path =
				'M ' +
				mouseFrom.x +
				' ' +
				mouseFrom.y +
				' L ' +
				mouseTo.x +
				' ' +
				mouseTo.y +
				' L ' +
				(2 * mouseTo.x - mouseFrom.x) +
				' ' +
				mouseFrom.y +
				' z';
			canvasObject = new fabric.Path(path, {
				left: left,
				top: top,
				stroke: color,
				strokeWidth: drawWidth,
				fill: 'rgba(255, 255, 255, 0)'
			});
			break;
		case 'isosceles':
			break;
		case 'text':
			const textbox = new fabric.Textbox('', {
				left: mouseFrom.x - 60,
				top: mouseFrom.y - 20,
				width: 150,
				fontSize: 18,
				borderColor: '#2c2c2c',
				fill: color,
				hasControls: false
			});
			canvas.add(textbox);
			textbox.enterEditing();
			textbox.hiddenTextarea.focus();
			setTextBox(textbox);
			break;

		case 'remove':
			break;
		default:
			break;
	}
	return canvasObject;
};
export const canvasOn = ({ canvas, canvasType, color, graphColor, drawWidth, setTextBox, history }) => {
	canvas.off('mouse:down');
	canvas.off('mouse:up');
	canvas.off('mouse:move');
	canvas.off('selection:created');
	if (canvasType === 'pencil') {
		canvas.on('mouse:up', function(options) {
			if (JSON.stringify(canvas.toJSON()) !== history.arr[history.pointer]) {
				if (history.arr.length > history.pointer) {
					history.arr = history.arr.slice(0, history.pointer + 1);
				}
				history.arr.push(JSON.stringify(canvas.toJSON()));
				history.pointer++;
				if (history.arr.length > 50) {
					history.arr = history.arr.slice(10);
					history.pointer = history.arr.length - 1;
				}
			}
		});
		return;
	}

	canvas.isDrawingMode = false;

	if (canvasType === 'drag') {
		canvas.selection = true;
		canvas.skipTargetFind = false;
		canvas.selectable = true;
		canvas.on('mouse:up', function(options) {
			console.log('upaaa', options);
			if (JSON.stringify(canvas.toJSON()) !== history.arr[history.pointer]) {
				if (history.arr.length > history.pointer) {
					history.arr = history.arr.slice(0, history.pointer + 1);
				}
				history.arr.push(JSON.stringify(canvas.toJSON()));
				history.pointer++;
				if (history.arr.length > 50) {
					history.arr = history.arr.slice(10);
					history.pointer = history.arr.length - 1;
				}
			}
		});
		return;
	}
	console.log(canvas, canvasType, color, graphColor, drawWidth, setTextBox);

	if (canvasType === 'eraser') {
		canvas.selection = true;
		canvas.skipTargetFind = false;
		canvas.selectable = true;
		canvas.on('selection:created', function(e) {
			if (e.target._objects) {
				//多选删除
				var etCount = e.target._objects.length;
				for (var etindex = 0; etindex < etCount; etindex++) {
					canvas.remove(e.target._objects[etindex]);
				}
			} else {
				//单选删除
				canvas.remove(e.target);
			}
			canvas.discardActiveObject(); //清除选中框
			if (JSON.stringify(canvas.toJSON()) !== history.arr[history.pointer]) {
				if (history.arr.length > history.pointer) {
					history.arr = history.arr.slice(0, history.pointer + 1);
				}
				history.arr.push(JSON.stringify(canvas.toJSON()));
				history.pointer++;
				if (history.arr.length > 50) {
					history.arr = history.arr.slice(10);
					history.pointer = history.arr.length - 1;
				}
			}
		});
		return;
	}

	console.log('pen', canvas, canvasType, color);
	window.canvas = canvas;
	window.zoom = window.zoom ? window.zoom : 1;
	let canvasObject = null;
	let mouseFrom = {},
		mouseTo = {},
		drawType = null,
		canvasObjectIndex = 0,
		textbox = null;

	let drawingObject = null; //当前绘制对象
	let moveCount = 1; //绘制移动计数器
	let doDrawing = false; // 绘制状态

	//绑定画板事件
	canvas.on('mouse:down', function(options) {
		let xy = transformMouse(options.e.offsetX, options.e.offsetY);
		mouseFrom.x = xy.x;
		mouseFrom.y = xy.y;
		console.log('123123', xy, options);
		doDrawing = true;
	});
	canvas.on('mouse:up', function(options) {
		console.log('upaaa', options);
		let xy = transformMouse(options.e.offsetX, options.e.offsetY);
		mouseTo.x = xy.x;
		mouseTo.y = xy.y;
		canvasObject = drawing({
			canvas,
			drawType: canvasType,
			mouseFrom,
			drawingObject,
			mouseTo,
			color,
			drawWidth,
			setTextBox,
			graphColor
		});
		drawingObject = null;
		moveCount = 1;
		doDrawing = false;
		if (canvasObject) {
			// canvasObject.index = getCanvasObjectIndex();
			canvas.add(canvasObject); //.setActiveObject(canvasObject)
			canvasObject = null;
		}
		if (JSON.stringify(canvas.toJSON()) !== history.arr[history.pointer]) {
			if (history.arr.length > history.pointer) {
				history.arr = history.arr.slice(0, history.pointer + 1);
			}
			history.arr.push(JSON.stringify(canvas.toJSON()));
			history.pointer++;
			if (history.arr.length > 50) {
				history.arr = history.arr.slice(10);
				history.pointer = history.arr.length - 1;
			}
		}
	});
	canvas.on('mouse:move', function(options) {
		if (moveCount % 2 && !doDrawing) {
			//减少绘制频率
			return;
		}
		moveCount++;
		let xy = transformMouse(options.e.offsetX, options.e.offsetY);
		mouseTo.x = xy.x;
		mouseTo.y = xy.y;
		canvasObject = drawing({
			canvas,
			drawType: canvasType,
			mouseFrom,
			drawingObject,
			mouseTo,
			color: color,
			drawWidth,
			setTextBox,
			graphColor
		});
		if (canvasObject) {
			// canvasObject.index = getCanvasObjectIndex();
			canvas.add(canvasObject); //.setActiveObject(canvasObject)
			drawingObject = canvasObject;
		}
	});
};
