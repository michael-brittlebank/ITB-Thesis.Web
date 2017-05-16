import React from 'react';
import '../../src/css/app.css';
import { storiesOf, action, linkTo, configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

setAddon(infoAddon);

storiesOf('Buttons')
    .addWithInfo(
        'Standard Button - .standard-button',
        '',
        () => (
            <button className="standard-button">Standard Button</button>
        ),
        { inline: true }
    );

storiesOf('Forms')
    .addWithInfo(
        'Standard Form - .standard-form',
        '',
        () => (
            <form className="standard-form">
                <label>Input Label</label>
                <input/>
                <label>Textarea Label</label>
                <textarea/>
            </form>
        ),
        { inline: true }
    );
