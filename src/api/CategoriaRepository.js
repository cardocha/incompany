import { WebApi } from './WebApi';
export class CategoriaRepository {

    static all() {
        return WebApi.create().get('categorias')
    }

    static save(categoria) {
        return WebApi.create().post('categorias', categoria)
    }

    static remove(categoria) {
        return WebApi.create().delete('categorias', { "data": categoria })
    }
}
