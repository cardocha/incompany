import React, { Component } from 'react';
import { Checkbox, Form, Segment, Button, Divider, Icon } from 'semantic-ui-react';
import { AlternativaRepository } from '../../api/AlternativaRepository';
import { Notificacao } from '../notificacao/Notificacao';

export class AlternativaList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alternativas: [],
            alternativaSelecionada: this.initializeAlternativa(),
            updateAlternativas: 1
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.removerAlternativa = this.removerAlternativa.bind(this)
    }

    handleChange(e, { value }) {
        this.setState({ value })
        this.setAlternativaSelecionada(value)
    }

    handleChange(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const alternativa = this.state.alternativaSelecionada
        if (element === obj && element.checked !== undefined)
            alternativa[element.name] = element.checked
        else
            alternativa[element.name] = element.value

        this.setState({ alternativaSelecionada: alternativa })
    }

    initializeAlternativa() {
        return {
            id: 0,
            texto: '',
            questao_id: this.props.questao.id,
            ordem: 0,
            correta: false
        }
    }

    async updateAlternativas() {
        const resultado = await AlternativaRepository.findByQuestaoId(this.props.questao.id)

        let alternativas = []
        resultado.data.map(a => {
            a.correta = a.correta === "1"
            alternativas.push(a)
        })

        this.setState({ alternativas: alternativas })
        this.setState({ updateAlternativas: this.state.updateAlternativas + 1 })
    }

    async componentDidMount() {
        this.updateAlternativas()
    }

    setAlternativaSelecionada(id) {
        this.setState({ alternativaSelecionada: this.props.questao.alternativas.find(q => q.id === parseInt(id)) })
    }

    async salvarAlternativa() {
        this.setStatusRequisicao(await AlternativaRepository.save(this.state.alternativaSelecionada));
    }

    setStatusRequisicao(resultado) {
        Notificacao.gerar(resultado)
        if (resultado.data.flag) {
            this.setState({ alternativaSelecionada: this.initializeAlternativa() })
            this.updateAlternativas()
            //this.props.update()
        }
    }

    handleClick(acao) {
        if (acao === "SA") {
            this.salvarAlternativa()
        }
    }

    async removerAlternativa(alternativa) {
        this.setStatusRequisicao(await AlternativaRepository.remove(alternativa));
    }

    render() {
        return (
            <Segment key={this.state.updateAlternativas} className="bottom-extended">

                {this.state.alternativas.map(a => (
                    <Form.Field key={"alternativa-" + a.id}>
                        <Checkbox
                            radio
                            label={a.texto}
                            name={"questao-" + this.props.questao.id}
                            value={a.id}
                            checked={this.state.value === a.id}
                            onChange={this.handleChange.bind(this)}
                        />
                        <Button onClick={() => this.removerAlternativa(a)} icon="close" basic floated="right" size="mini"></Button>
                        <Divider></Divider>
                    </Form.Field>
                ))}

                <input
                    name="texto"
                    placeholder="Descrição da nova alternativa"
                    size="mini"
                    onChange={this.handleChange}
                    value={this.state.alternativaSelecionada.texto}
                />
                <Button onClick={() => this.handleClick("SA")} floated="right" basic size="mini"><Icon name="add"></Icon>Adicionar Alternativa</Button>
            </Segment >

        )
    }
}