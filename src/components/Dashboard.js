import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CategoriaList } from './categoria/CategoriaList';
import { UsuarioList } from './usuario/UsuarioList';
import { BarraTopo } from './BarraTopo';
import { CursoList } from './curso/CursoList';
import { Auth } from '../api/Auth';
import { Segment } from 'semantic-ui-react';

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dashboardContent: true
        }
    }

    sair() {
        Auth.clear()
    }

    async componentDidMount() {
    }

    hideDashBoard() {
        this.setState({ dashboardContent: false })
    }

    showDashBoard() {
        this.setState({ dashboardContent: true })
    }

    renderDashboardContent() {
        return this.state.dashboardContent ? (
            <div>
                <CursoList
                    hideDashBoard={this.hideDashBoard.bind(this)}
                    showDashBoard={this.showDashBoard.bind(this)}>
                </CursoList>
                <UsuarioList
                    hideDashBoard={this.hideDashBoard.bind(this)}
                    showDashBoard={this.showDashBoard.bind(this)}>
                </UsuarioList>
                <CategoriaList
                    hideDashBoard={this.hideDashBoard.bind(this)}
                    showDashBoard={this.showDashBoard.bind(this)}>
                </CategoriaList>
            </div>
        ) : '';
    }

    render() {
        return Auth.get() !== null ?
            (
                <Segment>
                    <BarraTopo sairAction={this.sair} auth={Auth.get()}></BarraTopo>
                    {this.renderDashboardContent()}
                </Segment>
            ) : ''
    }
}