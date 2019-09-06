import React, { Component } from 'react';
import { QuestionarioRepository } from '../../api/QuestionarioRepository';
import { Modal, List, Button, Icon, Segment, Label, Form, Divider, Breadcrumb, Header, TextArea, Grid } from 'semantic-ui-react';
import { MaterialRepository } from '../../api/MaterialRepository';
import { Notificacao } from '../notificacao/Notificacao';
import { AlternativaList } from '../alternativa/AlternativaList';
import { Link } from "react-router-dom";
import { Auth } from '../../api/Auth';

export class QuestionarioList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questoes: [],
            materialSelecionado: {
                cursoTitulo: '',
                materialTitulo: '',
                unidadeTitulo: '',
                cursoId: 0
            },
            modalAlternativas: false,
            alternativaSelecionada: 0,
            updateQuestoes: 1,
            questaoSelecionada: this.initializeQuestao(),
            respostas: []
        }
        this.novaQuestao = this.novaQuestao.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.seleciona = this.seleciona.bind(this)
        this.salvarQuestao = this.salvarQuestao.bind(this)
        this.guardarResposta = this.guardarResposta.bind(this)
    }

    initializeQuestao() {
        return {
            id: 0,
            enunciado: "",
            ordem: 0,
            material_id: this.props.questionario.id
        }
    }

    handleChange(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const questao = this.state.questaoSelecionada
        if (element === obj && element.checked !== undefined)
            questao[element.name] = element.checked
        else
            questao[element.name] = element.value

        questao.material_id = this.state.materialSelecionado.id
        this.setState({ questaoSelecionada: questao })
    }

    setStatusRequisicao(resultado) {
        Notificacao.gerar(resultado)
        if (resultado.data.flag) {
            this.setState({ questaoSelecionada: this.initializeQuestao() })
            this.updateQuestoes()
        }
    }

    async componentDidMount() {
        this.updateQuestoes()
    }

    async salvarQuestao() {
        return QuestionarioRepository.save(this.state.questaoSelecionada)
    }

    async updateQuestoes() {
        const materialId = this.props.questionario.id
        const questoes = await QuestionarioRepository.findByMaterialId(materialId)
        const material = await MaterialRepository.findById(materialId)
        this.setState({ questoes: questoes.data })
        this.setState({ materialSelecionado: material.data })
        this.setState({ updateQuestoes: this.state.updateQuestoes + 1 })
    }

    showModalAlternativas() {
        return (
            <Modal open={this.state.modalAlternativas} wide="very"
                content={
                    <Segment className="bottom-extended">
                        <Label attached="top left" basic>Enunciado</Label>
                        <Form>
                            <Form.Group>
                                <TextArea
                                    style={{ maxHeight: 100 }}
                                    rows={3}
                                    type="text"
                                    size="small"
                                    name="enunciado"
                                    value={this.state.questaoSelecionada.enunciado}
                                    onChange={this.handleChange}
                                    width={"16"} />
                            </Form.Group>
                            <Divider></Divider>
                            <Form.Group>
                                <Form.Field width={"16"}>
                                    <AlternativaList
                                        key={"questao-edicao-" + this.state.questaoSelecionada.id}
                                        questao={this.state.questaoSelecionada} >
                                    </AlternativaList>
                                </Form.Field>
                            </Form.Group>
                        </Form>
                        <Modal.Actions className="bottom-extended">
                            <Button onClick={() => this.setModalVisivel(false)} basic size="mini"><Icon name="arrow left"></Icon> Voltar para as Questões</Button>
                        </Modal.Actions>
                    </Segment>
                }
                on='click'
                position="right center"
            />
        )
    }

    seleciona(questao) {
        this.setState({ questaoSelecionada: questao })
        this.setModalVisivel(true)
    }

    async novaQuestao() {
        this.setStatusRequisicao(await QuestionarioRepository.nova(this.state.materialSelecionado))
    }

    async removerQuestao(questao) {
        this.setStatusRequisicao(await QuestionarioRepository.remove(questao))
    }

    setModalVisivel(open) {
        this.setState({ modalAlternativas: open })
        if (!open) {
            this.salvarQuestao(this.state.materialSelecionado).then(() => this.updateQuestoes())

        }
    }

    guardarResposta(resposta) {
        this.state.respostas.map(resp => {
            if (resp.questao_id === resposta.questao_id)
                this.state.respostas.splice(this.state.respostas.indexOf(resp), 1)
        })

        this.state.respostas.push(resposta)

        this.setState({ respostas: this.state.respostas })
    }

    enviarQuestoes() {
        if (this.state.respostas.length !== this.state.questoes.length)
            Notificacao.gerar({ data: { flag: false, msg: "Responda todas as questões" } })
        else{
            
        }

    }

    renderQuestoesAluno() {
        return (
            <Modal size="large" open={true}>
                <Modal.Header>
                    <Breadcrumb icon='right angle' sections={
                        [
                            { key: 'curso', content: "Curso: " + this.state.materialSelecionado.cursoTitulo, link: false },
                            { key: 'unidade', content: "Unidade: " + this.state.materialSelecionado.unidadeTitulo, link: false },
                            { key: 'material', content: "Questionário: " + this.state.materialSelecionado.titulo, active: true }
                        ]
                    } />

                </Modal.Header>
                <Modal.Content key={"modal-quetionario-" + this.state.updateQuestoes} scrolling>
                    <List>
                        {this.state.questoes.map(questao => (
                            <List.Item key={"questao-item-" + questao.id}>

                                {questao.enunciado}
                                <AlternativaList guardarResposta={this.guardarResposta.bind(this)} questao={questao}></AlternativaList>

                            </List.Item >
                        ))}
                    </List>

                </Modal.Content>
                <Modal.Actions className="bottom-extended">
                    <Link to={"/cursos/" + this.state.materialSelecionado.cursoId}>
                        <Button onClick={() => this.props.setVisibleModal(false)} floated="left" basic size="mini"><Icon name="arrow left"></Icon> Voltar para o Curso</Button>
                    </Link>
                    <Button onClick={() => this.enviarQuestoes()} floated="right" basic size="mini">Enviar Questionário <Icon name="arrow right"></Icon></Button>
                </Modal.Actions>
            </Modal>

        )
    }


    render() {
        return Auth.isPerfilAdm() ? (
            <Modal size="large" open={true}>
                <Modal.Header>
                    <Breadcrumb icon='right angle' sections={
                        [
                            { key: 'curso', content: "Curso: " + this.state.materialSelecionado.cursoTitulo, link: false },
                            { key: 'unidade', content: "Unidade: " + this.state.materialSelecionado.unidadeTitulo, link: false },
                            { key: 'material', content: "Questionário: " + this.state.materialSelecionado.titulo, active: true }
                        ]
                    } />

                </Modal.Header>
                <Modal.Content key={"modal-quetionario-" + this.state.updateQuestoes} scrolling>
                    <Button onClick={() => this.novaQuestao()} basic size="mini"><Icon name="add"></Icon> Nova Questão</Button>
                    <List>
                        {this.state.questoes.map(questao => (
                            <List.Item key={"questao-item-" + questao.id}>
                                <Segment>
                                    <Grid columns={3} stackable textAlign='center'>
                                        <Grid.Row verticalAlign='middle'>
                                            <Grid.Column>
                                                <i>
                                                    {questao.enunciado}
                                                </i>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <i>
                                                    {questao.alternativaCorretaTexto === null ? "Nenhuma Alternativa Selecionada" : questao.alternativaCorretaTexto}
                                                </i>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Button onClick={() => this.removerQuestao(questao)} size="mini" floated="right" basic icon="close" ></Button>
                                                <Button key={"edita-alternativas-questao-" + questao.id} onClick={() => this.seleciona(questao)} icon="pencil" floated="right" size="mini" basic></Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>

                                </Segment>
                            </List.Item >
                        ))}
                        {this.state.modalAlternativas ? this.showModalAlternativas() : ''}
                    </List>

                </Modal.Content>
                <Modal.Actions className="bottom-extended">
                    <Link to={"/cursos/" + this.state.materialSelecionado.cursoId}>
                        <Button onClick={() => this.props.setVisibleModal(false)} floated="left" basic size="mini"><Icon name="arrow left"></Icon> Voltar para o Curso</Button>
                    </Link>

                </Modal.Actions>
            </Modal>
        ) : this.renderQuestoesAluno();
    }
}