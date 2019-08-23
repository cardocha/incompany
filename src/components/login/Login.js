import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { Segment, Form, Checkbox, Button, Icon, Container, Image, Divider, Header, Label, Menu } from 'semantic-ui-react';
import './login.css'
import { WebApi } from '../../api/WebApi';

export class Login extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container textAlign="center">
                <Divider></Divider>
                <Divider hidden />
                <Image centered="true" size='tiny' className="inline-block" src={WebApi.getUrl() + 'assets/images/incompany.png'} />
                <Header>Incompany
                     <Label basic> Trainning app</Label>
                </Header>
                <Segment compact textAlign="left" className="inline-block">
                    <Form>
                        <Form.Field>
                            <label>E-mail</label>
                            <input size="small" name="email" type="text" placeholder="E-mail" />
                        </Form.Field>
                        <Form.Field>
                            <label>Senha</label>
                            <input size="small" name="senha" type="password" placeholder="Senha" />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label="Manter conectado"></Checkbox>
                        </Form.Field>
                        <Button size="small" floated="right" basic><Icon name="key"></Icon> Entrar</Button>
                    </Form>
                </Segment>
                <Divider></Divider>
                <Menu secondary>
                    <Menu.Menu position="left">
                        <Menu.Item
                            name='section1'>
                            Feito utilizando &nbsp;&nbsp;
                            <a target="_blank" href="https://react.io"><Icon size="big" size="big" name="react"></Icon></a>
                            <a target="_blank" href="https://codeigniter.com">
                                <Image centered="true" className="inline-block" src={WebApi.getUrl() + 'assets/images/codeigniter.png'} />
                            </a>
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                        <Menu.Item
                            name='section1'>
                            <a target="_blank" href="https://github.com/cardocha/incompany"><Icon name="github"></Icon>source code</a>
                        </Menu.Item>
                        <Menu.Item
                            name='section2'>
                            <a target="_blank" href="https://cardocha.github.io"><Icon name="code"></Icon>Luciano Cardoso</a>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Container>
        )
    };
}
