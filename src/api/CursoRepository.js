import { WebApi } from './WebApi';
export class CursoRepository {

    static all() {
        return WebApi.create().get('cursos')
    }

    static save(curso) {
        return WebApi.create().post('cursos', curso)
    }

    static remove(curso) {
        return WebApi.create().delete('cursos', { "data": curso })
    }

    static findById(id) {
        return WebApi.create().get(`cursos/${id}`)
    }
}
