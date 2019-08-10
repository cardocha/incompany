import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import { CursoItem } from './CursoItem';
import { Segment, List, Label, Icon } from 'semantic-ui-react'

export class CursoList extends Component {
    state = {
        cursos: []
    }

    async componentDidMount() {
        const { items } = await CursoRepository.all()
        this.setState({ cursos: items })
    }

    render() {
        return (
            <Segment>
                <Label basic attached="bottom left"><Icon name='add' />Adicionar</Label>
                <List horizontal animated verticalAlign='middle'>
                    {this.state.cursos.map(c => (
                        <CursoItem key={c.id} curso={c} />
                    ))}
                </List>
            </Segment>
        );
    }
}