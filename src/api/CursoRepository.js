import { WebApi } from './WebApi';
export class CursoRepository {

    static all() {
        return WebApi.create().get('cursos')
    }

    static save(curso) {
        return WebApi.create().post('cursos', curso)
    }

    static inscrever(cursoId, usuarioId) {
        return WebApi.create().post('cursos/inscrever', { usuario_id: usuarioId, curso_id: cursoId })
    }

    static findDisponiveis(usuarioId) {
        return WebApi.create().get(`cursos/disponiveis/usuario/${usuarioId}`)
    }

    static findByIncricaoUsuario(usuarioId) {
        return WebApi.create().get(`cursos/usuario/${usuarioId}`)
    }

    static remove(curso) {
        return WebApi.create().delete('cursos', { "data": curso })
    }

    static findById(id) {
        return WebApi.create().get(`cursos/${id}`)
    }
}
