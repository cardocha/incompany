import { WebActions } from './WebActions';
export class QuestionarioRepository {

    static all() {
        return WebActions.createRequest().get('questionarios')
    }

    static save(questao) {
        return WebActions.createRequest().post('questionarios', questao)
    }

    static nova(material) {
        return WebActions.createRequest().post('questionarios/nova', material)
    }

    static enviar(questoes) {
        return WebActions.createRequest().post('questionarios/responder', questoes)
    }

    static remove(questao) {
        return WebActions.createRequest().post('questionarios', { "data": questao, "op": "del" })
    }

    static findByMaterialId(materialId) {
        return WebActions.createRequest().get(`questionarios/material/${materialId}`)
    }
}
