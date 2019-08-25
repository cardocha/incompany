import React from 'react';
import { List } from 'semantic-ui-react';
import { Mensagem } from './Mensagem';

export const ValidationErrors = ({ erros }) => (
    <List size="small">
        {
            Array.isArray(erros) ?
                erros.map((erro, index) => (
                    <List.Item key={'erro-validacao-usuario-' + index}><Mensagem icon="warning" msg={erro}></Mensagem></List.Item>

                )) : <List.Item key={'erro-validacao-usuario-1'}><Mensagem icon="warning" msg={erros}></Mensagem></List.Item>
        }
    </List>
)
