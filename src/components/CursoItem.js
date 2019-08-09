import React from 'react';
import { List, Icon, Button, Divider, Label, Segment } from 'semantic-ui-react';

export const CursoItem = ({ curso }) => (
    <List.Item>
        <Button basic>
            <List.Content>
                <Segment compact basic>
                    <Icon name='cube' size='big' />
                    <List.Header>{curso.titulo}</List.Header>
                    <Divider></Divider>
                    {curso.nomeTutor}
                    <Label size="mini" attached="bottom right">
                        <Icon name='user' /> 23
                    </Label>
                    <Label size="mini" attached="bottom left">
                        <Icon name='user' /> 23
                    </Label>
                    <Divider></Divider>
                </Segment>
            </List.Content>
        </Button>
    </List.Item>
)