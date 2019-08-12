import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import { Segment, Form, Button, Divider, Accordion, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import './curso-detalhe.css'
import { MaterialList } from '../material/MaterialList';

export class CursoDetalhe extends Component {
    state = {
        curso: {},
        unidades: []
    }

    async componentDidMount() {
        const curso = await CursoRepository.findById(this.props.match.params.id)
        this.setState({ curso })
        this.setState({ unidades: this.buildUnidades(curso) })
    }

    buildUnidades(curso) {
        const accordionsUnidades = []
        curso.unidades.forEach(unidade => {
            accordionsUnidades.push({
                key: unidade.id, title: unidade.titulo, content: {
                    content: (
                        <div>
                            <MaterialList materiais={unidade.materiais}></MaterialList>
                            <Button basic floated="right" size="mini" > Remover unidade {unidade.titulo}</Button>
                        </div>
                    )
                }
            });
        });
        return accordionsUnidades;
    }

    render() {
        return (
            <Segment className="bottom-extended">
                <Header>{this.state.curso.titulo}</Header>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Título</label>
                            <input placeholder='Título' value={this.state.curso.titulo} />
                        </Form.Field>
                        <Form.Field>
                            <label>Nome Tutor</label>
                            <input placeholder='Nome do Tutor' value={this.state.curso.nomeTutor} />
                        </Form.Field>
                    </Form.Group>
                    <Divider></Divider>
                    <Header className="header-detalhes">Unidades</Header>
                    <Accordion panels={this.state.unidades} styled />
                    <Button.Group floated='right'>
                        <Button className='button-action-detail'> <Icon name='check' /> Salvar</Button>
                        <Link to='/'><Button> <Icon name='arrow left' />Cancelar</Button></Link>
                    </Button.Group>
                </Form>
            </Segment>
        );
    }
}