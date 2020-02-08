import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

export default class EditorDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: BraftEditor.createEditorState(this.props.content),
			oldContent: this.props.content
		};

		console.log('content', this.props.content);
	}
	componentWillUpdate(newProps) {
		if (newProps.onModify === true && this.props.onModify === false) {
			if (newProps.content === this.state.oldContent)
				this.setState({
					editorState: BraftEditor.createEditorState(newProps.content)
				});
			console.log('new123123:', newProps);
		}
	}
	async componentDidMount() {
		// // 假设此处从服务端获取html格式的编辑器内容
		// const htmlContent = '<p></p>';
		// // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
		// this.setState({
		// 	editorState: BraftEditor.createEditorState(htmlContent)
		// });
	}
	async componentDidUpdate() {
		if (this.state.oldContent !== this.props.content) {
			console.log('return');
			console.log('change:', this.props.content);
			console.log('new:', BraftEditor.createEditorState(this.props.content));
			this.setState({
				oldContent: this.props.content,
				editorState: BraftEditor.createEditorState(this.props.content)
			});

			return;
		}
		console.log('onsave:', this.props.onSave);
		if (this.props.onSave === true) {
			this.props.saveContent(this.state.editorState.toHTML());
			console.log('123123');
		}
	}
	submitContent = async () => {
		// 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
		const htmlContent = this.state.editorState.toHTML();
		console.log('htmlContent=>', htmlContent);
		this.props.saveContent(htmlContent);
		// const result = '<p></p>';
	};

	handleEditorChange = (editorState) => {
		this.setState({ editorState });
	};

	render() {
		const { editorState } = this.state;
		return (
			<div className="my-component">
				{this.props.onModify ? (
					<BraftEditor
						value={editorState}
						onChange={this.handleEditorChange}
						onSave={this.submitContent}
						style={{
							border: '1px solid #999',
							height: this.props.height,
							width: this.props.width,
							overflow: 'hidden'
						}}
					/>
				) : this.props.content && this.props.content.length > 0 ? (
					<div dangerouslySetInnerHTML={{ __html: this.props.content }} />
				) : (
					<div>暂无内容，请编辑内容</div>
				)}
			</div>
		);
	}
}
