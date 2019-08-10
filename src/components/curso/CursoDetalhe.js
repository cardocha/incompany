import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import { Segment, Form, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export class CursoDetalhe extends Component {
    state = {
        curso: {}
    }

    async componentDidMount() {
        const curso = await CursoRepository.findById(this.props.match.params.id)
        this.setState({ curso })
    }

    render() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <label>Título</label>
                        <input placeholder='Título' value={this.state.curso.titulo} />
                    </Form.Field>
                    <Form.Field>
                        <label>Nome Tutor</label>
                        <input placeholder='Nome do Tutor' value={this.state.curso.nomeTutor} />
                    </Form.Field>
                    <Button type='submit'>Salvar</Button>
                    <Link to='/'><Button type='submit'>Cancelar</Button></Link>
                </Form>
            </Segment>
        );
    }
}