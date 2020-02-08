import { Modal, Button, Input } from 'antd';
import Editor from '../braftEditor/index';
import React from 'react';
class Tables extends React.Component {
	state = {
		content: '',
		title: '',
		changeState: true,
		onSave: false
	};
	onModify = () => {
		this.setState({ changeState: true });
		console.log('onModify');
	};
	onClose = () => {
		this.setState({ changeState: false });
	};
	onChange = () => {
		this.setState({ changeState: false, onSave: true });
		console.log('onChange');
	};

	render() {
		const { title, content } = this.state;
		return (
			<div style={{ width: '800px', margin: '20px' }}>
				<p style={{ backgroundColor: '#333', color: 'white' }}> 简单使用了一下braftEditor</p>
				<div style={{ display: 'flex', marginTop: '20px' }}>
					标题：
					{this.state.changeState ? (
						<Input
							style={{ width: '500px' }}
							onChange={(e) => {
								this.setState({ title: e.target.value });
							}}
							value={title}
						/>
					) : (
						this.state.title
					)}
				</div>
				<div style={{ height: '500px', width: '800px', margin: '20px', overflow: 'auto' }}>
					<Editor
						saveContent={(newContent) => {
							this.setState({ content: newContent, onSave: false });
						}}
						content={this.state.content}
						onModify={this.state.changeState}
						onSave={this.state.onSave}
						height="460px"
						width="800px"
					/>
				</div>
				<div style={{ float: 'right', paddingTop: '20px' }}>
					<Button
						style={{ marginLeft: '10px' }}
						key="submit"
						type="primary"
						onClick={this.state.changeState ? this.onChange : this.onModify}
						ghost={this.state.changeState ? false : true}
					>
						{this.state.changeState ? '浏览' : '编辑'}
					</Button>
					<Button
						style={{ marginLeft: '10px' }}
						key="sub"
						onClick={() => {
							console.log('数据:', this.state);
						}}
						disabled={this.state.changeState}
					>
						发布
					</Button>
					<Button
						style={{ marginLeft: '10px' }}
						key="back"
						onClick={this.onClose}
						disabled={!this.state.changeState}
					>
						返回
					</Button>
				</div>
			</div>
		);
	}
}
export default Tables;
