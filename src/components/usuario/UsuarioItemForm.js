import React from 'react';
import { Form, Button, Header, Dropdown } from 'semantic-ui-react';


export const UsuarioItemForm = ({ usuario,
    titulo, onClickAction, changeAction, tiposUsuariosPossiveis }) =>
    <Form encType="multipart/form-data">
        <Header>{titulo}</Header>
        <Form.Field>
            <label>Nome</label>
            <input name='nome' onChange={changeAction}
                placeholder='Título'
                value={usuario.nome} />
        </Form.Field>
        <Form.Field>
            <label>E-mail</label>
            <input name='email' onChange={changeAction}
                placeholder='E-mail'
                value={usuario.email} />
        </Form.Field>
        <Form.Field>
            <label>Senha</label>
            <input name='senha' type="password" onChange={changeAction}
                placeholder='Senha'
                value={usuario.senha} />
        </Form.Field>
        <Form.Field>
            <label>Tipo</label>
            <Dropdown name='tipo' value={usuario.tipo} clearable onChange={changeAction} options={tiposUsuariosPossiveis} selection />
        </Form.Field>
        <label>&nbsp;</label>
        <Button floated="right" onClick={() => onClickAction('AE')} icon="check" basic></Button>
        <label>&nbsp;</label>
        {
            titulo.includes('Edição') ?
                <Button onClick={() => onClickAction('R')} icon="close" basic></Button> : ''
        }
    </Form>