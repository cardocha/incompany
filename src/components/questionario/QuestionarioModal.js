import React from 'react';
import { Modal, Icon, List, Button } from 'semantic-ui-react';
import { QuestaoItem } from './QuestaoItem'
import { Link } from 'react-router-dom'

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
                <Icon name="check" />Salvar
            </Button>
            <Link to={`/cursos/${curso.id}`}>
                <Button floated="left" basic>
                    <Icon name="arrow left" />Cancelar
                </Button>
            </Link>
            <Button floated="left" basic>
                <Icon name="add" />Nova Questão
            </Button>
        </Modal.Actions>
    </Modal>)