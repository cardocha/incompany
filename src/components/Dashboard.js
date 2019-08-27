import React, { Component } from 'react';
import { CursoRepository } from '../api/CursoRepository';
import 'react-toastify/dist/ReactToastify.css';
import { CategoriaList } from './categoria/CategoriaList';
import { UsuarioList } from './usuario/UsuarioList';
import { BarraTopo } from './BarraTopo';
import { CursoList } from './curso/CursoList';

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursos: []
        }
    }

    async componentDidMount() {
    }

    render() {
        return (
            <div>
                <BarraTopo auth={this.props.auth}></BarraTopo>
                <CursoList  ></CursoList>
                <UsuarioList></UsuarioList>
                <CategoriaList></CategoriaList>
            </div>
        );
    }
}