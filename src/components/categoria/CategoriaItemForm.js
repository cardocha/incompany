import React from 'react';
import { Form, Button, Header } from 'semantic-ui-react';


export const CategoriaItemForm = ({ categoria,
    titulo, onClickAction, changeAction }) =>
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
                <Button onClick={() => onClickAction('AE')} icon="check" basic></Button>
                {
                    titulo.includes('Edição') ?
                        <Button onClick={() => onClickAction('R')} icon="close" basic></Button> : ''
                }
            </Form.Field>
        </Form.Group>
    </Form>