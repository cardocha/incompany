import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import {
    Segment, Form, Button, Divider, Accordion,
    Header, Label, Icon,
    Popup, Input, Dropdown, List, Container
} from 'semantic-ui-react';
import './curso-detalhe.css'
import { MaterialList } from '../material/MaterialList';
import { Auth } from '../../api/Auth';
import { CategoriaRepository } from '../../api/CategoriaRepository';
import { UnidadeRepository } from '../../api/UnidadeRepository';
import { Notificacao } from '../notificacao/Notificacao';

export class CursoDetalhe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursoSelecionado: {},
            unidadeSelecionada: {},
            unidades: [],
            categorias: [],
            updateCurso: 1
        }

        this.handleChangeUnidade = this.handleChangeUnidade.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.backToDashBoard = this.backToDashBoard.bind(this)
        this.setStatusRequisicao = this.setStatusRequisicao.bind(this)
        this.removerUnidade = this.removerUnidade.bind(this)
        this.salvarUnidade = this.salvarUnidade.bind(this)

        this.limparSelecaoUnidade = this.limparSelecaoUnidade.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        this.updateCurso();
    }

    async updateCurso() {
        const curso = await CursoRepository.findById(this.props.match.params.id)
        const categorias = await CategoriaRepository.all();
        this.setState({ categorias: this.buildDropdownItensCategoria(categorias.data) })
        this.setState({ cursoSelecionado: curso.data })
        this.setState({ unidades: this.buildUnidades(curso.data) })
        this.setState({ unidadeSelecionada: this.initializeUnidade() })
        this.setState({ updateCurso: this.state.updateCurso + 1 })
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
                            <Button.Group floated="right" size="mini" basic>
                                <Button ><Icon name="pencil"></Icon>Editar {unidade.titulo}</Button>
                                <Button onClick={() => this.removerUnidade(unidade)} ><Icon name="close"></Icon>Remover {unidade.titulo}</Button>
                        
                            </Button.Group>
                        </div>
                    )
                }
            });
        });
        return accordionsUnidades;
    }

    setStatusRequisicao(resultado) {
        Notificacao.gerar(resultado)
        if (resultado.data.flag) {
            this.setState({ unidadeSelecionada: this.initializeUnidade() })
            this.updateCurso()
        }
    }

    backToDashBoard(e) {
        this.props.location.back()
        this.props.history.push('/')
    }

    async salvarUnidade() {
        this.setStatusRequisicao(await UnidadeRepository.save(this.state.unidadeSelecionada));
    }

    async removerUnidade(unidade) {
        this.setStatusRequisicao(await UnidadeRepository.remove(unidade));
    }

    initializeUnidade() {
        return {
            id: 0,
            titulo: '',
        }
    }

    limparSelecaoUnidade() {
        this.setState({ unidadeSelecionada: this.initializeUnidade() })
    }

    handleChangeUnidade(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const unidade = this.state.unidadeSelecionada
        unidade[element.name] = element.value
        unidade.curso_id = this.state.cursoSelecionado.id
        this.setState({ unidadeSelecionada: unidade })
    }

    handleClick(acao) {
        if (acao === "SU") {
            this.salvarUnidade()
        }
    }

    render() {
        return (
            <Segment>
                <Segment key={this.state.updateCurso} className="bottom-extended">
                    <Header>{this.state.titulo}</Header>
                    <Form>
                        <Form.Group>
                            <Form.Field width={6} >
                                <label>Título</label>
                                <input placeholder='Título'
                                    onChange={this.handleChange}
                                    name="titulo"
                                    type="text"
                                    value={this.state.cursoSelecionado.titulo} />
                            </Form.Field>
                            <Form.Field width={5}>
                                <label>Categoria</label>
                                <Dropdown selection
                                    onChange={this.handleChange}
                                    name='categoria_id'
                                    value={this.state.cursoSelecionado.categoria_id}
                                    options={this.state.categorias} />
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
                            <Button onClick={this.backToDashBoard}> <Icon name='arrow left' />Cancelar</Button>
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
                                        <Form.Group>
                                            <Form.Field>
                                                <label>Título</label>
                                                <input
                                                    placeholder='Título'
                                                    name="titulo"
                                                    type="text"
                                                    value={this.state.unidadeSelecionada.titulo}
                                                    onChange={this.handleChangeUnidade}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>&nbsp;</label>
                                                <Button onClick={() => this.handleClick('SU')} floated="right" icon="check" basic></Button>
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
            </Segment>
        );
    }
}