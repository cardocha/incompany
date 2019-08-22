import React from 'react';
import { Popup } from 'semantic-ui-react';

export const PopupForm = ({ position, content, trigger, onCloseAction }) => (
    <Popup wide="very"
        onClose={onCloseAction}
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