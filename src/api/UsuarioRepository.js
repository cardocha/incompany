import { WebApi } from './WebApi';
export class UsuarioRepository {
    static all() {
        return WebApi.create().get('usuarios')
    }

    static save(usuario) {
        return WebApi.create().post('usuarios', usuario)
    }

    static remove(usuario) {
        return WebApi.create().delete('usuarios', { "data": usuario })
    }
}
