import React, { Component } from 'react';
import { BarraTopo } from '../BarraTopo';
import { Segment, Grid, Icon, Label, Divider, Header, List, Table } from 'semantic-ui-react';
import { UsuarioRepository } from '../../api/UsuarioRepository';
import { CursoRepository } from '../../api/CursoRepository';


export class UsuarioDetalhe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detalhesUsuario: [],
            inscricoes: [],
            usuarioSelecionado: {}
        }

    }

    async componentDidMount() {
        const detalhesUsuario = await UsuarioRepository.findById(this.props.match.params.id)
        const usuarioSelecionado = detalhesUsuario.data[0]
        const inscricoes = await CursoRepository.findByIncricaoUsuario(usuarioSelecionado.usuarioId)
        this.setState({ usuarioSelecionado: usuarioSelecionado })
        this.setState({ detalhesUsuario: detalhesUsuario.data })
        this.setState({ inscricoes: inscricoes.data })
    }

    initializeUsuario() {
        return { id: 0, nome: '', email: '', senha: '', tipo: '', dataCadastro: '' }
    }

    getTipoDocumento(nomeArquivo) {
        if (nomeArquivo.includes(".pdf"))
            return "file pdf outline";

        if (nomeArquivo.includes(".doc"))
            return "file word outline";

        if (nomeArquivo.includes(".xls"))
            return "file excel outline";

        if (this.isImage(nomeArquivo))
            return "file image"

        if (this.isCompressed(nomeArquivo))
            return "file archive"

        return "file outline"
    }

    getMaterialIcon(tipo, url) {
        switch (tipo) {
            case 'V':
                return "play"
            case 'D':
                return this.getTipoDocumento(url)
            case 'Q':
                return "question circle outline"
        }
    }

    getPercentual(percentual, tipo) {
        if (tipo !== "Q") {

            if (percentual === null)
                return (<Icon name="orange circle"></Icon>)
                

            if (Number(percentual) < 100)
                return (<Icon name="orange circle"></Icon>)
            else
                return (<Icon name="green check"></Icon>)
        }
        else {

            if (percentual === null)
               return (<Label basic color="orange">0%</Label>)
               
            if (Number(percentual) < 70)
                return (<Label basic color="orange">{percentual + "%"}</Label>)
            else
                return (<Label basic color="green">{percentual + "%"}</Label>)
        }
    }

    groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});


    render() {
        return (
            <div>
                <BarraTopo></BarraTopo>
                <Segment>
                    <Icon size="huge" name="user"></Icon>

                    <Label size="big" basic>{this.state.usuarioSelecionado.usuarioNome}</Label>
                    <Label size="big" basic>{this.state.usuarioSelecionado.usuarioEmail}</Label>

                    <Segment>
                        <Segment>
                            <Header>Inscrições</Header>
                            {this.state.inscricoes.map(inc => (
                                <Label>{inc.titulo}</Label>
                            ))}
                        </Segment>
                        <Header>Materiais e Questionários</Header>
                        <Table celled selection>
                            {this.state.detalhesUsuario.map(d => (
                                <Table.Row>
                                    <Table.Cell>
                                        <span>{d.cursoTitulo}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span>{d.materialTitulo}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span><Icon name={this.getMaterialIcon(d.tipo, d.url)}></Icon></span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span>{this.getPercentual(d.percentual, d.tipo)}</span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table>
                    </Segment>
                </Segment>
            </div>
        )
    }
}