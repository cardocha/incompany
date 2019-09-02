import { WebApi } from './WebApi';
export class UnidadeRepository {

    static all() {
        return WebApi.create().get('unidades')
    }

    static findByCursoId(cursoId) {
        return WebApi.create().get(`unidades/curso/${cursoId}`)
    }

    static findById(unidadeId) {
        return WebApi.create().get(`unidades/${unidadeId}`)
    }

    static save(unidade) {
        return WebApi.create().post('unidades', unidade)
    }

    static remove(unidade) {
        return WebApi.create().delete('unidades', { "data": unidade })
    }
}
