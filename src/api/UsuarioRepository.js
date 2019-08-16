import usuarios from './usuarios-data.json'

export class UsuarioRepository {
    static all() {
        return new Promise((resolve, reject) => {
            if (usuarios) {
                resolve(usuarios);
            } else {
                reject();
            }
        })
    }
}
