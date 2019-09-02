import React, { Component } from 'react';
import { QuestionarioRepository } from '../../api/QuestionarioRepository';
import { Modal, List, Button, Icon, Segment, Label, Form, Divider, Breadcrumb } from 'semantic-ui-react';
import { MaterialRepository } from '../../api/MaterialRepository';
import { QuestaoItemForm } from './QuestionarioItemForm';


export class QuestionarioList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questoes: [],
            materialSelecionado: {
                cursoTitulo: '',
                materialTitulo: '',
                unidadeTitulo: ''
            },
            questaoSelecionada: this.initializeQuestao()
        }
    }

    handleChange(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const questao = this.state.questaoSelecionada
        questao[element.name] = element.value
        this.setState({ questaoSelecionada: questao })
    }

    initializeQuestao() {
        return {
            id: 0,
            enunciado: "",
            ordem: 0,
            material_id: this.props.match.params.idquestionario
        }
    }

    async componentDidMount() {
        const materialId = this.props.match.params.idquestionario
        const questoes = await QuestionarioRepository.findByMaterialId(materialId)
        const material = await MaterialRepository.findById(materialId)

        this.setState({ questoes: questoes.data })
        this.setState({ materialSelecionado: material.data })
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
                <Modal.Content scrolling>
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
                                            {'R: '}
                                        </i>
                                    </Label>
                                    <Button size="mini" floated="right" basic icon="arrow up"></Button>
                                    <Button size="mini" floated="right" basic icon="arrow down"></Button>
                                    <QuestaoItemForm
                                        handleChange={this.handleChange}
                                        questao={this.state.questaoSelecionada}
                                    ></QuestaoItemForm>
                                    <Button size="mini" floated="right" basic icon="close" ></Button>
                                </Segment>
                            </List.Item >
                        ))}
                    </List>

                </Modal.Content>
                <Modal.Actions >
                    <Button basic><Icon name="arrow left"></Icon> Voltar para o Curso</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}