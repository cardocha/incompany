import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import { CursoItem } from './CursoItem';
import { Segment, List, Label, Icon, Header, Dimmer } from 'semantic-ui-react'
import { UsuarioRepository } from '../../api/UsuarioRepository';
import { UsuarioItem } from '../usuario/UsuarioItem';
import { CategoriaRepository } from '../../api/CategoriaRepository';
import { CategoriaItem } from '../categoria/CategoriaItem';
import { CategoriaItemForm } from '../categoria/CategoriaItemForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class CursoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categorias: [],
            cursos: [],
            usuarios: [],
            categoriaSelecionada: this.initializeCategoria(),
            updateCategorias: 1,
            carregarCategorias: false
        }
        this.handleChangeDescricaoCategoria = this.handleChangeDescricaoCategoria.bind(this);
        this.salvarCategoria = this.salvarCategoria.bind(this);
    }

    async componentDidMount() {
        this.updateCategorias()
        const cursos = await CursoRepository.all()
        const usuarios = await UsuarioRepository.all()
        this.setState({ cursos: cursos.items })
        this.setState({ usuarios: usuarios.items })
        this.setState({ categoriaSelecionada: this.initializeCategoria() })
    }

    async updateCategorias() {
        this.setState({ carregarCategorias: true })

        const categorias = await CategoriaRepository.all()
        this.setState({ updateCategorias: this.state.updateCategorias + 1 })
        this.setState({ categorias: categorias.data })

        this.setState({ carregarCategorias: false })
    }

    initializeCategoria() {
        return { id: 0, descricao: '' }
    }

    handleChangeDescricaoCategoria(e) {
        const categoria = {
            id: 0,
            descricao: e.target.value
        }
        this.setState({ categoriaSelecionada: categoria })
    }

    async salvarCategoria() {
        const resultado = await CategoriaRepository.save(this.state.categoriaSelecionada.descricao)
        const flag = resultado.data.flag;
        if (flag) {
            this.setState({ categoriaSelecionada: this.initializeCategoria() })
            toast(resultado.data.msg);
            this.updateCategorias()
        }
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
                <Dimmer.Dimmable blurring
                    as={Segment}
                    key={this.state.updateCategorias}
                    active={this.state.carregarCategorias}>
                    <CategoriaItemForm
                        categoria={this.state.categoriaSelecionada}
                        titulo={"Inclusão de Categoria de curso"}
                        icon="add"
                        changeAction={this.handleChangeDescricaoCategoria}
                        onclickAction={this.salvarCategoria}
                        buttonFloated="left"
                        position="left center"></CategoriaItemForm>
                    <Header className="header-listagem" textAlign="center" size="tiny">Categorias de Cursos  </Header>
                    <List horizontal animated verticalAlign='middle'>
                        {this.state.categorias.map(c => (
                            <CategoriaItem key={c.id} categoria={c} />
                        ))}
                    </List>
                    <Dimmer active={this.state.carregarCategorias}>
                        <Header as='h2' inverted>
                            <Icon name=' circle notch' />
                        </Header>
                    </Dimmer>
                </Dimmer.Dimmable>
            </div>
        );
    }
}