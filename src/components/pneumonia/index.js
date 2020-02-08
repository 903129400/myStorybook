import React from 'react';
import { Collapse, Card, Input, InputNumber, Tooltip, Affix, Button, Popconfirm, notification } from 'antd';
import request from '../../config/request';
import data from './data';

const { Panel } = Collapse;
class Design extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			select: '',
			data: data,
			confirmedSum: 0,
			curedCountSum: 0,
			deadCountSum: 0
		};
		console.log(this.state);
	}

	callback = (key) => {
		console.log(key);
	};
	componentDidMount = async () => {
		await request
			.get('https://service-0gg71fu4-1252957949.gz.apigw.tencentcs.com/release/dingxiangyuan')
			.then((e) => {
				e && this.setState({ data: e });
			});
	};
	render() {
		const day = new Date();
		let sum = this.state.data.data.getAreaStat.reduce((pre, item) => {
			return {
				confirmedCount: pre.confirmedCount + item.confirmedCount || 0,
				curedCount: pre.curedCount + item.curedCount || 0,
				deadCount: pre.deadCount + item.deadCount || 0
			};
		});
		console.log('zongshu', sum);
		return (
			<div style={{ margin: 20 }}>
				<p style={{ backgroundColor: '#333', color: 'white', padding: 20 }}> 数据来自丁香园，武汉加油，中国加油！</p>

				<div style={{ display: 'flex' }}>
					<div style={{ width: '100%' }}>
						<div style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
							查找省份:<Input
								style={{ width: '300px' }}
								placeholder="输入关键字"
								onChange={(e) => {
									this.setState({ select: e.target.value });
								}}
							/>
						</div>

						<Collapse defaultActiveKey={[]} onChange={this.callback}>
							{this.state.data.data.getAreaStat.map((item, index) => {
								if (this.state.select !== '') {
									if (item.provinceName.indexOf(this.state.select) === -1) return false;
								}
								return (
									<Panel
										header={
											item.provinceName +
											'  确断:' +
											item.confirmedCount +
											'  治愈:' +
											item.curedCount +
											'  死亡:' +
											item.deadCount +
											'  ' +
											item.comment
										}
										key={index}
									>
										{item.cities.map((cityData, j) => {
											return (
												<div style={{ display: 'flex' }} key={j}>
													<p>
														{cityData.cityName + ' '}
														确诊人数:{cityData.confirmedCount + ' '}
														治愈人数:{cityData.curedCount + ' '}
														死亡人数:{cityData.deadCount + ' '}
													</p>
												</div>
											);
										})}
									</Panel>
								);
							})}
						</Collapse>
					</div>
					<div>
						<Affix offsetTop={50} style={{ margin: 20, marginTop: 50, width: '300px' }}>
							<Card style={{ width: '300px' }}>
								<p>确诊总数:{sum.confirmedCount}</p>
								<p>治愈总数:{sum.curedCount}</p>
								<p>死亡总数:{sum.deadCount}</p>
								<p>
									时间:{this.state.data === data ? (
										'已过期'
									) : (
										day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
									)}
								</p>
							</Card>
						</Affix>
					</div>
				</div>
			</div>
		);
	}
}

export default Design;
