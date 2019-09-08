import { WebActions } from './WebActions';
export class UnidadeRepository {

    static all() {
        return WebActions.createRequest().get('unidades')
    }

    static findByCursoId(cursoId) {
        return WebActions.createRequest().get(`unidades/curso/${cursoId}`)
    }

    static findById(unidadeId) {
        return WebActions.createRequest().get(`unidades/${unidadeId}`)
    }

    static save(unidade) {
        return WebActions.createRequest().post('unidades', unidade)
    }

    static remove(unidade) {
        return WebActions.createRequest().post('unidades', { "data": unidade, "op": "del" })
    }
}
