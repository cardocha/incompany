import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CategoriaList } from './categoria/CategoriaList';
import { UsuarioList } from './usuario/UsuarioList';
import { BarraTopo } from './BarraTopo';
import { CursoList } from './curso/CursoList';
import { Auth } from '../api/Auth';
import { Segment } from 'semantic-ui-react';
import { Aluno } from './aluno/Aluno';

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    sair() {
        Auth.clear()
    }

    async componentWillMount() {
        if (Auth.get() === null)
            Auth.clear()
    }

    renderDashboardContent() {
        return (
            <div>
                <CursoList></CursoList>
                <UsuarioList></UsuarioList>
                <CategoriaList></CategoriaList>
            </div>)
    }

    renderAlunoContent() {
        return (
            <div>
                <Aluno></Aluno>
            </div>)
    }

    renderParaUsuario() {
        const tipoUsuario = Auth.get().tipo
        if (tipoUsuario === "A")
            return this.renderDashboardContent();
        else
            if (tipoUsuario === "U")
                  return this.renderAlunoContent();
    }

    render() {
        return (
            <div>
                <BarraTopo></BarraTopo>
                <Segment>{this.renderParaUsuario()}</Segment>
            </div>
        )
    }
}