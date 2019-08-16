import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import { CursoItem } from './CursoItem';
import { Segment, List, Label, Icon, Header, Button } from 'semantic-ui-react'
import { UsuarioRepository } from '../../api/UsuarioRepository';
import { UsuarioItem } from '../usuario/UsuarioItem';
import { CategoriaRepository } from '../../api/CategoriaRepository';
import { CategoriaItem } from '../categoria/CategoriaItem';

export class CursoList extends Component {
    state = {
        cursos: [],
        usuarios: [],
        categorias: []
    }

    async componentDidMount() {
        const cursos = await CursoRepository.all()
        const usuarios = await UsuarioRepository.all()
        const categorias = await CategoriaRepository.all()
        this.setState({ cursos: cursos.items })
        this.setState({ usuarios: usuarios.items })
        this.setState({ categorias: categorias.items })
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
                <Segment>
                    <Header className="header-listagem" textAlign="center" size="tiny">Usuários </Header>
                    <Label basic attached="top left"><Icon name='add' />Adicionar</Label>
                    <List horizontal animated verticalAlign='middle'>
                        {this.state.usuarios.map(u => (
                            <UsuarioItem key={u.id} usuario={u} />
                        ))}
                    </List>
                </Segment>
                <Segment>
                    <Label basic attached="top left"><Icon name='add' />Adicionar</Label>
                    <Header className="header-listagem" textAlign="center" size="tiny">Categorias de Cursos </Header>
                    <List horizontal animated verticalAlign='middle'>
                        {this.state.categorias.map(c => (
                            <CategoriaItem key={c.id} categoria={c} />
                        ))}
                    </List>
                </Segment>
            </div>
        );
    }
}