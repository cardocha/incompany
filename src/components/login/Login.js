import React, { Component } from 'react';
import {
    Segment, Form, Checkbox, Button,
    Icon, Container, Image, Divider,
    Header, Label, Menu
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './login.css'
import { WebApi } from '../../api/WebApi';
import { UsuarioRepository } from '../../api/UsuarioRepository';
import { Notificacao } from '../notificacao/Notificacao';

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usuario: this.initializeUsuario(),
            logando: false
        }

        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const usuario = this.state.usuario
        usuario[element.name] = element.value
        this.setState({ usuario: usuario })
    }

    async componentDidMount() {
        this.setState({ usuario: this.initializeUsuario() })
    }

    async login() {
        this.setState({ logando: true })

        const resultado = await UsuarioRepository.login(this.state.usuario)
        console.log(resultado)
        Notificacao.gerar(resultado)

        this.setState({ logando: false })
    }

    initializeUsuario() {
        return {
            email: '',
            senha: ''
        }
    }

    render() {
        return (
            <Container textAlign="center">
                <Divider></Divider>
                <Divider hidden />
                <Image centered size='tiny' className="inline-block" src={WebApi.getUrl() + 'assets/images/incompany.png'} />
                <Header>Incompany
                     <Label basic> Trainning app</Label>
                </Header>
                <Segment compact textAlign="left" className="inline-block">
                    <Form>
                        <Form.Field>
                            <label>E-mail</label>
                            <input onChange={this.handleChange} size="small" name="email" type="text" placeholder="E-mail" />
                        </Form.Field>
                        <Form.Field>
                            <label>Senha</label>
                            <input onChange={this.handleChange} size="small" name="senha" type="password" placeholder="Senha" />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label="Manter conectado"></Checkbox>
                        </Form.Field>
                        <Button disabled={this.state.logando} loading={this.state.logando} onClick={this.login} size="small" floated="right" basic><Icon name="key"></Icon> Entrar</Button>
                    </Form>
                </Segment>
                <Divider></Divider>
                <Menu secondary>
                    <Menu.Menu position="left">
                        <Menu.Item
                            name='section1'>
                            Desenvolvido utilizando &nbsp;&nbsp;
                            <a target="_blank" rel="noopener noreferrer" href="https://react.io"><Icon size="big" name="react"></Icon></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://codeigniter.com">
                                <Image centered className="inline-block" src={WebApi.getUrl() + 'assets/images/codeigniter.png'} />
                            </a>
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/cardocha/incompany"><Icon size="large" name="github"></Icon>Código Fonte</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="https://cardocha.github.io"><Icon name="user"></Icon>Luciano Cardoso</a>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Container>
        )
    };
}
