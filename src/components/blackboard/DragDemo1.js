import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (count) =>
	Array.from({ length: count }, (v, k) => k).map((k) => ({
		id: `item-${k}`,
		content: `item ${k}`
	}));

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
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 800
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: getItems(10)
		};
	}
	onDragStart = () => {
		console.log('123123');
	};
	onDragUpdate = () => {
		console.log('33333');
	};
	onDragEnd = async (result) => {
		// dropped outside the list

		if (!result.destination) {
			return;
		}

		const items = reorder(this.state.items, result.source.index, result.destination.index);

		await this.setState({
			items
		});
		console.log('onDragEnd', result);
		console.log('state', this.state.items);
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	render() {
		return (
			<div style={{ margin: 20 }}>
				<DragDropContext
					style={{ width: '600px', margin: 20 }}
					onDragEnd={this.onDragEnd}
					onDragStart={this.onDragStart}
					onDragUpdate={this.onDragUpdate}
				>
					<p style={{ backgroundColor: '#333', color: 'white', padding: 20 }}>
						react-beautiful-dnd简单练习demo1{' '}
					</p>
					<p>DragDropContext</p>
					<Droppable droppableId="droppable" style={{ width: '600px' }}>
						{(provided, snapshot) => {
							console.log('1333', provided, snapshot);
							return (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}
								>
									Droppable
									{this.state.items.map((item, index) => {
										return (
											<Draggable
												style={{ width: '600px' }}
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														style={getItemStyle(
															snapshot.isDragging,
															provided.draggableProps.style
														)}
													>
														<p>{item.content}</p>
														<p>index:{index + 1}</p>
													</div>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>
				</DragDropContext>
			</div>
		);
	}
}

// Put the thing into the DOM!
//ReactDOM.render(<App />, document.getElementById('root'));
export default App;
