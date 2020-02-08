import React, { useState } from 'react';

export function Me() {
	// 声明一个新的叫做 “count” 的 state 变量
	const [ count, setCount ] = useState(0);

	return (
		<div style={{ margin: 40 }}>
			<p> 姓名:俞尚山</p>
			<p> 居住地:浙江杭州</p>
			<p> Github:903129400</p>
			<p>项目地址:</p>
		</div>
	);
}
