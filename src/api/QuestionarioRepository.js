import { WebApi } from './WebApi';
export class QuestionarioRepository {

    static all() {
        return WebApi.create().get('questionarios')
    }

    static save(curso) {
        return WebApi.create().post('questionarios', curso)
    }

    static remove(curso) {
        return WebApi.create().delete('questionarios', { "data": curso })
    }

    static findByMaterialId(materialId) {
        return WebApi.create().get(`questionarios/material/${materialId}`)
    }
}
