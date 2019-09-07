import React, { Component } from 'react';
import { Segment, Divider, Icon, Image } from 'semantic-ui-react';
import './certificado.css'

export class Certificado extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Segment textAlign="center" className='container-certificado'>
                <Divider></Divider>
                <Image centered size="mini" src='/logo.png' alt='logo incompany' />
                <div>Incompany Trainning</div>
                <br />
                <br />
                <div>Certifica que <b>{this.props.usuario.nome}</b> concluiu o todas <br />
                    as unidades do curso <b>{this.props.curso.titulo}</b> com aproveitamento <br />
                    satisfatório e carga horária de <b>20</b> horas. </div>
                <br />
                <br />
                <div>Incompany Trainning Sistema de treinamentos para empresas</div>
                <Divider></Divider>
            </Segment>
        );
    }
}