import { WebActions } from './WebActions';
export class TagaRepository {

    static all() {
        return WebActions.createRequest().get('tags')
    }

    static findByCursoId(cursoId) {
        return WebActions.createRequest().get(`tags/curso/${cursoId}`)
    }

    static save(tag) {
        return WebActions.createRequest().post('tags', tag)
    }

    static remove(tag) {
        return WebActions.createRequest().post('tags', { "data": tag, "op": "del" })
    }
}
