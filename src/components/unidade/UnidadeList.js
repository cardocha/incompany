import React, { Component } from 'react';
import { Icon, Header, Button, Accordion, Popup, Form, Segment } from 'semantic-ui-react'
import { Notificacao } from '../notificacao/Notificacao';
import { UnidadeRepository } from '../../api/UnidadeRepository';
import { MaterialList } from '../material/MaterialList';
import { Auth } from '../../api/Auth';

export class UnidadeList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursoSelecionado: {},
            unidades: [],
            unidadeSelecionada: this.initializeUnidade(),
            activeIndex: 0
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.setStatusRequisicao = this.setStatusRequisicao.bind(this)
        this.removerUnidade = this.removerUnidade.bind(this)
        this.salvarUnidade = this.salvarUnidade.bind(this)
        this.selecionaUnidade = this.selecionaUnidade.bind(this)
        this.limparSelecaoUnidade = this.limparSelecaoUnidade.bind(this)
        this.updateUnidades = this.updateUnidades.bind(this)
    }

    async componentDidMount() {
        this.updateUnidades();
    }

    handleClickAccordionUnidades = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    setStatusRequisicao(resultado) {
        Notificacao.gerar(resultado)
        if (resultado.data.flag) {
            this.setState({ unidadeSelecionada: this.initializeUnidade() })
            this.updateUnidades()
            this.props.update()
        }
    }

    async updateUnidades() {
        if (this.props.curso.id !== undefined) {
            const unidades = await UnidadeRepository.findByCursoId(this.props.curso.id)
            this.setState({ unidades: unidades.data })
            this.setState({ cursoSelecionado: this.props.curso })
        }
    }

    handleChange(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const unidade = this.state.unidadeSelecionada
        unidade[element.name] = element.value
        unidade.curso_id = this.state.cursoSelecionado.id
        this.setState({ unidadeSelecionada: unidade })
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

    selecionaUnidade(unidade) {
        this.setState({ unidadeSelecionada: unidade })
    }

    limparSelecaoUnidade() {
        this.setState({ unidadeSelecionada: this.initializeUnidade() })
    }


    handleClick(acao) {
        if (acao === "SU") {
            this.salvarUnidade()
        }
        else
            if (acao === "RU") {
                this.removerUnidade()
            }
    }

    render() {
        return (
            <div>
                <Accordion styled>{
                    this.state.unidades && this.state.unidades.map(unidade => (
                        <div key={"unidade-accod-" + unidade.id}>
                            <Accordion.Title
                                active={this.state.activeIndex === unidade.id}
                                index={unidade.id}
                                onClick={this.handleClickAccordionUnidades}>
                                <Icon name='dropdown' />
                                {unidade.titulo}
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === unidade.id}>
                                <MaterialList update={this.props.update} cursoSelecionado={this.props.curso} unidadeSelecionada={unidade}></MaterialList>
                                {Auth.isPerfilAdm() ? (
                                    <Button.Group key={'edicao-unidade-' + unidade.id} floated="right" size="mini" basic>
                                        <Popup wide="very"
                                            trigger={
                                                <Button onClick={() => this.selecionaUnidade(unidade)}><Icon name="pencil"></Icon>Editar {unidade.titulo}</Button>
                                            }
                                            content={
                                                <Form>
                                                    <Header>Editar Unidade</Header>
                                                    <Form.Group>
                                                        <Form.Field>
                                                            <label>Título</label>
                                                            <input
                                                                placeholder='Título'
                                                                name="titulo"
                                                                type="text"
                                                                value={this.state.unidadeSelecionada.titulo}
                                                                onChange={this.handleChange}
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
                                        <Button onClick={() => this.removerUnidade(unidade)} ><Icon name="close"></Icon>Remover {unidade.titulo}</Button>
                                    </Button.Group>) : ''}
                            </Accordion.Content>
                        </div>
                    ))
                }
                </Accordion>
                {
                    Auth.isPerfilAdm() ? (<Button.Group floated='left'>
                        <Popup wide="very"
                            trigger={
                                <Button onClick={() => this.limparSelecaoUnidade()} size="mini" basic>Adicionar Unidade</Button>
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
                                                onChange={this.handleChange}
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
                    </Button.Group>) : ''}
            </div>
        )
    }

}