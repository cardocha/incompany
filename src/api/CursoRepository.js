import { WebActions } from './WebActions';
import { Auth } from './Auth';
export class CursoRepository {

    static all() {
        return WebActions.createRequest().get('cursos')
    }

    static save(curso) {
        return WebActions.createRequest().post('cursos',  curso)
    }

    static isConcluido(curso) {
        return WebActions.createRequest().post('cursos/is_concluido', { curso_id: curso, usuario_id: Auth.get().id })
    }

    static getAvaliacao(curso) {
        return WebActions.createRequest().post('cursos/get_avaliacao', { curso_id: curso, usuario_id: Auth.get().id })
    }

    static enviarAvaliacao(curso, comentario, nota) {
        return WebActions.createRequest().post('cursos/avaliacao', {
            curso_id: curso,
            comentario: comentario,
            nota: nota,
            usuario_id: Auth.get().id
        })
    }

    static inscrever(cursoId, usuarioId) {
        return WebActions.createRequest().post('cursos/inscrever', { usuario_id: usuarioId, curso_id: cursoId })
    }

    static findDisponiveis(usuarioId) {
        return WebActions.createRequest().get(`cursos/disponiveis/usuario/${usuarioId}`)
    }

    static findByIncricaoUsuario(usuarioId) {
        return WebActions.createRequest().get(`cursos/usuario/${usuarioId}`)
    }

    static remove(curso) {
        return WebActions.createRequest().post('cursos', { "data": curso, "op": "del" })
    }

    static findById(id) {
        return WebActions.createRequest().get(`cursos/${id}`)
    }
}
