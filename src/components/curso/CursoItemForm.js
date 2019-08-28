import React from 'react';
import { Form, Button, Header, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export const CursoItemForm = ({ curso,
    titulo, onClickAction, changeAction, categorias }) =>
    <Form encType="multipart/form-data">
        <Header>{titulo}</Header>
        <Form.Field>
            <label>Título</label>
            <input placeholder='Título'
                name="titulo"
                type="text"
                value={curso.titulo}
                onChange={changeAction} />
        </Form.Field>
        <Form.Field>
            <label>Categoria</label>
            <Dropdown name="categoria_id" onChange={changeAction} value={curso.categoria_id} clearable options={categorias} selection />
        </Form.Field>
        <Form.Field>
            <label>Nome Tutor</label>
            <input placeholder='Nome do Tutor'
                name="nome_tutor"
                type="text"
                onChange={changeAction}
                value={curso.nome_tutor} />
        </Form.Field>
        <label>&nbsp;</label>
        <Button floated="right" onClick={() => onClickAction('AE')} icon="check" basic></Button>
        <label>&nbsp;</label>
        {
            titulo.includes('Edição') ?
                <Button.Group basic>
                    <Button onClick={() => onClickAction('R')} icon="close" ></Button>
                    <Link to={`/cursos/${curso.id}`}><Button onClick={() => onClickAction('E')} icon="pencil" ></Button></Link>
                </Button.Group> : ''
        }
    </Form>