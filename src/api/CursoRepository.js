import cursos from './cursos-data.json'

export class CursoRepository {
    static all() {
        return new Promise((resolve, reject) => {
            if (cursos) {
                resolve(cursos);
            } else {
                reject();
            }
        })
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const curso = cursos.items.find(c => c.id === parseInt(id))
            if (curso) {
                resolve(curso);
            } else {
                reject();
            }
        })
    }
}
