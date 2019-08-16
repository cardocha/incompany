import React from 'react';
import { List, Icon, Divider, Segment, Button, Label } from 'semantic-ui-react';

export const CategoriaItem = ({ categoria }) => (
    <List.Item>
        <Button className="botao-item-sistema" basic>
            <List.Content>
                <Segment compact basic>
                    <Icon name='grid layout' size='big' />
                    <List.Header className="nome-list">{categoria.nome}</List.Header>
                    <Divider></Divider>
                    <Label size="mini" basic>
                        <Icon name='cube' /> {categoria.qtdCursos}
                    </Label>
                </Segment>
            </List.Content>
        </Button>
    </List.Item>
)