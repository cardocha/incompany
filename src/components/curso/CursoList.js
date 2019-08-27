import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository'
import { CursoItem } from './CursoItem';
import { Segment, List, Icon, Header, Button } from 'semantic-ui-react'
import { PopupForm } from './../PopupForm'
import { CursoItemForm } from './../curso/CursoItemForm'
import 'react-toastify/dist/ReactToastify.css';
import { CategoriaRepository } from '../../api/CategoriaRepository';
import { Notificacao } from '../notificacao/Notificacao';

export class CursoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cursos: [],
            cursoSelecionado: this.initializeCurso(),
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        this.updateCursos()
        const categorias = await CategoriaRepository.all();
        this.setState({ categorias: this.buildDropdownItensCategoria(categorias.data) })
    }

    buildDropdownItensCategoria(categorias) {
        let categoriasItens = []
        categorias.map(categoria => {
           return categoriasItens.push({ key: categoria.id, text: categoria.descricao, value: categoria.id })
        })
        return categoriasItens
    }

    initializeCurso() {
        return {
            id: 0,
            titulo: '',
            nomeTutor: '',
            categoria_id: 0
        }
    }

    limparSelecaoCurso() {
        this.setState({ categoriaCurso: this.initializeCurso() })
    }

    handleChange(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const curso = this.state.cursoSelecionado
        curso[element.name] = element.value
        this.setState({ cursoSelecionado: curso })
    }

    async updateCursos() {
        /*  this.setState({ carregarCategorias: true }) */

        const cursos = await CursoRepository.all()
        this.setState({ updateCursos: this.state.updateCursos + 1 })
        this.setState({ cursos: cursos.data })

        // this.setState({ carregarCategorias: false })
    }

    setStatusRequisicao(resultado) {
        Notificacao.gerar(resultado)
        if (resultado.data.flag) {
            this.setState({ cursoSelecionado: this.initializeCurso() })
            this.updateCursos()
        }
    }

    async salvarCurso() {
        this.setStatusRequisicao(await CursoRepository.save(this.state.cursoSelecionado));
    }

    async removerCurso() {
        this.setStatusRequisicao(await CursoRepository.remove(this.state.cursoSelecionado));
    }

    handleClick(acao) {
        if (acao === "AE") {
            this.salvarCurso()
        } else
            if (acao === "R") {
                this.removerCurso()
            }
    }

    render() {
        return (
            <div>
                <Segment>
                    <PopupForm
                        trigger={
                            <Button basic
                                onClick={this.limpaSelecaoCurso}
                                className="pointer"
                                as="a"
                                floated="left"
                                size="mini"> <Icon name="add"></Icon>Adicionar
                            </Button>
                        }
                        position="left center"
                        content={
                            <CursoItemForm
                                titulo={"Inclusão de Curso"}
                                categorias={this.state.categorias}
                                curso={this.state.cursoSelecionado}
                                changeAction={this.handleChange}
                                onClickAction={this.handleClick}>
                            </CursoItemForm>}
                    ></PopupForm>
                    <Header className="header-listagem" textAlign="center" size="tiny">Cursos</Header>
                    <List horizontal animated verticalAlign='middle'>
                        {this.state.cursos.map(c => (
                            <CursoItem key={c.id} curso={c} />
                        ))}
                    </List>
                </Segment>
            </div>
        );
    }
}