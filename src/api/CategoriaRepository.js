import { WebApi } from './WebApi';

export class CategoriaRepository {

    static all() {
        return WebApi.create().get('categorias')
    }
}
