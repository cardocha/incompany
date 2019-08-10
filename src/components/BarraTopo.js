import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

export const BarraTopo = ({ usuario }) => (
    <Menu stackable>
        <Menu.Item>
            <img src='/logo.png' alt='logo incompany' />
        </Menu.Item>
        <Menu.Menu position='right'>
            <Dropdown item text={usuario.nome}>
                <Dropdown.Menu>
                    <Dropdown.Item>Alterar Senha</Dropdown.Item>
                    <Dropdown.Item>Sair</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
)