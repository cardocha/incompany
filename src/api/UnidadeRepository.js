import { WebApi } from './WebApi';
export class UnidadeRepository {

    static all() {
        return WebApi.create().get('unidades')
    }

    static save(unidade) {
        return WebApi.create().post('unidades', unidade)
    }

    static remove(unidade) {
        return WebApi.create().delete('unidades', { "data": unidade })
    }
}
