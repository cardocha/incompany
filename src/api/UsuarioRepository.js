import { WebApi } from './WebApi';
import { enc } from 'crypto-js';
import sha256 from 'crypto-js/sha256'
export class UsuarioRepository {
    static all() {
        return WebApi.create().get('usuarios')
    }

    static save(usuario) {
        return WebApi.create().post('usuarios', usuario)
    }

    static findById(usuarioId) {
        return WebApi.create().get(`usuarios/${usuarioId}`)
    }

    static remove(usuario) {
        return WebApi.create().delete('usuarios', { "data": usuario })
    }

    static login(usuario) {
        const login = {
            email: usuario.email,
            _: sha256(usuario.senha).toString(enc.Hex)
        }
        return WebApi.create().post('login', login)
    }
}
