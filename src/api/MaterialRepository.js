import { WebApi } from './WebApi';
export class MaterialRepository {

    static all() {
        return WebApi.create().get('materiais')
    }

    static save(material) {
        return WebApi.create().post('materiais', material)
    }

    static findByUnidadeId(unidadeId) {
        return WebApi.create().get(`materiais/unidade/${unidadeId}`)
    }

    static findById(materialId) {
        return WebApi.create().get(`materiais/${materialId}`)
    }

    static remove(material) {
        return WebApi.create().delete('materiais', { "data": material })
    }
}
