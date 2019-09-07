import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import {
    Segment, Form, Button, Divider,
    Header, Label, Icon,
    Input, Dropdown, List, Grid, Menu, Rating,
} from 'semantic-ui-react';
import './curso-detalhe.css'
import { Auth } from '../../api/Auth';
import { CategoriaRepository } from '../../api/CategoriaRepository';
import { UnidadeList } from '../unidade/UnidadeList';
import { Link } from "react-router-dom";
import { BarraTopo } from '../BarraTopo';
import { TagaRepository } from '../../api/TagRepository';
import { Notificacao } from '../notificacao/Notificacao';
import Iframe from 'react-iframe'

export class CursoDetalhe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursoSelecionado: {
                unidades: []
            },
            tagSelecionada: this.initializeTag(),
            categorias: [],
            tags: [],
            updateCurso: 1,
            dadosConclusao: {}
        }

        this.backToDashBoard = this.backToDashBoard.bind(this)
        this.handleChangeTag = this.handleChangeTag.bind(this)
        this.excluiTag = this.excluiTag.bind(this)
        this.salvarTag = this.salvarTag.bind(this)
        this.isCursoConcluido = this.isCursoConcluido.bind(this)
    }

    async componentDidMount() {
        console.log(this.props.location.search)
        this.updateCurso();
    }

    initializeTag() {
        return {
            id: 0,
            descricao: '',
            curso: this.props.match.params.id
        }
    }

    async excluiTag(tag) {
        this.setStatusRequisicao(await TagaRepository.remove(tag))
    }

    async salvarTag(tag) {
        this.setStatusRequisicao(await TagaRepository.save(this.state.tagSelecionada))
    }

    setStatusRequisicao(resultado) {
        Notificacao.gerar(resultado)
        if (resultado.data.flag)
            this.updateTags()
    }

    handleChangeTag(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const tag = this.state.tagSelecionada
        tag[element.name] = element.value
        tag.curso_id = this.props.match.params.id
        this.setState({ tagSelecionada: tag })
    }

    async updateCurso() {
        const curso = await CursoRepository.findById(this.props.match.params.id)
        const dadosConclusao = await CursoRepository.isConcluido(this.props.match.params.id)
        const categorias = await CategoriaRepository.all();
        this.updateTags()
        this.setState({ categorias: this.buildDropdownItensCategoria(categorias.data) })
        this.setState({ cursoSelecionado: curso.data })
        this.setState({ dadosConclusao: dadosConclusao.data })
        this.setState({ isConcluido: this.isCursoConcluido() })
        this.setState({ updateCurso: this.state.updateCurso + 1 })
    }

    async updateTags() {
        const tags = await TagaRepository.all()
        this.setState({ tags: tags.data })
        this.setState({ tagSelecionada: this.initializeTag() })
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

    backToDashBoard(e) {
        this.props.location.back()
        this.props.history.push('/')
    }

    isCursoConcluido() {
        const concluido = Number(this.state.dadosConclusao.percentual_total);
        const minimo = Number(this.state.dadosConclusao.percentual_docs) + Number(this.state.dadosConclusao.percentual_questoes)
        return concluido >= minimo
    }


    renderAreaAluno() {
        return (
            <div key={'area-aluno-' + this.state.updateCurso}>
                <BarraTopo></BarraTopo>
                <Segment key={this.state.updateCurso}>

                    <Segment>{this.state.cursoSelecionado.titulo}
                        {this.state.isConcluido ? (<div style={{ display: "inline-block" }} >
                            &nbsp;&nbsp; (Concluído) <Icon name="green check"></Icon> &nbsp;&nbsp;&nbsp;&nbsp;
                            <Menu text compact size="mini">
                                <Menu.Item>
                                    <Button basic size="mini" color="blue"><Icon name="comment"></Icon> Feedback</Button>
                                </Menu.Item>

                                <Menu.Item>
                                    <Rating icon='star' defaultRating={0} maxRating={5} />
                                </Menu.Item>
                            </Menu>
                        </div>) : ''}
                        <Divider vertical></Divider>
                        <Link to={`/dashboard`}>
                            <Button size="mini" basic floated="right"> Voltar aos cursos</Button>
                        </Link>
                    </Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <UnidadeList update={this.updateCurso.bind(this)} curso={this.state.cursoSelecionado}></UnidadeList>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>

        )

    }

    render() {
        return !Auth.isPerfilAdm() ? this.renderAreaAluno() :
            (
                <div>
                    <BarraTopo></BarraTopo>
                    <Segment>
                        <Segment key={this.state.updateCurso} className="bottom-extended">
                            <Header>{this.state.titulo}</Header>
                            <Form>
                                <Form.Group>
                                    <Form.Field width={6} >
                                        <label>Título</label>
                                        <input
                                            type="text"
                                            name="titulo"
                                            placeholder='Título'
                                            onChange={this.handleChange}
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
                                            name="descricao"
                                            value={this.state.tagSelecionada.descricao}
                                            onChange={this.handleChangeTag}
                                            icon='tags'
                                            size="small"
                                            iconPosition='left'
                                            label={{ tag: false, content: (<a onClick={this.salvarTag}><Icon name="add"></Icon></a>), basic: true }}
                                            labelPosition='right'
                                            placeholder='Enter tags'
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <List horizontal>
                                    {
                                        this.state.tags.map(t => (
                                            <Label size="small" key={t.id} as='a' tag>
                                                {t.descricao}
                                                <a onClick={() => this.excluiTag(t)} ><Icon size="big" name="close"></Icon></a>
                                            </Label>
                                        ))
                                    }
                                </List>
                                <Divider></Divider>
                                <Header className="header-detalhes">Unidades</Header>
                                <UnidadeList update={this.updateCurso.bind(this)} curso={this.state.cursoSelecionado}></UnidadeList>
                                <Button.Group floated='right'>
                                    <Link to="/">
                                        <Button > <Icon name='arrow left' />Cancelar</Button>
                                    </Link>
                                    <Button className='button-action-detail'> <Icon name='check' /> Salvar</Button>
                                </Button.Group>
                            </Form>
                        </Segment>
                    </Segment>
                </div>
            );
    }
}