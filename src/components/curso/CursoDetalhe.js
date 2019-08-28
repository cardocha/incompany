import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import {
    Segment, Form, Button, Divider, Accordion,
    Header, Label, Icon,
    Popup, Input, Dropdown, List
} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import './curso-detalhe.css'
import { MaterialList } from '../material/MaterialList';
import { Auth } from '../../api/Auth';
import { CategoriaRepository } from '../../api/CategoriaRepository';

export class CursoDetalhe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursoSelecionado: {},
            unidades: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        const curso = await CursoRepository.findById(this.props.match.params.id)
        const categorias = await CategoriaRepository.all();
        this.setState({ categorias: this.buildDropdownItensCategoria(categorias.data) })
        this.setState({ cursoSelecionado: curso.data })
        this.setState({ unidades: this.buildUnidades(curso.data) })
    }

    buildDropdownItensCategoria(categorias) {
        let categoriasItens = []
        categorias.map(categoria => {
            return categoriasItens.push({ key: categoria.id, text: categoria.descricao, value: categoria.id })
        })
        return categoriasItens
    }

    handleChange(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const curso = this.state.cursoSelecionado
        curso[element.name] = element.value
        curso.usuario_id = Auth.get().id
        this.setState({ cursoSelecionado: curso })
    }

    handleClick(acao) {
        if (acao === "AE") {
            this.salvarCurso()
        } else
            if (acao === "R") {
                this.removerCurso()
            }
    }

    getTags() {
        return [
            { id: 1, nome: "teste" },
            { id: 2, nome: "teste" }
        ]
    }

    getCategorias() {
        return [
            { key: 1, text: 'Costura Integrada', value: 1 },
            { key: 2, text: 'Teste 2', value: 2 },
            { key: 3, text: '3', value: 3 }
        ]
    }

    buildUnidades(curso) {
        const accordionsUnidades = []
        curso.unidades.forEach(unidade => {
            accordionsUnidades.push({
                key: unidade.id, title: unidade.titulo, content: {
                    content: (
                        <div>
                            <MaterialList curso={curso} materiais={unidade.materiais}></MaterialList>
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
                <Header>{this.state.titulo}</Header>
                <Form>
                    <Form.Group>
                        <Form.Field width={6} >
                            <label>Título</label>
                            <input placeholder='Título'
                                name="titulo"
                                type="text"
                                value={this.state.cursoSelecionado.titulo}
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field width={5}>
                            <label>Categoria</label>
                            <Dropdown clearable
                                name='categoria_id'
                                value={this.state.cursoSelecionado.categoria_id}
                                onChange={this.handleChange} 
                                options={this.state.categorias} selection />
                        </Form.Field>
                        <Form.Field width={5}>
                            <label>Nome Tutor</label>
                            <input placeholder='Nome do Tutor'
                                name="nome_tutor"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.cursoSelecionado.nome_tutor} />
                        </Form.Field>
                        <Form.Field width={4}>
                            <label>Tags</label>
                            <Input
                                icon='tags'
                                size="small"
                                iconPosition='left'
                                label={{ tag: false, content: 'Adicionar', basic: true }}
                                labelPosition='right'
                                placeholder='Enter tags'
                            />
                        </Form.Field>
                    </Form.Group>
                    <List horizontal>
                        {
                            this.getTags().map(t => (
                                <Label size="small" key={t.id} as='a' tag>
                                    {t.nome}
                                    <Icon circular size="big" name="close"></Icon>
                                </Label>
                            ))
                        }
                    </List>
                    <Divider></Divider>
                    <Header className="header-detalhes">Unidades</Header>
                    <Accordion panels={this.state.unidades} styled />
                    <Button.Group floated='right'>
                        <Link to='/'><Button> <Icon name='arrow left' />Cancelar</Button></Link>
                        <Button className='button-action-detail'> <Icon name='check' /> Salvar</Button>
                    </Button.Group>
                    <Button.Group floated='left'>
                        <Popup wide="very"
                            trigger={
                                <Button size="mini" basic>Adicionar Unidade</Button>
                            }
                            content={
                                <Form>
                                    <Header>Nova Unidade</Header>
                                    <Form.Group widths="16">
                                        <Form.Field>
                                            <label>Título</label>
                                            <input placeholder='Título' />
                                        </Form.Field>
                                        <Form.Field >
                                            <label>&nbsp;</label>
                                            <Button icon="check" basic></Button>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            }
                            on='click'
                            position='right center'
                        />
                    </Button.Group>
                </Form>
            </Segment>
        );
    }
}