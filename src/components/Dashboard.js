import React, { Component } from 'react';
import { CursoRepository } from '../api/CursoRepository';
import 'react-toastify/dist/ReactToastify.css';
import { CategoriaList } from './categoria/CategoriaList';
import { UsuarioList } from './usuario/UsuarioList';
import { BarraTopo } from './BarraTopo';
import { CursoList } from './curso/CursoList';
import { Auth } from '../api/Auth';

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursos: [],
            auth: Auth.get()
        }
    }

    sair() {
        Auth.clear()
    }

    async componentDidMount() {
    }

    render() {
        return Auth.get() !== null ?
            (
                <div>
                    <BarraTopo sairAction={this.sair} auth={Auth.get()}></BarraTopo>
                    <CursoList  ></CursoList>
                    <UsuarioList></UsuarioList>
                    <CategoriaList></CategoriaList>
                </div>
            ) : ''
    }
}