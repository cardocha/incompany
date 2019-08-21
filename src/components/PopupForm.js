import React from 'react';
import {Popup } from 'semantic-ui-react';

export const PopupForm = ({ position, content, trigger }) => (
    <Popup wide="very"
        trigger={
            trigger
        }
        content={
            { content }
        }
        on='click'
        position={position}>
    </Popup>
)