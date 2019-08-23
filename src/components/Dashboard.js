import React, { Component } from 'react';
import { CursoRepository } from '../api/CursoRepository';
import { CursoItem } from './curso/CursoItem';
import { Segment, List, Label, Icon, Header } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import { CategoriaList } from './categoria/CategoriaList';
import { UsuarioList } from './usuario/UsuarioList';
import { BarraTopo } from './BarraTopo';

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursos: [],
            usuarioLogado: {}
        }
    }

    async componentDidMount() {
        const cursos = await CursoRepository.all()
        this.setState({ cursos: cursos.items })
        this.setState({ usuarioLogado: this.initializeUsuarioLogado() })
    }

    initializeUsuarioLogado() {
        return {
            id: 1,
            nome: "Jorversley Riquelme"
        }
    }

    render() {
        return (
            <div>
                <BarraTopo usuario={this.state.usuarioLogado}></BarraTopo>
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