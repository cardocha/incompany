import { WebApi } from './WebApi';
export class AlternativaRepository {

    static all() {
        return WebApi.create().get('alternativas')
    }

    static save(curso) {
        return WebApi.create().post('alternativas', curso)
    }

    static remove(curso) {
        return WebApi.create().delete('alternativas', { "data": curso })
    }

    static setAlternativaCorreta(questaoId, alternativaId) {
        return WebApi.create().post('alternativas/atualizar',
            { "data": { questaoId: questaoId, alternativaId: alternativaId } })
    }

    static findByQuestaoId(questaoId) {
        return WebApi.create().get(`alternativas/questao/${questaoId}`)
    }
}
