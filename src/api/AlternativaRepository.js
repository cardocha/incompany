import { WebActions } from './WebActions';
export class AlternativaRepository {

    static all() {
        return WebActions.createRequest().get('alternativas')
    }

    static save(curso) {
        return WebActions.createRequest().post('alternativas', curso)
    }

    static remove(curso) {
        return WebActions.createRequest().post('alternativas', { "data": curso, "op": "del" })
    }

    static setAlternativaCorreta(questaoId, alternativaId) {
        return WebActions.createRequest().post('alternativas/atualizar',
            { "data": { questaoId: questaoId, alternativaId: alternativaId } })
    }

    static findByQuestaoId(questaoId) {
        return WebActions.createRequest().get(`alternativas/questao/${questaoId}`)
    }
}
