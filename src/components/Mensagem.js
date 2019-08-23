import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Mensagem = ({ msg, icon }) => (
    <span><Icon name={icon} />{msg}</span>
)
