import React, { Component } from 'react';
import { QuestaoItem } from './QuestaoItem';
import { Segment, List, Label, Icon, Header } from 'semantic-ui-react'
import { QuestionarioRepository } from '../../api/QuestionarioRepository';
import { CursoRepository } from '../../api/CursoRepository';

export class QuestionarioDetalhe extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    async componentDidMount() {
        const curso = await CursoRepository.findById(1)
        const { items } = await QuestionarioRepository.findById(this.props.match.params.idquestionario)
        this.setState({ questoes: items })
        this.setState({ curso })
    }

    render() {
        return (
            <Segment>
                <Header>{this.state.curso && this.state.curso.titulo}</Header>
                <Label basic attached="bottom left"><Icon name='add' />Adicionar</Label>
                <List horizontal animated verticalAlign='middle'>
                    {this.state.questoes &&  this.state.questoes.map(q => (
                        <QuestaoItem key={q.id} questao={q} />
                    ))}
                </List>
            </Segment>
        );
    }
}