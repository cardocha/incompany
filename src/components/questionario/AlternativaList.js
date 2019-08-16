import React, { Component } from 'react';
import { Checkbox, Form, Segment, Button, Divider } from 'semantic-ui-react';

export class AlternativaList extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleChange(e, { value }) {
        this.setState({ value })
        this.setAlternativaSelecionada(value)
    }

    async componentDidMount() {
        this.setState({ value: this.props.questao.alternativas[0].id })
        this.setAlternativaSelecionada(this.props.questao.alternativas[0].id)
    }

    setAlternativaSelecionada(id) {
        this.setState({ alternativaSelecionada: this.props.questao.alternativas.find(q => q.id === parseInt(id)) })
    }

    render() {
        return (
            <Segment>

                {this.props.questao.alternativas.map(a => (
                    <Form.Field key={"alternativa-" + a.id}>
                        <Checkbox
                            radio
                            label={a.texto}
                            name={"questao-" + this.props.questao.id}
                            value={a.id}
                            checked={this.state.value === a.id}
                            onChange={this.handleChange.bind(this)}
                        />
                        <Button icon="close" basic floated="right" size="mini"></Button>
                        <Divider></Divider>
                    </Form.Field>
                ))}
                <Form.Field key={"nova-alternativa"}>
                    <Form.Input action={{ icon: "add", basic: true }} size="mini" placeholder="Descrição Nova Alternativa"></Form.Input>
                    <Divider></Divider>
                </Form.Field>
            </Segment>

        )
    }
}