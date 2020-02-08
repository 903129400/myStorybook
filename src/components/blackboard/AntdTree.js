import React, { Component } from 'react';
import { Tree, Icon, Switch } from 'antd';
import { data } from './AntdTreeData';
const { TreeNode } = Tree;

class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: data.Tree
		};
	}
	mapTree = (data, key) => {
		console.log('datas', data);
		return (
			<TreeNode title={key === 0 ? 'root' : key + ':' + data.title} key={key === 0 ? 'root' : key}>
				{/* title 设置为data.title显示data的title*/}
				{data.children &&
					data.children.map((item, index) => {
						return this.mapTree(item, key === 0 ? '' + index : key + '-' + index);
					})}
			</TreeNode>
		);
	};
	selectFrom = (data, arr) => {
		console.log('select=>', data, arr);
		const [ num, ...newArr ] = arr;
		const newData = data.children[num];
		if (newArr.length === 0 || !newData.children || num === 'root')
			return {
				data,
				num: num === 'root' ? 'root' : parseInt(num)
			};
		return this.selectFrom(newData, newArr);
	};
	onDrop = (e) => {
		const from = e.dragNode.props.eventKey; //拖拽起始节点位置
		const end = e.node.props.eventKey; //拖拽结束节点位置
		const dropPos = e.node.props.pos.split('-');
		const to = e.dropPosition - Number(dropPos[dropPos.length - 1]); //拖拽插入位置位于节点相对位置，-1为插入节点前，0为插入节点内，1为插入节点后
		if ((end === 'root' && (to === -1 || to === 1)) || from === 'root') return 0;
		const fromArr = from.split('-');
		const endArr = end.split('-');
		const data = this.state.data;
		const fromDatafrom = this.selectFrom(data, fromArr); //获取拖拽位置父级数据和拖拽点所处位置
		const fromData = fromDatafrom.data.children[fromDatafrom.num]; //获取拖拽位置数据
		const endDatafrom = this.selectFrom(data, endArr);
		if (endDatafrom.num === 'root') {
			//如果放置的位置在root上，在root的children末尾增加拖动内容
			endDatafrom.data.children.push(fromData);
		} else {
			if (to !== 0) {
				//drop在end支点前/后的添加数据操作
				endDatafrom.data.children.splice(to === -1 ? endDatafrom.num : endDatafrom.num + to, 0, fromData);
			} else {
				//drop在end支点上的添加数据操作
				if (!endDatafrom.data.children[endDatafrom.num].children)
					endDatafrom.data.children[endDatafrom.num].children = [];
				endDatafrom.data.children[endDatafrom.num].children.push(fromData);
			}
		}
		if (fromDatafrom.data.children[fromDatafrom.num] === fromData)
			fromDatafrom.data.children.splice(fromDatafrom.num, 1);
		else fromDatafrom.data.children.splice(fromDatafrom.num + 1, 1); //删除拖动内容原来位置的数据，有可能end点在原位置前，因此要判断是否在原位置

		this.setState({ data: {} });
		this.setState({ data });
	};
	render() {
		const { data } = this.state;
		console.log('data', data);
		if (!data.title || !data.key) return <div>数据不存在</div>;
		return (
			<div style={{ margin: 20 }}>
				<p style={{ backgroundColor: '#333', color: 'white', padding: 20 }}>
					{' '}
					大半夜自己实现antd Tree组件 的onDrop函数拖拽与合并，瞟了一眼示例函数理解太麻烦自己写了，再一次感受到js对象引用的方便之处，爽翻！
				</p>
				<Tree
					showLine={true}
					defaultExpandedKeys={[ 'root' ]}
					draggable
					onDrop={(e) => {
						this.onDrop(e);
					}}
				>
					{this.mapTree(data, 0)}
				</Tree>
			</div>
		);
	}
}

export default Demo;
