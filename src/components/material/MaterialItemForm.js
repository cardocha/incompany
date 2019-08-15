import React from 'react';
import { Form, Button, Header, Popup } from 'semantic-ui-react';


export const MaterialItemForm = ({ material, icon, titulo, position, buttonFloated }) =>
    <Popup wide="very"
        trigger={
            <Button floated={buttonFloated} icon={icon} size="mini" basic></Button>
        }
        content={
            <Form>
                <Header>{titulo}</Header>
                <Form.Group widths="16">
                    <Form.Field>
                        <label>Título</label>
                        <input placeholder='Título'
                            defaultValue={titulo.includes("Editar") ? material.titulo : ''} />
                    </Form.Field>
                    <Form.Field >
                        <label>Link</label>
                        <input placeholder='link do material'
                            defaultValue={titulo.includes("Editar") ? material.url : ''} />
                    </Form.Field>
                    <Form.Field >
                        <label>&nbsp;</label>
                        <Button icon="check" basic></Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        }
        on='click'
        position={position}
    />