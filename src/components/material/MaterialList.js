import React, { Component } from 'react';
import { List, Button, Icon, Label, Segment, Menu } from 'semantic-ui-react'
import { MaterialItemForm } from './MaterialItemForm';
import { MaterialRepository } from '../../api/MaterialRepository';
import { Notificacao } from '../notificacao/Notificacao';
import { QuestionarioList } from '../questionario/QuestionarioList';
import { Auth } from '../../api/Auth';
import { CursoRepository } from '../../api/CursoRepository';

export class MaterialList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            materiais: [],
            materialSelecionado: this.initializeMaterial(),
            updateMateriais: 1,
            modalQuestoes: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.limpaSelecao = this.limpaSelecao.bind(this)
        this.seleciona = this.seleciona.bind(this)
        this.setVisibleModalQuestoes = this.setVisibleModalQuestoes.bind(this)
    }

    async componentDidMount() {
        this.updateMateriais()
    }

    async updateMateriais() {
        if (this.props.unidadeSelecionada !== undefined) {
            const resultado = await MaterialRepository.possuiInteracao(Auth.get().id, this.props.unidadeSelecionada.curso_id, this.props.unidadeSelecionada.id);
            let materiais = []
            resultado.data.map(m => {
                m.final = m.final === "1"
                materiais.push(m)
            })
            this.setState({ materiais: materiais })
        }
        this.setState({ updateMateriais: this.state.updateMateriais + 1 })
    }

    getMaterialIcon(material) {
        switch (material.tipo) {
            case 'V':
                return "play"
            case 'D':
                return this.getTipoDocumento(material.url)
            case 'Q':
                return "question circle outline"
            default:
                return "file outline"
        }
    }

    initializeMaterial() {
        return {
            id: 0,
            titulo: '',
            url: '',
            tipo: '',
            final: false
        }
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

    limpaSelecao() {
        this.setState({ materialSelecionado: this.initializeMaterial() })
    }

    setVisibleModalQuestoes(flag) {
        this.setState({ modalQuestoes: flag })
    }

    seleciona(material) {
        this.setMaterialFinal(material)
        this.setState({ materialSelecionado: material })
    }

    editaQuestoes(material) {
        this.seleciona(material)
        if (material.tipo === 'Q') {
            this.setVisibleModalQuestoes(true)
        }
    }

    isImage(url) {
        const imageRegex = new RegExp(/\.(jpg|png|gif|bmp)$/i)
        return imageRegex.test(url);
    }

    isCompressed(url) {
        const imageRegex = new RegExp(/\.(zip|rar|gz|7z)$/i)
        return imageRegex.test(url);
    }

    async salvarMaterial() {
        this.setStatusRequisicao(await MaterialRepository.save(this.state.materialSelecionado));
    }

    async removerMaterial(material) {
        this.setStatusRequisicao(await MaterialRepository.remove(material));
    }

    async registrarInteracao(material) {
        if (!material.interacao || material.interacao < 100)
            this.setStatusRequisicao(await MaterialRepository.interacao(material.id, Auth.get().id, this.props.unidadeSelecionada.curso_id));
    }

    handleClick(acao) {
        if (acao === "SM") {
            this.salvarMaterial()
        }
        else
            if (acao === "RM") {
                this.removerMaterial()
            }
    }

    getDadosMaterial(material) {
        return material
    }

    load() {
        window.location.reload()
    }

    renderBotaoVisualizacao(material) {
        if (material.tipo !== 'Q')
            return (<a onClick={() => this.registrarInteracao(material)} rel="noopener noreferrer" target='_blank' href={`${material.url}`}><Button floated="right" basic size="mini" >Ver Material</Button> </a>)
        else
            return (<Button onClick={() => this.editaQuestoes(material)} floated="right" basic size="mini">Responder Questionário</Button>)

    }

    escondeMaterial(material) {
        if (this.todosMaterialsDaUnidadeConcluidos())
            return false

        return material.final && !Auth.isPerfilAdm()
    }

    todosMaterialsDaUnidadeConcluidos() {
        let item = this.state.materiais.find(function (material) {
            return material.interacao === 0 && !material.final
        })
        return item === undefined
    }

    mostraInteracao(material) {
        if (material.interacao > 70)
            return (<Label color="green" basic floated="right" size="mini"><Icon name="green check"></Icon>{material.interacao + "%"}</Label>)

        if (!material.interacao)
            material.interacao = 0;

        return (<Label color="orange" basic floated="right" size="mini"><Icon name="orange circle"></Icon>{material.interacao + "%"}</Label>)
    }

    renderMaterial(material) {

        return this.escondeMaterial(material) ? '' : (
            <List.Item key={material.id}>
                <Segment s>
                    <Label basic>
                        <Icon size="large" name={this.getMaterialIcon(material)} />
                        {material.titulo}
                    </Label>
                    {!Auth.isPerfilAdm() ? this.mostraInteracao(material) : ''}
                    {!Auth.isPerfilAdm() ? this.renderBotaoVisualizacao(material) : this.renderEdicaoMaterial(material)}
                    {material.final ? (<Label color="red" size='mini' floating basic>Final</Label>) : ''}
                </Segment>
            </List.Item>
        )
    }

    renderMaterialPorTipo(materialItem, titulo) {
        return (
            <List.Item key={"conj-" + titulo}>
                <List selection verticalAlign='middle' key={"list-" + titulo}>
                    <Label><Icon name="tag" />{titulo}</Label>
                    {this.renderMaterial(materialItem)}
                </List>
            </List.Item>
        )
    }

    renderEdicaoMaterial(material) {
        return (
            <Menu secondary size="mini" compact floated="right">
                {
                    material.tipo === 'Q' ?
                        <Menu.Item><Button onClick={() => this.editaQuestoes(material)} basic size="mini">Questões</Button></Menu.Item> : ''
                }

                <Menu.Item>
                    <MaterialItemForm
                        material={material}
                        seleciona={this.seleciona}
                        limpa={this.limpaSelecao}
                        titulo={"Editar " + material.titulo}
                        icon="pencil"
                        buttonTitle=""
                        buttonFloated="right"
                        handleChange={this.handleChange}
                        handleClick={this.handleClick}
                        position="left center"></MaterialItemForm>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={() => this.removerMaterial(material)} icon="close" basic size="mini"></Button>
                </Menu.Item>
            </Menu>)
    }

    setStatusRequisicao(resultado) {
        Notificacao.gerar(resultado)
        if (resultado.data.flag) {
            this.setState({ materialSelecionado: this.initializeMaterial() })
            this.updateMateriais()
            if (!Auth.isPerfilAdm() && this.props.update !== undefined) {
                this.verificaUpdateCurso()
            }
        }
    }

    async verificaUpdateCurso() {
        const validaDados = this.isCursoConcluido
        const atualiza = this.props.update
        CursoRepository.isConcluido(this.props.unidadeSelecionada.curso_id).then(function (dadosConclusao) {
            if (validaDados(dadosConclusao.data))
                atualiza()
        })
    }

    isCursoConcluido(dadosConclusao) {
        const concluido = Number(dadosConclusao.percentual_total);
        const minimo = Number(dadosConclusao.percentual_docs) + Number(dadosConclusao.percentual_questoes)

        return concluido > 0 && minimo > 0 && concluido >= minimo
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
    handleChange(e, obj) {
        const element = obj !== undefined ? obj : e.target
        const material = this.state.materialSelecionado
        if (element === obj && element.checked !== undefined)
            material[element.name] = element.checked
        else
            material[element.name] = element.value
        material.unidade_id = this.props.unidadeSelecionada.id
        this.setMaterialFinal(material)
        this.setState({ materialSelecionado: material })
    }

    setMaterialFinal(material) {
        if (material.tipo !== "Q") {
            material.final = false;
        }
    }

    renderQuestionarioList() {
        return this.state.modalQuestoes ? (
            <QuestionarioList
                setVisibleModal={this.setVisibleModalQuestoes.bind(this)}
                updateMateriais={this.updateMateriais.bind(this)}
                modalQuestoes={this.state.modalQuestoes}
                questionario={this.state.materialSelecionado}
                update={this.props.update}>
            </QuestionarioList>) : ''
    }

    render() {
        return (
            <div key={'lista-materiais-unidade-' + this.props.unidadeSelecionada + "-" + this.state.updateMateriais}>
                <List animated selection verticalAlign='middle' key={"list-documentos"}>
                    {
                        this.state.materiais.map(material => (
                            this.renderMaterial(material)
                        ))
                    }
                </List>
                {Auth.isPerfilAdm() ? (
                    <MaterialItemForm
                        material={this.state.materialSelecionado}
                        titulo={"Inclusão Material"}
                        seleciona={this.seleciona}
                        limpa={this.limpaSelecao}
                        icon="add"
                        buttonTitle="Incluir Material"
                        buttonFloated="left"
                        handleClick={this.handleClick}
                        handleChange={this.handleChange}
                        position="left center"></MaterialItemForm>
                ) : ''}
                {this.renderQuestionarioList()}
            </div >

        )
    }
}