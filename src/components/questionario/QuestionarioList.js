import React, { Component } from 'react';
import { QuestionarioRepository } from '../../api/QuestionarioRepository';
import { Modal, List, Button, Icon, Segment, Label, Form, Divider, Breadcrumb, Header } from 'semantic-ui-react';
import { MaterialRepository } from '../../api/MaterialRepository';
import { Notificacao } from '../notificacao/Notificacao';
import { AlternativaList } from '../alternativa/AlternativaList';
import { Link } from "react-router-dom";

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
            questaoSelecionada: this.initializeQuestao()
        }
        this.novaQuestao = this.novaQuestao.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.seleciona = this.seleciona.bind(this)
    }

    initializeQuestao() {
        return {
            id: 0,
            enunciado: "",
            ordem: 0,
            material_id: this.props.match.params.idquestionario
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

    async updateQuestoes() {
        const materialId = this.props.match.params.idquestionario
        const questoes = await QuestionarioRepository.findByMaterialId(materialId)
        const material = await MaterialRepository.findById(materialId)
        this.setState({ questoes: questoes.data })
        this.setState({ materialSelecionado: material.data })
        this.setState({ updateQuestoes: this.state.updateQuestoes + 1 })
    }

    showModalAlternativas() {
        return (
            <Modal open={this.state.modalAlternativas} wide="very" size="big"
                content={
                    <Segment className="bottom-extended">
                        <Form>
                            <Form.Group>
                                <Form.Input
                                    type="text"
                                    label="Enunciado"
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
        if (!open)
            this.updateQuestoes()
    }

    render() {
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
                    <Button onClick={() => this.novaQuestao()} basic size="mini"><Icon name="add"></Icon> Nova Questão</Button>
                    <List>
                        {this.state.questoes.map(questao => (
                            <List.Item key={"questao-item-" + questao.id}>
                                <Segment>
                                    <Label basic>
                                        <i>
                                            {questao.enunciado}
                                        </i>
                                    </Label>
                                    <Label basic>
                                        <i>
                                            {questao.alternativaCorretaTexto === null ? "Nenhuma Alternativa Selecionada" : questao.alternativaCorretaTexto}
                                        </i>
                                    </Label>
                                    <Button size="mini" floated="right" basic icon="arrow up"></Button>
                                    <Button size="mini" floated="right" basic icon="arrow down"></Button>
                                    <Button key={"edita-alternativas-questao-" + questao.id} onClick={() => this.seleciona(questao)} icon="pencil" floated="right" size="mini" basic></Button>
                                    <Button onClick={() => this.removerQuestao(questao)} size="mini" floated="right" basic icon="close" ></Button>
                                </Segment>
                            </List.Item >
                        ))}
                        {this.state.modalAlternativas ? this.showModalAlternativas() : ''}
                    </List>

                </Modal.Content>
                <Modal.Actions className="bottom-extended">
                    <Link to={"/cursos/" + this.state.materialSelecionado.cursoId}>
                        <Button floated="left" basic size="mini"><Icon name="arrow left"></Icon> Voltar para o Curso</Button>
                    </Link>
                </Modal.Actions>
            </Modal>
        )
    }
}