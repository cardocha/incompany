import { WebApi } from './WebApi';
export class TagaRepository {

    static all() {
        return WebApi.create().get('tags')
    }
    
    static findByCursoId(cursoId) {
        return WebApi.create().get(`tags/curso/${cursoId}`)
    }

    static save(tag) {
        return WebApi.create().post('tags', tag)
    }

    static remove(tag) {
        return WebApi.create().delete('tags', { "data": tag })
    }
}
