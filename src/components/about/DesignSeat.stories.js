import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Me } from './index';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('About', module).add('me', () => <Me />);
