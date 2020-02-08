import React, { Component } from 'react';
import { Affix, Tree, Modal, Card, Message, Input, Icon } from 'antd';
import { data } from './AntdTreeData';
import './board.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
const { TreeNode } = Tree;
const { TextArea } = Input;
class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: data.Tree,
			modalVisible: false,
			modalData: {},
			modalKey: '',
			selectionNodeId: 'root',
			inputOpen: '',
			inputValue: ''
		};
	}
	getListStyle = (isDraggingOver) => ({
		background: isDraggingOver ? 'lightgreen' : 'white',
		minHeight: '300px',
		overflow: 'auto',
		width: '100%',
		border: '1px solid lightgrey'
	});
	selectFrom = (data, arr) => {
		const [ num, ...newArr ] = arr;
		const newData = data.children[num];
		if (newArr.length === 0)
			return {
				data,
				num: num === 'root' ? 'root' : parseInt(num)
			};
		return this.selectFrom(newData, newArr);
	};
	selectDrag = (data, arr) => {
		const [ num, ...newArr ] = arr;
		const newData = data.children[num];
		console.log('arr', arr, num, newArr);
		if (newArr.length === 0)
			return {
				data: newData,
				num: num === 'root' ? 'root' : parseInt(num)
			};
		return this.selectDrag(newData, newArr);
	};
	onDragEnd = async (result) => {
		const data = this.state.data;
		const from = result.source.droppableId.split('-');
		const fromIndex = result.source.index;
		const fromData = from[0] === 'root' ? { data } : this.selectDrag(data, from);
		const end = result.destination.droppableId.split('-');
		let endIndex = result.destination.index;
		console.log('123', end);
		const endData = end[0] === 'root' ? { data } : this.selectDrag(data, end);
		console.log('444', fromData, endData, from, end);
		if (!fromData.data.drags) fromData.data.drags = [];
		if (!endData.data.drags) endData.data.drags = [];
		const dragData = fromData.data.drags[fromIndex];
		if (result.source.droppableId === result.destination.droppableId && fromIndex < endIndex)
			endIndex = endIndex + 1;
		endData.data.drags.splice(endIndex, 0, dragData);
		fromData.data.drags[fromIndex] === dragData
			? fromData.data.drags.splice(fromIndex, 1)
			: fromData.data.drags.splice(fromIndex + 1, 1);
		this.setState({ data: {} });
		this.setState({ data });
	};
	mapDrag = (data, key, layer) => {
		//layer:层数+4，用来改变hi的大小
		return (
			<div key={key}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<h1 style={{ fontSize: 36 - layer }}>{data.content}</h1>
					<span
						style={{ marginRight: 20, marginTop: 5 }}
						onClick={() => {
							console.log(data);
							this.setState({ modalVisible: true, modalData: data, modalKey: key });
						}}
					>
						编辑
					</span>
				</div>

				<Droppable droppableId={key}>
					{(provided, snapshot) => {
						return (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{
									...this.getListStyle(snapshot.isDraggingOver),

									width: '100%'
								}}
								id={key}
							>
								{data.drags &&
									data.drags.map((item, index) => {
										return (
											<Draggable
												draggableId={key + ':' + index}
												index={index}
												key={key + ':' + index}
											>
												{(provided, snapshot) => (
													<div ref={provided.innerRef} {...provided.draggableProps}>
														<Card style={{ margin: 10 }}>
															<div {...provided.dragHandleProps}>::</div>

															<div dangerouslySetInnerHTML={{ __html: item.content }} />
														</Card>
													</div>
												)}
											</Draggable>
										);
									})}
							</div>
						);
					}}
				</Droppable>
				{data.children &&
					data.children.map((item, index) => {
						return this.mapDrag(
							item,
							key === 'root' ? '' + index : key + '-' + index,
							layer < 16 ? layer + 4 : layer
						);
					})}
			</div>
		);
	};
	mapTree = (data, key, fatherData = '') => {
		return (
			<TreeNode
				title={
					<ContextMenuTrigger
						id="context"
						key={key === 0 ? 'root' : key}
						data={{ key: key === 0 ? 'root' : key, data, fatherData }}
						collect={(props) => ({ data: props.data })}
					>
						{key === 0 ? 'root' : key + ':' + data.title}
					</ContextMenuTrigger>
				}
				key={key === 0 ? 'root' : key}
			>
				{/* title 设置为data.title显示data的title*/}

				{data.children &&
					data.children.map((item, index) => {
						return this.mapTree(item, key === 0 ? '' + index : key + '-' + index, data);
					})}
			</TreeNode>
		);
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
	handleOk = () => {
		this.setState({ modalVisible: false });
	};
	handleCancel = () => {
		this.setState({ modalVisible: false });
	};
	render() {
		const { data, modalData, modalKey } = this.state;
		if (!data.title || !data.key) return <div>数据不存在</div>;
		return (
			<div style={{ margin: 20 }}>
				<p style={{ backgroundColor: '#333', color: 'white', padding: 20 }}>
					利用前面几个插件简单实现了个board编辑页面，暂时只使用了文本内容，后续添加富文本等插件，未完待续
				</p>
				<div style={{ display: 'flex', marginTop: 20, width: '100%' }}>
					<Modal
						title="设置节点内容"
						visible={this.state.modalVisible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						width="100%"
						style={{ top: 0 }}
					>
						<div style={{ display: 'flex' }}>
							<div style={{ height: 600, overflow: 'scroll', flex: 1 }}>
								<DragDropContext onDragEnd={this.onDragEnd}>
									<Droppable droppableId={modalKey}>
										{(provided, snapshot) => {
											return (
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													style={{
														...this.getListStyle(snapshot.isDraggingOver),

														width: '100%'
													}}
												>
													{modalData.drags &&
														modalData.drags.map((item, index) => {
															return (
																<Draggable
																	draggableId={modalKey + ':' + index}
																	index={index}
																	key={modalKey + ':' + index}
																>
																	{(provided, snapshot) => (
																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																		>
																			<Card style={{ margin: 10 }}>
																				<div
																					style={{
																						display: 'flex',
																						justifyContent: 'space-between'
																					}}
																				>
																					<div {...provided.dragHandleProps}>
																						::
																					</div>

																					<div
																						style={{
																							display: 'flex'
																						}}
																					>
																						<div
																							style={{ marginRight: 20 }}
																							onClick={() => {
																								if (
																									this.state
																										.inputOpen ===
																									modalKey +
																										':' +
																										index
																								) {
																									const oldData = this
																										.state.data;
																									item.content = this.state.inputValue;
																									this.setState({
																										inputOpen: '',
																										inputValue: '',
																										data: oldData
																									});
																									return;
																								}
																								this.setState({
																									inputOpen:
																										modalKey +
																										':' +
																										index,
																									inputValue:
																										item.content
																								});
																							}}
																						>
																							{this.state.inputOpen ===
																							modalKey + ':' + index ? (
																								'保存'
																							) : (
																								'编辑'
																							)}
																						</div>
																						<div
																							onClick={() => {
																								console.log(
																									'123',
																									modalData
																								);
																								const oldData = this
																									.state.data;
																								modalData.drags = modalData.drags.filter(
																									(e) => e !== item
																								);
																								this.setState({
																									data: {}
																								});
																								this.setState({
																									data: oldData,
																									inputOpen: '',
																									inputValue: ''
																								});
																							}}
																						>
																							删除
																						</div>
																					</div>
																				</div>

																				{this.state.inputOpen ===
																				modalKey + ':' + index ? (
																					<TextArea
																						defaultValue={
																							this.state.inputValue
																						}
																						onChange={(e) => {
																							this.setState({
																								inputValue:
																									e.target.value
																							});
																						}}
																						autoSize={{
																							minRows: 2,
																							maxRows: 6
																						}}
																					/>
																				) : (
																					<div
																						dangerouslySetInnerHTML={{
																							__html: item.content
																						}}
																					/>
																				)}
																			</Card>
																		</div>
																	)}
																</Draggable>
															);
														})}
												</div>
											);
										}}
									</Droppable>
								</DragDropContext>
							</div>
							<div
								style={{
									width: 400,
									height: 600,
									fontSize: 24,
									marginLeft: 10,
									border: '1px solid lightgrey'
								}}
							>
								<div
									onClick={() => {
										console.log('this', this.state.modalData);
										const oldData = this.state.data;
										const newModalData = this.state.modalData;
										if (!newModalData.drags) newModalData.drags = [];
										newModalData.drags.push({
											type: 'text',
											content: '这是一段可拖拽文字'
										});
										this.setState({ data: {}, modalData: {} });
										this.setState({ data: oldData, modalData: newModalData });
									}}
									style={{ height: 80, padding: 20, borderBottom: '1px solid lightgrey' }}
								>
									<Icon type="plus-square" /> 点击添加文本块
								</div>
								<div style={{ height: 80, padding: 20, borderBottom: '1px solid lightgrey' }}>
									添加其他展示插件（未完待续）
								</div>
							</div>
						</div>
					</Modal>
					<div style={{ flexGrow: 1 }}>
						<DragDropContext onDragEnd={this.onDragEnd}>{this.mapDrag(data, 'root', 0)}</DragDropContext>
					</div>
					<Affix offsetTop={40} style={{ margin: 20, left: 100, width: 300 }}>
						<div>
							<p style={{ backgroundColor: '#333', color: 'white' }}>拖拽或右击节点进行操作</p>
							<Tree
								showLine={true}
								defaultExpandedKeys={[ 'root' ]}
								draggable
								onDrop={(e) => {
									this.onDrop(e);
								}}
								onSelect={(e) => {
									console.log('123', e);

									this.setState({
										selectionNodeId: e[0] || 'root'
									});
									const dom = document.getElementById(e[0]);
									dom && dom.scrollIntoView();
									console.log('333');
								}}
							>
								{this.mapTree(data, 0)}
							</Tree>
						</div>
					</Affix>
					<ContextMenu
						id="context"
						style={{
							backgroundColor: '#333',
							color: ' white',
							zIndex: 10
						}}
					>
						<MenuItem
							className="menuItem"
							onClick={(e, data) => {
								console.log('1', data);
								this.setState({
									modalVisible: true,
									modalData: data.data.data,
									modalKey: data.data.key
								});
							}}
							data={{ type: 'edit' }}
						>
							<div className="menuItemContent">编辑</div>
						</MenuItem>
						<MenuItem
							className="menuItem"
							onClick={(e, data) => {
								const oldData = this.state.data;
								console.log('1', data);
								const modalData = data.data.data;
								if (!modalData.children) modalData.children = [];
								modalData.children.push({ title: '未命名', content: '请填写内容', drags: [], children: [] });
								this.setState({ data: {} });
								this.setState({ data: oldData });
							}}
							data={{ type: 'increase' }}
						>
							<div className="menuItemContent">增加子章节</div>
						</MenuItem>

						<MenuItem
							className="menuItem"
							onClick={(e, data) => {
								if (data.data.key === 'root') {
									Message.error('不允许删除根节点');
									return;
								}
								const oldData = this.state.data;
								data.data.fatherData.children = data.data.fatherData.children.filter(
									(e) => e !== data.data.data
								);

								this.setState({ data: {} });
								this.setState({ data: oldData });
							}}
							data={{ type: 'delete' }}
						>
							<div className="menuItemContent">删除</div>
						</MenuItem>
					</ContextMenu>
				</div>
			</div>
		);
	}
}

export default Demo;
