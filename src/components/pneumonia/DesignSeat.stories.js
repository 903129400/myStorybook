import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pneumonia from './index';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('Pneumonia', module).add('Pneumonia', () => <Pneumonia />);

