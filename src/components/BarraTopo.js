import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Auth } from '../api/Auth';
import { WebActions } from '../api/WebActions';

export class BarraTopo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: {
                nome: ''
            }
        }
    }

    async componentDidMount() {
        this.setState({ auth: this.props.auth })
    }

    render() {
        return Auth.get() !== null ? (
            <Menu stackable>
                <Menu.Item>
                    <img  src={WebActions.getApiUrl() + 'assets/images/incompany.png'} alt='logo incompany' />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item text={Auth.get().nome}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={Auth.clear}>Sair</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>) : ''
    }
}
