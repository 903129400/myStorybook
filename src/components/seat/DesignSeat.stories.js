import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Seat from './designSeat/index';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('DesignSeat', module).add('Design', () => <Seat />);
