import React from 'react';
import { Modal, Header, Label, Icon, List, Button } from 'semantic-ui-react';
import { QuestaoItem } from './QuestaoItem'

export const QuestionarioModal = ({ curso, questoes }) =>
    (<Modal open={true}>
        <Modal.Header>{curso.titulo}</Modal.Header>
        <Modal.Content scrolling>
            <List>
                {questoes.map(q => (
                    <QuestaoItem key={q.id} questao={q} />
                ))}
            </List>
        </Modal.Content>
        <Modal.Actions>
            <Button basic>
                <Icon name="check"/>Salvar
            </Button>
            <Button floated="left" basic>
                <Icon name="arrow left" />Cancelar
            </Button>
        </Modal.Actions>
    </Modal>)