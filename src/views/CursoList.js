import React, { Component } from 'react';
import { CursosRepository } from '../api/CursoRepository';
import { CursoItem } from '../components/CursoItem';
import { Segment, List, Header } from 'semantic-ui-react'

export class CursoList extends Component {
    state = {
        cursos: []
    }

    async componentDidMount() {
        const { items } = await CursosRepository.all()
        this.setState({ cursos: items })
    }

    render() {
        return (
            <Segment>
                <Header> Cursos</Header>
                <List horizontal animated verticalAlign='middle'>
                    {this.state.cursos.map(c => (
                        <CursoItem key={c.id} curso={c} />
                    ))}
                </List>
            </Segment>
        );
    }
}