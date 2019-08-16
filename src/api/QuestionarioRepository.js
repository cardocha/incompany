import questoes from './questoes-data.json'

export class QuestionarioRepository {
    static all() {
        return new Promise((resolve, reject) => {
            if (questoes) {
                resolve(questoes);
            } else {
                reject();
            }
        })
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const questao = questoes.items.find(c => c.id === parseInt(id))
            if (questao) {
                resolve(questao);
            } else {
                reject();
            }
        })
    }

    static findAlternativasByQuestionarioId(id) {
        return new Promise((resolve, reject) => {
            const questao = questoes.items.find(c => c.id === parseInt(id))
            if (questao) {
                resolve(questao.alternativas);
            } else {
                reject();
            }
        })
    }
}
