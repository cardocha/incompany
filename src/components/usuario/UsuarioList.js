import React, { Component } from 'react';
import { Segment, List, Label, Icon, Header, Dimmer, Button, Divider } from 'semantic-ui-react'
import { UsuarioRepository } from '../../api/UsuarioRepository';
import { CategoriaItemForm } from '../categoria/CategoriaItemForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PopupForm } from '../PopupForm';
import { UsuarioItemForm } from './UsuarioItemForm';
import { ValidationErrors } from '../ValidationErrors';
import { Mensagem } from '../Mensagem';

export class UsuarioList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            usuarioSelecionado: this.initializeUsuario(),
            updateUsuarios: 1,
            carregarUsuarios: false
        }
        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.selectUsuario = this.selectUsuario.bind(this);
        this.limparSelecao = this.limparSelecao.bind(this);
        this.handleOncloseChange = this.handleOncloseChange.bind(this);
    }

    async componentDidMount() {
        this.updateUsuarios()
        this.setState({ usuarioSelecionado: this.initializeUsuario() })
    }

    async updateUsuarios() {
       /*  this.setState({ carregarUsuarios: true }) */
       
        const usuarios = await UsuarioRepository.all()
        this.setState({ updateUsuarios: this.state.updateUsuarios + 1 })
        this.setState({ usuarios: usuarios.data })

       /*  this.setState({ carregarUsuarios: false }) */
    }

    initializeUsuario() {
        return { id: 0, nome: '', email: '', senha: '', tipo: '' }
    }

    limparSelecao() {
        this.setState({ usuarioSelecionado: this.initializeUsuario() })
    }

    selectUsuario(usuario) {
        this.setState({ usuarioSelecionado: usuario })
    }

    handleChangeUsuario(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const usuario = this.state.usuarioSelecionado
        usuario[element.name] = element.value
        this.setState({ usuarioSelecionado: usuario })
    }

    handleOncloseChange(e, obj){
        this.updateUsuarios()
    }

    handleClick(acao) {
        if (acao === "AE") {
            this.salvarUsuario()
        } else
            if (acao === "R") {
                this.removerUsuario()
            }

    }

    setStatusRequisicao(resultado) {
        this.mostrarMensagem(resultado)
        if (resultado.data.flag) {
            this.setState({ categoriaSelecionada: this.initializeUsuario() })
            this.updateUsuarios()
        }
    }

    mostrarMensagem(resultado) {
        const msgs = resultado.data.msg;
        const elementMsg = resultado.data.flag ? (<Mensagem icon='check' msg={msgs} />) : (<ValidationErrors erros={msgs} />)
        const msgType = resultado.data.flag ? toast.TYPE.INFO : toast.TYPE.WARNING;
        toast(elementMsg, { type: msgType });
    }

    async salvarUsuario() {
        this.setStatusRequisicao(await UsuarioRepository.save(this.state.usuarioSelecionado));
    }

    async removerUsuario() {
        this.setStatusRequisicao(await UsuarioRepository.remove(this.state.usuarioSelecionado));
    }

    getTiposUsuariosPossiveis() {
        return [
            { key: 1, text: 'Administrador', value: 'A' },
            { key: 2, text: 'Usuário', value: 'U' }
        ]
    }

    render() {
        return (
            <Dimmer.Dimmable blurring
                as={Segment}
                key={this.state.updateUsuarios}
                active={this.state.carregarUsuarios}>
                <PopupForm
                    onCloseAction={this.handleOncloseChange}
                    trigger={
                        <Button basic
                            onClick={this.limparSelecao}
                            className="pointer"
                            as="a"
                            floated="left"
                            size="mini"> <Icon name="add"></Icon>Adicionar
                            </Button>
                    }
                    position="left center"
                    content={
                        <UsuarioItemForm
                            titulo={"Inclusão de Usuário"}
                            usuario={this.state.usuarioSelecionado}
                            changeAction={this.handleChangeUsuario}
                            onClickAction={this.handleClick}
                            tiposUsuariosPossiveis={this.getTiposUsuariosPossiveis()}>
                        </UsuarioItemForm>}
                ></PopupForm>

                <Header className="header-listagem" textAlign="center" size="tiny">Usuários</Header>
                <List horizontal animated verticalAlign='middle'>
                    {this.state.usuarios.map(u => (
                        <List.Item key={u.id} >
                            <PopupForm
                                onCloseAction={this.handleOncloseChange}
                                trigger={
                                    <Button onClick={() => this.selectUsuario(u)} className="botao-item-sistema" basic>
                                        <List.Content>
                                            <Segment compact basic>
                                                <Icon name='user' size='big' />
                                                <List.Header className="nome-list">{u.nome}</List.Header>
                                                <Divider></Divider>
                                                <Label size="mini" basic>
                                                    <Icon name='mail' /> {u.email}
                                                </Label>
                                            </Segment>
                                        </List.Content>
                                    </Button>
                                }
                                position="left center"
                                content={
                                    <UsuarioItemForm
                                        titulo={"Edição de Usuário"}
                                        usuario={this.state.usuarioSelecionado}
                                        changeAction={this.handleChangeUsuario}
                                        onClickAction={this.handleClick}
                                        tiposUsuariosPossiveis={this.getTiposUsuariosPossiveis()}>
                                    </UsuarioItemForm>}
                            ></PopupForm>
                        </List.Item>
                    ))}
                </List>
                <Dimmer active={this.state.carregarUsuarios}>
                    <Header as='h2' inverted>
                        <Icon loading name='circle notch' />
                    </Header>
                </Dimmer>
            </Dimmer.Dimmable>
        )
    }
}