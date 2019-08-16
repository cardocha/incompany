import React from 'react';
import { Link } from 'react-router-dom'
import { List, Icon, Divider, Label, Segment, Button } from 'semantic-ui-react';

export const CursoItem = ({ curso }) => (
    <List.Item>
        <Link to={`/cursos/${curso.id}`}>
            <Button className="botao-item-sistema" basic>
                <List.Content>
                    <Segment compact basic>
                        <Icon name='cube' size='big' />
                        <List.Header className="nome-list">{curso.titulo}</List.Header>
                        <Divider></Divider>
                        {curso.nomeTutor}
                        <Label size="mini" basic>
                            <Icon name='user' /> 23
                    </Label>
                    </Segment>
                </List.Content>
            </Button>
        </Link>
    </List.Item>
)