import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Icon } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
export function Carousels(props) {
	console.log(props);
	const cars = useRef();
	const [ imgArrs, setImgArrs ] = useState(props.imgs || []);
	const [ opcityType, setOpcityType ] = useState(0);

	function onChange(a, b, c) {
		console.log(a, b, c);
	}

	return (
		<div style={{ width: 936, height: 382 }}>
			<div
				style={{
					zIndex: 2,
					position: 'absolute',
					marginTop: 160,
					marginLeft: 20,
					width: 50,
					height: 50,
					borderRadius: 25,
					background: '#999',
					opacity: opcityType === 1 ? 0.8 : 0.4
				}}
				onClick={() => {
					cars.current.prev();
					console.log(cars);
				}}
				onMouseOver={() => setOpcityType(1)}
				onMouseOut={() => setOpcityType(0)}
			>
				<Icon
					type="left"
					style={{
						fontSize: '20px',
						marginTop: 14,
						marginLeft: 14
						// borderTop: '15px solid transparent',
						// borderRight: '20px solid white',
						// borderBottom: '15px solid transparent'
					}}
				/>
			</div>
			<div
				style={{
					zIndex: 2,
					position: 'absolute',
					marginTop: 160,
					marginLeft: 870,
					width: 50,
					height: 50,
					borderRadius: 25,
					background: '#999',
					opacity: opcityType === 2 ? 0.8 : 0.4
				}}
				onClick={() => {
					cars.current.next();
					console.log(cars);
				}}
				onMouseOver={() => setOpcityType(2)}
				onMouseOut={() => setOpcityType(0)}
			>
				<Icon
					type="right"
					style={{
						fontSize: '20px',
						marginTop: 14,
						marginLeft: 14
					}}
				/>
			</div>
			<Carousel ref={cars} afterChange={onChange} style={{ width: '100%', height: '100%', zIndex: 1 }}>
				{imgArrs.map((item, index) => {
					return <img src={item} alt={index} />;
				})}
			</Carousel>
		</div>
	);
}

export function Nav(props) {
	return (
		<div style={{ display: 'flex', height: 382, width: 1152, border: '1px', borderRadius: 100 }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: 216,
					height: 382,
					padding: 17,
					background: '#2b333b',
					color: '#999',
					fontSize: 14
				}}
			>
				<div style={{ marginLeft: 14, marginTop: 18, marginBottom: 18 }}>小菜菜/小菜菜/小菜菜></div>
				<div style={{ marginLeft: 14, marginTop: 18, marginBottom: 18 }}>小菜菜/小菜菜/小菜菜></div>
				<div style={{ marginLeft: 14, marginTop: 18, marginBottom: 18 }}>小菜菜/小菜菜/小菜菜></div>
				<div style={{ marginLeft: 14, marginTop: 18, marginBottom: 18 }}>小菜菜/小菜菜/小菜菜></div>
				<div style={{ marginLeft: 14, marginTop: 18, marginBottom: 18 }}>小菜菜/小菜菜/小菜菜></div>
				<div style={{ marginLeft: 14, marginTop: 18, marginBottom: 18 }}>小菜菜/小菜菜/小菜菜></div>
			</div>
			<Carousels
				imgs={[
					'https://img.mukewang.com/5e5c634e0001993618720764.jpg',
					'https://img.mukewang.com/5e59d4c600017cc318720764.jpg'
				]}
			/>
		</div>
	);
}
