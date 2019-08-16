import React, { Component } from 'react';
import { QuestionarioModal } from '././QuestionarioModal';
import { QuestionarioRepository } from '../../api/QuestionarioRepository';
import { CursoRepository } from '../../api/CursoRepository';

export class QuestionarioDetalhe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questoes: [],
            curso: {}
        }
    }
    
    async componentDidMount() {
        const curso = await CursoRepository.findById(this.props.match.params.idcurso)
        let questoes = await QuestionarioRepository.findById(this.props.match.params.idquestionario)

        if (!Array.isArray(questoes))
            questoes = [questoes]

        this.setState({ curso })
        this.setState({ questoes })
    }

    render() {
        return (
            <QuestionarioModal curso={this.state.curso} questoes={this.state.questoes}></QuestionarioModal>
        );
    }
}