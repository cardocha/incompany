import React from 'react';
import { Link } from 'react-router-dom'
import { List, Icon, Divider, Segment, Button } from 'semantic-ui-react';

export const UsuarioItem = ({ usuario }) => (
    <List.Item>
        <Link to={`/usuarios/${usuario.id}`}>
            <Button className="botao-item-sistema" basic>
                <List.Content>
                    <Segment compact basic>
                        <Icon name='user' size='big' />
                        <List.Header className="nome-list">{usuario.nome}</List.Header>
                        <Divider></Divider>
                        {usuario.login}
                    </Segment>
                </List.Content>
            </Button>
        </Link>
    </List.Item>
)