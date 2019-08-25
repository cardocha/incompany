import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ValidationErrors } from '../ValidationErrors';
import { Mensagem } from '../Mensagem';

export class Notificacao {

    static gerar(resultado) {
        const msgs = resultado.data.msg;
        const elementMsg = resultado.data.flag ? (<Mensagem icon='check' msg={msgs} />) : (<ValidationErrors erros={msgs} />)
        const msgType = resultado.data.flag ? toast.TYPE.INFO : toast.TYPE.WARNING;
        toast(elementMsg, { type: msgType });
    }

}

