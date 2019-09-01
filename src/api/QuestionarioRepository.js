import { WebApi } from './WebApi';
export class QuestionarioRepository {

    static all() {
        return WebApi.create().get('questao')
    }

    static save(curso) {
        return WebApi.create().post('questao', curso)
    }

    static remove(curso) {
        return WebApi.create().delete('questao', { "data": curso })
    }

    static findById(id) {
        return WebApi.create().get(`questao/${id}`)
    }
}
