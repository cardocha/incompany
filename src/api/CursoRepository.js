import { WebApi } from './WebApi';
import { Auth } from './Auth';
export class CursoRepository {

    static all() {
        return WebApi.create().get('cursos')
    }

    static save(curso) {
        return WebApi.create().post('cursos', curso)
    }

    static isConcluido(curso) {
        return WebApi.create().post('cursos/is_concluido', { curso_id: curso, usuario_id: Auth.get().id })
    }

    static getAvaliacao(curso) {
        return WebApi.create().post('cursos/get_avaliacao', { curso_id: curso, usuario_id: Auth.get().id })
    }

    static enviarAvaliacao(curso, comentario, nota) {
        return WebApi.create().post('cursos/avaliacao', {
            curso_id: curso,
            comentario: comentario,
            nota: nota,
            usuario_id: Auth.get().id
        })
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
