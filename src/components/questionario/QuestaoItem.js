import React, { Component } from 'react';
import { List, Form, Segment, Button, Icon } from 'semantic-ui-react';
import { AlternativaList } from './AlternativaList';

export class QuestaoItem extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        this.setState({ enunciado: this.props.questao.enunciado })
        this.setState({ renderAlternativas: false })
        this.toggleStateAlternativasHideButton(false)
    }

    toggleStateAlternativasHideButton(flag) {
        const curIcon = flag ? "add" : "arrow up"
        const curText = "Detalhes"
        this.setState({ icon: curIcon })
        this.setState({ text: curText })
    }

    toggleRenderAlternativas() {
        this.setState({ renderAlternativas: !this.state.renderAlternativas });
        this.toggleStateAlternativasHideButton(this.state.renderAlternativas)
    }

    handleChange(e) {
        this.setState({ enunciado: e.target.value });
    }

    renderAlternativas() {
        return this.state.renderAlternativas ? (
            <Form.Group>
                <Form.Field width={"16"}>
                    <AlternativaList key={"questao-edicao-" + this.props.questao.id} questao={this.props.questao} ></AlternativaList>
                </Form.Field>
            </Form.Group>
        ) : null
    }

    render() {
        return (<List.Item>
            <Segment>
                <Form>
                    <Form.Group>
                        <Form.Input onChange={this.handleChange.bind(this)}
                            size="small"
                            value={this.state.enunciado} width={"16"} />
                    </Form.Group>
                    {this.renderAlternativas()}
                </Form>
                <Button basic floated="right" size="mini" > <Icon name="close"></Icon> Remover Questão</Button>
                <Button
                    onClick={this.toggleRenderAlternativas.bind(this)} basic
                    size="mini">
                    <Icon name={this.state.icon}></Icon>
                    {this.state.text}
                </Button>
            </Segment>

        </List.Item>)
    }
}