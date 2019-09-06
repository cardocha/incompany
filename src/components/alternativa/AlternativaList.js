import React, { Component } from 'react';
import { Checkbox, Form, Segment, Button, Divider, Icon, Header, Modal } from 'semantic-ui-react';
import { AlternativaRepository } from '../../api/AlternativaRepository';
import { Notificacao } from '../notificacao/Notificacao';
import { Auth } from '../../api/Auth';

export class AlternativaList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alternativas: [],
            alternativaSelecionada: this.initializeAlternativa(),
            updateAlternativas: 1,
            textoNovaAlternativa: ""
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeRadios = this.handleChangeRadios.bind(this)
        this.removerAlternativa = this.removerAlternativa.bind(this)
        this.alteraAlternativaCorreta = this.alteraAlternativaCorreta.bind(this)
    }

    handleChange(e) {
        this.setState({ textoNovaAlternativa: e.target.value })
    }

    handleChangeRadios(e, obj) {
        const idAlternativa = obj.value;
        if (Auth.isPerfilAdm())
            this.alteraAlternativaCorreta(this.props.questao.id, idAlternativa)
        else {
            const a = this.state.alternativas.find(a => {
                return a.id === idAlternativa
            })
            this.setState({ alternativaSelecionada: a })
            this.props.guardarResposta(a)
        }

    }

    async alteraAlternativaCorreta(questaoId, alternativaId) {
        this.setStatusRequisicao(await AlternativaRepository.setAlternativaCorreta(questaoId, alternativaId));
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
            if (a.correta && Auth.isPerfilAdm())
                this.setState({ alternativaSelecionada: a })
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
        let alternativa = this.initializeAlternativa()
        alternativa.texto = this.state.textoNovaAlternativa;
        this.setStatusRequisicao(await AlternativaRepository.save(alternativa));
        this.setState({ textoNovaAlternativa: "" })
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
                {Auth.isPerfilAdm() ? (<Header>Alternativas</Header>) : ''}
                {this.state.alternativas.map(a => (
                    <div>
                        <Segment className="bottom-extended">
                            <Checkbox
                                radio
                                label={a.texto}
                                name="correta"
                                value={a.id}
                                checked={this.state.alternativaSelecionada.id === a.id}
                                onChange={this.handleChangeRadios}
                            />
                            {Auth.isPerfilAdm() ? (<Button onClick={() => this.removerAlternativa(a)} floated="right" icon="close" basic size="mini"></Button>) : ''}
                        </Segment>
                    </div>
                ))}
                {Auth.isPerfilAdm() ? (
                    <div>
                        <input
                            name="texto"
                            placeholder="Descrição da nova alternativa"
                            size="mini"
                            value={this.state.textoNovaAlternativa}
                            onChange={this.handleChange}
                        />
                        <Button onClick={() => this.handleClick("SA")} floated="right" basic size="mini"><Icon name="add"></Icon>Adicionar Alternativa</Button></div>) : ''}
            </Segment >

        )
    }
}