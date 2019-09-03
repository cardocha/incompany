import { WebApi } from './WebApi';
export class QuestionarioRepository {

    static all() {
        return WebApi.create().get('questionarios')
    }

    static save(questao) {
        return WebApi.create().post('questionarios', questao)
    }

    static nova(material) {
        return WebApi.create().post('questionarios/nova', material)
    }

    static remove(questao) {
        return WebApi.create().delete('questionarios', { "data": questao })
    }

    static findByMaterialId(materialId) {
        return WebApi.create().get(`questionarios/material/${materialId}`)
    }
}
