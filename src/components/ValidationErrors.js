import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { Mensagem } from './Mensagem';

export const ValidationErrors = ({ erros }) => (
    <List size="small">
        {erros.map((erro, index) => (
            <List.Item key={'erro-validacao-usuario-' + index}><Mensagem icon="warning" msg={erro}></Mensagem></List.Item>

        ))}
    </List>
)
