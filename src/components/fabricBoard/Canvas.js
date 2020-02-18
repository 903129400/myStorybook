import React, { useState, useEffect, useRef } from 'react';
import { message, Button, Popconfirm, Slider } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { fabric } from 'fabric';
import { colorChoice } from './color';
import { canvasOn } from './drawing';
import './index.css';
//import { shapeChoice } from './shape';
// import { SketchPicker } from 'react-color';      //调色板
export function Canvas() {
	const [ canvasType, setCnavasType ] = useState('pencil'); //操作类型，'pencil'为画笔
	const [ pencilColor, setPencilColor ] = useState('#E70100'); //画笔颜色
	const [ graphColor, setGraphColor ] = useState(false); //图形填充颜色
	const [ borderColor, setBorderColor ] = useState('#E70100'); //图形边界颜色
	const [ shapeWidth, setShapeWidth ] = useState(1); //开启/关闭形状颜色版
	const [ shapeColorType, setShapeColorType ] = useState(''); //开启/关闭形状颜色版
	const [ shapeChoiceType, setShapeChoiceType ] = useState(false); //开启/关闭形状颜色版
	const [ bgGrid, setBgGrid ] = useState(true); //开启/关闭背景网格
	const [ canvas, setCanvas ] = useState({});
	const [ pencilWidth, setPencilWidth ] = useState(1);
	const canvasRef = React.useRef(null);
	const [ textBox, setTextBox ] = useState(null);
	const [ canvasState, setCanvasState ] = useState(0);
	const [ history, setHistory ] = useState({
		arr: [],
		pointer: -1
	});
	const canvasInstall = ({ newCanvasType, color, newGraphColor } = {}) => {
		return {
			canvas,
			canvasType: newCanvasType || canvasType,
			color: color || borderColor,
			graphColor: newGraphColor || graphColor,
			drawWidth: shapeWidth, // 调节图像边框粗细
			setTextBox,
			history
		};
	};

	useEffect(() => {
		setCanvas(new fabric.Canvas('main'));
	}, []);
	useEffect(
		() => {
			if (canvasType !== 'text' && textBox !== null) {
				textBox.exitEditing();
				setTextBox(null);
			}
		},
		[ canvasType, textBox ]
	);
	useEffect(
		() => {
			if (canvas.add && canvasState === 0) {
				canvas.freeDrawingBrush.width = pencilWidth;
				if (canvasType === 'pencil') canvas.isDrawingMode = true; //画笔工具开启
				canvas.freeDrawingBrush.color = pencilColor;
				history.arr.push(JSON.stringify(canvas.toJSON()));
				history.pointer++;
				console.log('history', history);

				canvas.selection = false; //禁用拖拽
				canvas.skipTargetFind = true; //禁用拖拽
				canvas.selectable = false; //禁用拖拽

				setCanvasState(1);
			}
		},
		[ canvas, canvasState, canvasType, history, pencilColor, pencilWidth ]
	);
	return (
		<div>
			<p style={{ backgroundColor: '#333', color: 'white', padding: 20 }}>
				{' '}
				使用fabric做了个画板工具，其他各种形状绘画还在开发中。。。算是入门canvas会用了点吧
			</p>

			<div style={{ display: 'flex' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{' '}
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80 }}>
						<img
							alt=""
							src={canvasType === 'drag' ? require('./imgChoice/选择工具.png') : require('./img/选择工具.png')}
							onClick={() => {
								canvasOn(canvasInstall({ newCanvasType: 'drag' }));
								setCnavasType('drag');
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80 }}>
						<img
							alt=""
							src={canvasType === 'pencil' ? require('./imgChoice/画笔工具.png') : require('./img/画笔工具.png')}
							onClick={() => {
								canvas.isDrawingMode = true;

								canvasOn(canvasInstall({ newCanvasType: 'pencil' }));
								setCnavasType('pencil');
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>

						<div style={{ marginTop: 20, display: 'flex' }}>
							{/* 图形颜色 */}
							<div
								style={{
									width: 24,
									height: 24,
									borderRadius: 16,

									backgroundColor: '#999',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
								onClick={() => {
									setShapeColorType(!shapeColorType);
								}}
							>
								<div
									style={{
										backgroundColor: pencilColor,
										width: 20,
										height: 20,
										borderRadius: 16,
										border: '2px solid white'
									}}
								/>
							</div>
							{shapeColorType ? (
								// <SketchPicker
								// 	color={pencilColor}
								// 	onChangeComplete={(color) => {
								// 		setPencilColor(color.hex);
								// 		canvas.freeDrawingBrush.color = color.hex;
								// 	}}
								// 	style={{ width: 100, position: 'absolute', marginLeft: 80, zIndex: 1 }}
								// />
								colorChoice({
									shapeWidth,
									setShapeWidth,
									setPencilColor,
									setGraphColor,
									setBorderColor,
									canvas,
									borderColor,
									graphColor,
									setPencilWidth,
									pencilWidth,
									canvasChange: ({ color, newGraphColor }) =>
										canvasOn(canvasInstall({ color, newGraphColor }))
									// canvasOn({ canvas, canvasType, color, graphColor, drawWidth: pencilWidth })
								})
							) : (
								''
							)}
						</div>
						{/* <div style={{ width: 32, height: 32, marginTop: 20 }}>
						<img
							alt=""
							src={
								canvasType === 'rectangle' ? require('./imgChoice/矩形工具.png') : require('./img/矩形工具.png')
							}
							onClick={() => {
								setShapeChoiceType(!shapeChoiceType);
							}}
						/>
						{shapeChoiceType ? (
							// <SketchPicker
							// 	color={pencilColor}
							// 	onChangeComplete={(color) => {
							// 		setPencilColor(color.hex);
							// 		canvas.freeDrawingBrush.color = color.hex;
							// 	}}
							// 	style={{ width: 100, position: 'absolute', marginLeft: 80, zIndex: 1 }}
							// />
							shapeChoice({
								shapeWidth,
								setShapeWidth,
								setPencilColor,
								setGraphColor,
								setBorderColor,
								canvas,
								borderColor,
								graphColor,
								setPencilWidth,
								pencilWidth,
								canvasChange: ({ color, newGraphColor }) =>
									canvasOn(canvasInstall({ color, newGraphColor }))
								// canvasOn({ canvas, canvasType, color, graphColor, drawWidth: pencilWidth })
							})
						) : (
							''
						)}
					</div> */}
						<img
							alt=""
							src={
								canvasType === 'rectangle' ? require('./imgChoice/矩形工具.png') : require('./img/矩形工具.png')
							}
							onClick={() => {
								canvasOn(canvasInstall({ newCanvasType: 'rectangle' }));
								setCnavasType('rectangle');
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
						<img
							alt=""
							src={
								canvasType === 'equilateral' ? (
									require('./imgChoice/三角形工具.png')
								) : (
									require('./img/三角形工具.png')
								)
							}
							onClick={() => {
								canvasOn(canvasInstall({ newCanvasType: 'equilateral' }));
								setCnavasType('equilateral');
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
						<img
							alt=""
							src={canvasType === 'ellipse' ? require('./imgChoice/圆形工具.png') : require('./img/圆形工具.png')}
							onClick={() => {
								canvasOn(canvasInstall({ newCanvasType: 'ellipse' }));
								setCnavasType('ellipse');
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
						<img
							alt=""
							src={canvasType === 'line' ? require('./imgChoice/直线工具.png') : require('./img/直线工具.png')}
							onClick={() => {
								canvasOn(canvasInstall({ newCanvasType: 'line' }));
								setCnavasType('line');
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
						<img
							alt=""
							src={canvasType === 'text' ? require('./imgChoice/文字工具.png') : require('./img/文字工具.png')}
							onClick={() => {
								canvasOn(canvasInstall({ newCanvasType: 'text' }));
								setCnavasType('text');
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
						<img
							alt=""
							src={canvasType === 'eraser' ? require('./imgChoice/橡皮擦.png') : require('./img/橡皮擦.png')}
							onClick={() => {
								canvasOn(canvasInstall({ newCanvasType: 'eraser' }));
								setCnavasType('eraser');
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
						<img
							alt=""
							src={require('./img/后退.png')}
							onClick={() => {
								console.log(history);
								if (history.pointer > 0) {
									canvas.loadFromJSON(history.arr[history.pointer - 1]);
									history.pointer--;
								}
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
						<img
							alt=""
							src={require('./img/前进.png')}
							onClick={() => {
								console.log(history);
								if (history.pointer < history.arr.length - 1) {
									canvas.loadFromJSON(history.arr[history.pointer + 1]);
									history.pointer++;
								}
							}}
							style={{ width: 32, height: 32, marginTop: 20 }}
						/>
						<img
							alt=""
							src={require('./img/背景网格.png')}
							style={{ width: 32, height: 32, marginTop: 20 }}
							onClick={() => {
								setBgGrid(!bgGrid);
							}}
						/>
						<Popconfirm
							title="是否清空画布？"
							okText="Yes"
							cancelText="No"
							onConfirm={() => {
								canvas.clear();
							}}
						>
							<img
								alt=""
								src={require('./img/垃圾桶.png')}
								style={{ width: 32, height: 32, marginTop: 20 }}
							/>
						</Popconfirm>
					</div>
				</div>
				<div
					className={bgGrid ? 'canvasDiv' : ''}
					style={{ width: 1200, height: 800, border: ' 1px solid #333' }}
				>
					<canvas ref={canvasRef} id="main" width="1200" height="800" />
				</div>
			</div>
		</div>
	);
}
