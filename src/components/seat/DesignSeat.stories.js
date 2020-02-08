import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Seat from './designSeat/index';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('DesignSeat', module).add('Design', () => <Seat />);
// export const withAButton = () => (
// 	<button disabled={boolean('Disabled', false)}>{text('Label', 'Hello Storybook')}</button>
// );
// export const asDynamicVariables = () => {
// 	const name = text('Name', 'James');
// 	const age = number('Age', 35);
// 	const content = `I am ${name} and I'm ${age} years old.`;

// 	return <div>{content}</div>;
// };
// export default {
// 	title: 'Storybook Knobs',
// 	decorators: [ withKnobs, withAButton, asDynamicVariables ]
// };
