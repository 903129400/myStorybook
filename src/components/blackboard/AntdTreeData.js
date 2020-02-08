const data = {
	Tree: {
		title: 'root',
		key: 'root',
		content: '根节点',
		drags: [
			{
				type: 'text',
				content: '<div>这是一段可拖拽文字</div>'
			},
			{
				type: 'text',
				content: '这是一段可拖拽文字2'
			},
			{
				type: 'text',
				content: '这是一段可拖拽文字3'
			},
			{
				type: 'text',
				content: '这是一段可拖拽文字4'
			},
			{
				type: 'text',
				content: '这是一段可拖拽文字5'
			}
		],
		children: [
			{
				title: '第一章节',

				content: '这是第一章节',
				drags: [
					{
						type: 'text',
						content: '这是一段可拖拽文字1'
					},
					{
						type: 'text',
						content: '这是一段可拖拽文字2'
					},
					{
						type: 'text',
						content: '这是一段可拖拽文字3'
					}
				],
				children: [
					{
						title: '第二章节',
						content: '这是第二章节'
					},
					{
						title: '第三章节',
						content: '这是第三章节'
					},
					{
						title: '第四章节',
						content: '这是第四章节'
					}
				]
			},
			{
				title: '第五章节',

				content: '这是第五章节',
				children: [
					{
						title: '第六章节',
						content: '这是第六章节'
					},
					{
						title: '第七章节',
						content: '这是第七章节'
					},
					{
						title: '第八章节',
						content: '这是第八章节'
					}
				]
			},
			{
				title: '第九章节',

				content: '这是第九章节'
			}
		]
	}
};

export { data };
