import { WebActions } from './WebActions';
import { enc } from 'crypto-js';
import sha256 from 'crypto-js/sha256'
export class UsuarioRepository {
    static all() {
        return WebActions.createRequest().get('usuarios')
    }

    static save(usuario) {
        return WebActions.createRequest().post('usuarios', usuario)
    }

    static findById(usuarioId) {
        return WebActions.createRequest().get(`usuarios/${usuarioId}`)
    }

    static remove(usuario) {
        return WebActions.createRequest().post('usuarios', { "data": usuario, "op": "del" })
    }

    static login(usuario) {
        const login = {
            email: usuario.email,
            _: sha256(usuario.senha).toString(enc.Hex)
        }
        return WebActions.createRequest().post('login', login)
    }
}
