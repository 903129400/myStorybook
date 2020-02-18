import React from 'react';
import { Slider } from 'antd';

export function colorChoice({
	shapeWidth,
	setShapeWidth,
	setPencilWidth,
	pencilWidth,
	setPencilColor,
	setGraphColor,
	setBorderColor,
	canvas,
	borderColor,
	graphColor,
	canvasChange
}) {
	const colors = [
		'#E70100',
		'#FE990C',
		'#FED600',
		'#0AC97B',
		'#208BF7',
		'#7B16FF',
		'#BF47E1',
		'#222222',
		'#D6D6D6',
		false
	];
	return (
		<div
			style={{
				width: 400,
				height: 400,
				position: 'absolute',
				marginLeft: 80,
				zIndex: 1,
				backgroundColor: 'white',
				border: '1px solid #EAEAEA',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<div
				style={{
					borderBottom: '1px solid #E4E4E4',
					height: '100%',
					width: '90%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<div style={{ display: 'flex' }}>
					<div style={{ marginLeft: 4 }}>画笔宽度</div>
					<Slider
						style={{ width: 200, position: 'absolute', marginLeft: 80 }}
						defaultValue={pencilWidth}
						onChange={(value) => {
							setPencilWidth(value);
							// canvasOn(canvasInstall());   调节图像边框粗细
							canvas.freeDrawingBrush.width = value;
						}}
						marks={{ 0: '细', 100: '粗' }}
					/>
				</div>
			</div>
			<div
				style={{
					borderBottom: '1px solid #E4E4E4',
					height: '100%',
					width: '90%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<div style={{ display: 'flex' }}>
					<div style={{ marginLeft: 4 }}>边框宽度</div>
					<Slider
						style={{ width: 200, position: 'absolute', marginLeft: 80 }}
						defaultValue={shapeWidth}
						onChange={(value) => {
							setShapeWidth(value);
							canvasChange({ color: borderColor, newGraphColor: graphColor });
						}}
						marks={{ 0: '细', 100: '粗' }}
					/>
				</div>
			</div>
			<div
				style={{
					borderBottom: '1px solid #E4E4E4',
					height: '100%',
					width: '90%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<div style={{ marginLeft: 4 }}>画笔</div>
				<div style={{ display: 'flex' }}>
					{colors.map((item) => {
						return item !== false ? (
							<div
								key={item}
								style={{
									width: 24,
									height: 24,
									borderRadius: 12,
									margin: 5,
									backgroundColor: item,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
								onClick={() => {
									canvas.freeDrawingBrush.color = item;
									setPencilColor(item);
								}}
							/>
						) : (
							''
						);
					})}
				</div>
			</div>

			<div
				style={{
					height: '100%',
					width: '90%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					borderBottom: '1px solid #E4E4E4'
				}}
			>
				<div style={{ marginLeft: 4 }}>边界</div>
				<div style={{ display: 'flex' }}>
					{colors.map((item) => {
						return item !== false ? (
							<div
								key={item}
								style={{
									width: 24,
									height: 24,
									borderRadius: 12,
									margin: 5,
									backgroundColor: item,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
								onClick={() => {
									setBorderColor(item);

									canvasChange({ color: item, newGraphColor: graphColor });
								}}
							/>
						) : (
							''
						);
					})}
				</div>
			</div>
			<div
				style={{
					borderBottom: '1px solid #E4E4E4',
					height: '100%',
					width: '90%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<div style={{ marginLeft: 4 }}>填充</div>
				<div style={{ display: 'flex' }}>
					{colors.map((item) => {
						return item !== false ? (
							<div
								key={item}
								style={{
									width: 24,
									height: 24,
									borderRadius: 12,
									margin: 5,
									backgroundColor: item,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
								onClick={() => {
									setGraphColor(item);
									canvasChange({ color: borderColor, newGraphColor: item });
								}}
							/>
						) : (
							<div
								key="false"
								style={{
									width: 24,
									height: 24,
									borderRadius: 12,
									margin: 5,
									border: '1px solid #D6D6D6',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
								onClick={() => {
									setGraphColor(false);
									canvasChange({ color: borderColor, newGraphColor: item });
								}}
							>
								<div
									style={{
										width: 48,
										height: 0,
										border: '1px solid rgba(230, 2, 0, 1)',

										transform: 'rotate(-45deg)'
									}}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
