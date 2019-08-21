import React, { Component } from 'react';
import { CursoRepository } from '../../api/CursoRepository';
import { CursoItem } from './CursoItem';
import { Segment, List, Label, Icon, Header, Dimmer, Button, Divider } from 'semantic-ui-react'
import { UsuarioRepository } from '../../api/UsuarioRepository';
import { UsuarioItem } from '../usuario/UsuarioItem';
import { CategoriaRepository } from '../../api/CategoriaRepository';
import { CategoriaItemForm } from '../categoria/CategoriaItemForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PopupForm } from '../PopupForm';

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
        this.handleClickCategoriaItem = this.handleClickCategoriaItem.bind(this);
        this.selectCategoria = this.selectCategoria.bind(this);
        this.limparSelecaoCategoria = this.limparSelecaoCategoria.bind(this);
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

    limparSelecaoCategoria() {
        this.setState({ categoriaSelecionada: this.initializeCategoria() })
    }

    selectCategoria(categoria) {
        this.setState({ categoriaSelecionada: categoria })
    }

    handleChangeDescricaoCategoria(e) {
        const categoria = {
            id: this.state.categoriaSelecionada.id,
            descricao: e.target.value
        }
        this.setState({ categoriaSelecionada: categoria })
    }

    handleClickCategoriaItem(acao) {
        if (acao === "AE") {
            this.salvarCategoria()
        } else
            if (acao === "R") {
                this.removerCategoria()
            }

    }

    setStatusRequisicao(resultado) {
        toast(resultado.data.msg, {
            type: resultado.data.flag ? toast.TYPE.INFO : toast.TYPE.WARNING
        });
        if(resultado.data.flag){
            this.setState({ categoriaSelecionada: this.initializeCategoria() })
            this.updateCategorias()
        }
    }

    async salvarCategoria() {
        this.setStatusRequisicao(await CategoriaRepository.save(this.state.categoriaSelecionada));
    }

    async removerCategoria() {
        this.setStatusRequisicao(await CategoriaRepository.remove(this.state.categoriaSelecionada));
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
                    <PopupForm
                        trigger={
                            <Button basic
                                onClick={this.limparSelecaoCategoria}
                                className="pointer"
                                as="a"
                                floated="left"
                                size="mini"> <Icon name="add"></Icon>Adicionar
                            </Button>
                        }
                        position="left center"
                        content={
                            <CategoriaItemForm
                                titulo={"Inclusão de Categoria de Curso"}
                                categoria={this.state.categoriaSelecionada}
                                changeAction={this.handleChangeDescricaoCategoria}
                                onClickAction={this.handleClickCategoriaItem}>
                            </CategoriaItemForm>}
                    ></PopupForm>

                    <Header className="header-listagem" textAlign="center" size="tiny">Categorias de Cursos  </Header>
                    <List horizontal animated verticalAlign='middle'>
                        {this.state.categorias.map(c => (
                            <List.Item key={c.id} >
                                <PopupForm
                                    trigger={
                                        <Button onClick={() => this.selectCategoria(c)} className="botao-item-sistema" basic>
                                            <List.Content>
                                                <Segment compact basic>
                                                    <Icon name='grid layout' size='big' />
                                                    <List.Header className="nome-list">{c.descricao}</List.Header>
                                                    <Divider></Divider>
                                                    <Label size="mini" basic>
                                                        <Icon name='cube' /> {c.qtdCursos}
                                                    </Label>
                                                </Segment>
                                            </List.Content>
                                        </Button>
                                    }
                                    position="left center"
                                    content={
                                        <CategoriaItemForm
                                            titulo={"Edição de Categoria de Curso"}
                                            categoria={this.state.categoriaSelecionada}
                                            changeAction={this.handleChangeDescricaoCategoria}
                                            onClickAction={this.handleClickCategoriaItem}>
                                        </CategoriaItemForm>}
                                ></PopupForm>
                            </List.Item>
                        ))}
                    </List>
                    <Dimmer active={this.state.carregarCategorias}>
                        <Header as='h2' inverted>
                            <Icon loading name='circle notch' />
                        </Header>
                    </Dimmer>
                </Dimmer.Dimmable>
            </div>
        );
    }
}