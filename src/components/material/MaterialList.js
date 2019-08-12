import React, { Component } from 'react';
import { List, Button, Icon, Label, Popup, Form } from 'semantic-ui-react'

export class MaterialList extends Component {
    state = {
        materiais: []
    }

    async componentDidMount() {
        this.setState({ materiais: this.props.materiais })
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

    renderMaterial(material) {
        return (
            <List.Item key={material.id}>
                <span>
                    <Icon name={this.getMaterialIcon(material)} />
                    {material.titulo}
                </span>
                <Button icon="close" basic floated="right" size="mini"></Button>
            </List.Item>
        )
    }

    renderMaterialPorTipo(materialList, titulo) {
        return (
            <List.Item>
                <List selection verticalAlign='middle' key={"list-" + titulo}>
                    <Label><Icon name="tag"/>{titulo}</Label>
                    <Popup wide="very"
                        trigger={
                            <Button icon="add" size="mini" basic></Button>
                        }
                        content={
                            <Form>
                                <Form.Group widths="16">
                                    <Form.Field>
                                        <label>Título</label>
                                        <input placeholder='Título' />
                                    </Form.Field>
                                    <Form.Field >
                                        <label>Link</label>
                                        <input placeholder='link do material' />
                                    </Form.Field>
                                    <Form.Field >
                                        <label>&nbsp;</label>
                                        <Button icon="check" basic></Button>
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        }
                        on='click'
                        position='right center'
                    />
                    {this.renderMaterial(materialList)}
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
        );
    }
}