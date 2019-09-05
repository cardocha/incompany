import React, { Component } from 'react';
import { Segment, Header, List, Icon, Divider, Label, Button } from 'semantic-ui-react'
import { Auth } from '../../api/Auth';
import { CursoRepository } from '../../api/CursoRepository';
import { Notificacao } from '../notificacao/Notificacao';
import { Link } from "react-router-dom";

export class Aluno extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meusCursos: [],
            cursosDisoniveis: [],
            updateCursos: 1
        }

        this.inscricao = this.inscricao.bind(this)
    }

    setStatusRequisicao(resultado) {
        Notificacao.gerar(resultado)
        if (resultado.data.flag) {
            this.updateCursos()
        }
    }

    async updateCursos() {
        const usuarioId = Auth.get().id
        const meusCursos = await CursoRepository.findByIncricaoUsuario(usuarioId)
        const cursosDisoniveis = await CursoRepository.findDisponiveis(usuarioId)
        this.setState({ meusCursos: meusCursos.data })
        this.setState({ cursosDisoniveis: cursosDisoniveis.data })
        this.setState({ updateCursos: this.state.updateCursos + 1 })
    }

    async componentDidMount() {
        this.updateCursos()
    }

    async inscricao(cursoId) {
        this.setStatusRequisicao(await CursoRepository.inscrever(cursoId, Auth.get().id))
    }

    render() {
        return (
            <Segment key={'cursos-aluno-' + this.state.updateCursos}>
                <Segment>
                    <Header>Meus Cursos</Header>
                    <List horizontal animated selection>
                        {
                            this.state.meusCursos.map(c => (
                                <List.Item>

                                    <Segment>
                                        <Icon name='cube' size='big' />
                                        <List.Header className="nome-list">{c.titulo}</List.Header>
                                        <Divider></Divider>
                                        <Label size="mini" basic>
                                            <Icon name='cube' /> {c.nome_tutor}
                                        </Label>
                                    </Segment>
                                    <Link to={`cursos/${c.id}`}>
                                        <Button  size="mini" basic>Ir para o curso</Button>
                                    </Link>

                                </List.Item>
                            ))
                        }
                    </List>
                </Segment>
                <Segment>
                    <Header>Cursos Disponíveis</Header>
                    <List selection horizontal>
                        {

                            this.state.cursosDisoniveis.map(c => (
                                <List.Item>

                                    <Segment>
                                        <Icon name='cube' size='big' />
                                        <List.Header className="nome-list">{c.titulo}</List.Header>
                                        <Divider></Divider>
                                        <Label size="mini" basic>
                                            <Icon name='cube' /> {c.nome_tutor}
                                        </Label>
                                    </Segment>
                                    <Button onClick={() => this.inscricao(c.id)} size="mini" basic>Increver</Button>
                                </List.Item>
                            ))
                        }
                    </List>
                </Segment>
            </Segment>
        )
    }
}