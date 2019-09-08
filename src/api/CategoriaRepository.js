import { WebActions } from './WebActions';
export class CategoriaRepository {

    static all() {
        return WebActions.createRequest().get('categorias')
    }

    static save(categoria) {
        return WebActions.createRequest().post('categorias', categoria)
    }

    static remove(categoria) {
        return WebActions.createRequest().post('categorias', { "data": categoria, "op": "del" })
    }
}
