import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import { CursoItem } from './CursoItem';
import { Segment, List, Label, Icon, Header, Dimmer, Button, Divider } from 'semantic-ui-react'
import { UsuarioRepository } from '../../api/UsuarioRepository';
import { UsuarioItem } from '../usuario/UsuarioItem';
import 'react-toastify/dist/ReactToastify.css';
import { CategoriaList } from '../categoria/CategoriaList';
import { UsuarioList } from '../usuario/UsuarioList';

export class CursoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursos: []
        }

    }

    async componentDidMount() {
        const cursos = await CursoRepository.all()
        this.setState({ cursos: cursos.items })
    }

    render() {
        return (
            <div>
                <Segment>
                    <Header className="header-listagem" textAlign="center" size="tiny">Cursos</Header>
                    <Label basic attached="top left"><Icon name='add' />Adicionar</Label>
                    <List horizontal animated verticalAlign='middle'>
                        {this.state.cursos.map(c => (
                            <CursoItem key={c.id} curso={c} />
                        ))}
                    </List>
                </Segment>
                <UsuarioList></UsuarioList>
                <CategoriaList></CategoriaList>
            </div>
        );
    }
}