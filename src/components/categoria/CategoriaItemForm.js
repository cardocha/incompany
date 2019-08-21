import React from 'react';
import { Form, Button, Header, Popup, Icon } from 'semantic-ui-react';


export const CategoriaItemForm = ({ categoria, 
    icon, titulo, position, buttonFloated, onclickAction, changeAction }) =>
    <Popup wide="very"
        trigger={
            <Button className="pointer"
             as="a" 
             floated={buttonFloated} basic size="mini"> <Icon name="add"></Icon> Adicionar</Button>
        }
        content={
            <Form encType="multipart/form-data">
                <Header>{titulo}</Header>
                <Form.Group widths="16">
                    <Form.Field>
                        <label>Título</label>
                        <input onChange={changeAction} 
                            placeholder='Título'
                            value={categoria.descricao} />
                    </Form.Field>
                    <Form.Field >
                        <label>&nbsp;</label>
                        <Button onClick={onclickAction} icon="check" basic></Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        }
        on='click'
        position={position}
    />