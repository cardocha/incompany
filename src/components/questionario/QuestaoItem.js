import React from 'react';
import { List,} from 'semantic-ui-react';

export const QuestaoItem = ({ questao }) => (
    <List.Item>
        {questao.texto}
    </List.Item>
)