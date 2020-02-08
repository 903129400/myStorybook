import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [ removed ] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'white',

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightgreen' : 'white',
	minHeight: '100px',
	overflow: 'auto',
	width: '100%',
	border: '1px solid lightgrey'
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [ { content: '123123', id: '1' }, { content: '222', id: '2' }, { content: '333', id: '3' } ]
		};
	}
	onDragStart = () => {
		console.log('123123');
	};
	onDragUpdate = (result) => {
		console.log('33333', result);
	};
	onDragEnd = async (result) => {
		// dropped outside the list
		console.log('444', result);
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	render() {
		return (
			<div style={{ margin: 20 }}>
				<DragDropContext
					onDragEnd={this.onDragEnd}
					onDragStart={this.onDragStart}
					onDragUpdate={this.onDragUpdate}
				>
					<p style={{ backgroundColor: '#333', color: 'white', padding: 20 }}>
						react-beautiful-dnd组件（熟悉拖拽组件嵌套，没设置DragEnd事件,drop区域3中，嵌套drop区域拖拽插入时下移的部分会很丑，使用时需要加以限制，拖拽的组件最好不要在嵌套区域直接拖拽）
					</p>
					<div style={{ display: 'flex', height: '100%', position: ' absolute ' }}>
						<Droppable droppableId="droppable1">
							{(provided, snapshot) => {
								return (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{ ...getListStyle(snapshot.isDraggingOver), width: 300, margin: 10 }}
									>
										drop区域1
										<Droppable droppableId="droppable1-1">
											{(provided, snapshot) => {
												return (
													<div
														{...provided.droppableProps}
														ref={provided.innerRef}
														style={{
															...getListStyle(snapshot.isDraggingOver),

															height: 300
															// display: this.state.drag ? 'none' : ''
														}}
													>
														<Draggable draggableId={'1-1-1'} index={32}>
															{(provided, snapshot) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																>
																	<div {...provided.dragHandleProps}>drag组件1-1</div>
																</div>
															)}
														</Draggable>
													</div>
												);
											}}
										</Droppable>
										<Droppable droppableId="droppable1-2">
											{(provided, snapshot) => {
												return (
													<div
														{...provided.droppableProps}
														ref={provided.innerRef}
														style={{
															...getListStyle(snapshot.isDraggingOver),

															height: 300
														}}
													>
														drop区域2
														<Draggable draggableId={'1-2-1'} index={32}>
															{(provided, snapshot) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																>
																	<div {...provided.dragHandleProps}>drag组件2-1</div>
																</div>
															)}
														</Draggable>
													</div>
												);
											}}
										</Droppable>
									</div>
								);
							}}
						</Droppable>
						<Droppable droppableId="droppable2">
							{/* type="PERSON"可与其他拖拽表不关联 */}

							{(provided, snapshot) => {
								return (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{ ...getListStyle(snapshot.isDraggingOver), width: 300, margin: 10 }}
									>
										drop区域3
										<Draggable draggableId={'4'} index={4} key={4}>
											{(provided, snapshot) => (
												<div ref={provided.innerRef} {...provided.draggableProps}>
													<div style={{ marginTop: 20, marginBottom: 20 }}>
														<div {...provided.dragHandleProps}>这里拖拽</div>
														<div>drag内容3-1</div>
													</div>
												</div>
											)}
										</Draggable>
										<Droppable droppableId={'droppable2-' + 4} key={4 + '-10-2'}>
											{(provided, snapshot) => {
												return (
													<div
														{...provided.droppableProps}
														ref={provided.innerRef}
														style={{
															...getListStyle(snapshot.isDraggingOver)
														}}
													>
														drop区域3.1
														<Draggable
															draggableId={'5'}
															index={5}
															// key={4 + '-2' + index}
														>
															{(provided, snapshot) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																>
																	<div style={{ marginTop: 20, marginBottom: 20 }}>
																		<div {...provided.dragHandleProps}>这里拖拽</div>
																		<div>drag内容3-2</div>
																	</div>
																</div>
															)}
														</Draggable>
													</div>
												);
											}}
										</Droppable>
										<Draggable draggableId={'6'} index={6} key={6}>
											{(provided, snapshot) => (
												<div ref={provided.innerRef} {...provided.draggableProps}>
													<div style={{ marginTop: 20, marginBottom: 20 }}>
														<div {...provided.dragHandleProps}>这里拖拽</div>
														<div>drag内容3-3</div>
													</div>
												</div>
											)}
										</Draggable>
										<Droppable droppableId={'droppable2-' + 7} key={7 + '-10-2'}>
											{(provided, snapshot) => {
												return (
													<div
														{...provided.droppableProps}
														ref={provided.innerRef}
														style={{
															...getListStyle(snapshot.isDraggingOver)
														}}
													>
														drop区域3.2
														<Draggable
															draggableId={'7'}
															index={7}
															// key={4 + '-2' + index}
														>
															{(provided, snapshot) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																>
																	<div style={{ marginTop: 20, marginBottom: 20 }}>
																		<div {...provided.dragHandleProps}>这里拖拽</div>
																		<div>内容3-4</div>
																	</div>
																</div>
															)}
														</Draggable>
													</div>
												);
											}}
										</Droppable>
									</div>
								);
							}}
						</Droppable>
					</div>
				</DragDropContext>
			</div>
		);
	}
}

// Put the thing into the DOM!
//ReactDOM.render(<App />, document.getElementById('root'));
export default App;
