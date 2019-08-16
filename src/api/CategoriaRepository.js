import categorias from './categorias-data.json'

export class CategoriaRepository {
    static all() {
        return new Promise((resolve, reject) => {
            if (categorias) {
                resolve(categorias);
            } else {
                reject();
            }
        })
    }
}
