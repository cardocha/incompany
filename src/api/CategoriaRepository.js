import { WebApi } from './WebApi';
export class CategoriaRepository {

    static all() {
        return WebApi.create().get('categorias')
    }

    static save(descricao) {
        const params = new URLSearchParams();
        params.append('descricao', descricao);
        return WebApi.create().post('categorias', params)
    }
}
