import React from 'react';
import { Form, Segment, Divider, Popup, Button, Modal } from 'semantic-ui-react';
import { AlternativaList } from '../alternativa/AlternativaList'


export const QuestaoItemForm = ({ handleChange, alternativaCorreta, questao }) =>
    <Modal wide="very" size="huge"
        trigger={
            <Button icon="pencil" floated="right" size="mini" basic></Button>
        }
        content={
            <Segment className="bottom-extended">
                <Form>
                    <Form.Group>
                        <Form.Input onChange={handleChange.bind(this)}
                            size="small"
                            name="enunciado"
                            value={questao.enunciado}
                            onChange={handleChange}
                            width={"16"} />
                    </Form.Group>
                    <Divider></Divider>
                    <Form.Group>
                        <Form.Field width={"16"}>
                            <AlternativaList
                                alternativaCorreta={alternativaCorreta}
                                key={"questao-edicao-" + questao.id}
                                questao={questao} >
                            </AlternativaList>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        }
        on='click'
        position="right center"
    />
