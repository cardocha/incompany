import React, { Component } from 'react';
import { List, Button, Icon, Label } from 'semantic-ui-react'
import { MaterialItemForm } from './MaterialItemForm';
import { Link } from 'react-router-dom';

export class MaterialList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            materiais: [],
            unidadesVisible: true
        }

    }

    async componentDidMount() {
        this.setState({ materiais: this.props.materiais })
        this.setState({ unidadesVisible: true })
    }

    getMaterialIcon(material) {
        switch (material.tipo) {
            case 'V':
                return "play"
            case 'D':
                return this.getTipoDocumento(material.url)
            case 'Q':
                return "question circle outline"
        }
    }

    getTipoDocumento(nomeArquivo) {
        if (nomeArquivo.includes(".pdf"))
            return "file pdf outline";

        if (nomeArquivo.includes(".doc"))
            return "word pdf outline";

        if (nomeArquivo.includes(".xls"))
            return "excel pdf outline";

        if (this.isImage(nomeArquivo))
            return "file image outline"

        if (this.isCompressed(nomeArquivo))
            return "file archive outline"

        return "file outline"
    }

    isImage(url) {
        const imageRegex = new RegExp("([^\s]+(\.(?i)(jpg|png|gif|bmp))$)")
        return imageRegex.test(url);
    }

    isCompressed(url) {
        const imageRegex = new RegExp("([^\s]+(\.(?i)(zip|rar|gz|7z))$)")
        return imageRegex.test(url);
    }

    toggleVisibleUnidades() {
        this.setState({ unidadesVisible: !this.state.unidadesVisible })
    }

    renderMaterial(material) {
        const botaoEditar = material.tipo === 'Q' ?
            (<Link to={`/cursos/${this.props.curso.id}/questionario/${material.id}`}>
                <Button onClick={this.toggleVisibleUnidades.bind(this)} icon="pencil" basic floated="right" size="mini"></Button>
            </Link>) :

            (<MaterialItemForm
                material={material}
                titulo={"Editar " + material.titulo}
                icon="pencil"
                buttonFloated="right"
                position="left center"></MaterialItemForm>)

        return (
            <List.Item key={material.id}>
                <span>
                    <Icon name={this.getMaterialIcon(material)} />
                    {material.titulo}
                </span>
                <Button icon="close" basic floated="right" size="mini"></Button>
                {botaoEditar}
            </List.Item>
        )
    }

    renderMaterialPorTipo(materialItem, titulo) {
        return (
            <List.Item>
                <List selection verticalAlign='middle' key={"list-" + titulo}>
                    <Label><Icon name="tag" />{titulo}</Label>
                    <MaterialItemForm
                        material={materialItem}
                        curso={this.props.curso}
                        titulo={"Inclusão de " + titulo}
                        icon="add"
                        buttonFloated="left"
                        position="left center"></MaterialItemForm>
                    {this.renderMaterial(materialItem)}
                </List>
            </List.Item>
        )
    }

    renderMateriais(materiais, tipo, titulo) {
        const filtredMaterials = materiais.find(m => m.tipo === String(tipo))
        if (filtredMaterials) {
            if (Array.isArray(filtredMaterials))
                return (filtredMaterials.map(material => (
                    this.renderMaterialPorTipo(material, titulo)
                )))

            return this.renderMaterialPorTipo(filtredMaterials, titulo);
        }
    }

    render() {
        return (
            <List celled>
                {this.renderMateriais(this.state.materiais, "V", "Vídeos")}
                {this.renderMateriais(this.state.materiais, "D", "Documentos")}
                {this.renderMateriais(this.state.materiais, "Q", "Questionários")}
            </List>
        )
    }
}