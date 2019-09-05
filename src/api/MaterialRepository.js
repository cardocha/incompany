import { WebApi } from './WebApi';
import { Auth } from './Auth';
export class MaterialRepository {

    static all() {
        return WebApi.create().get('materiais')
    }

    static save(material) {
        return WebApi.create().post('materiais', material)
    }

    static interacao(materialId, usuarioId, cursoId) {
        return WebApi.create().post('materiais/interacao', {
            "material_id": materialId,
            "usuario_id": usuarioId,
            "curso_id": cursoId
        })
    }

    static possuiInteracao(usuarioId, cursoId, unidadeId) {
        return WebApi.create().post('materiais/possui_interacao', {
            "usuario_id": usuarioId,
            "curso_id": cursoId,
            "unidade_id" : unidadeId
        })
    }

    static findByUnidadeId(unidadeId) {
        return WebApi.create().get(`materiais/unidade/${unidadeId}?usuario_id=${Auth.get().id}`)
    }

    static findById(materialId) {
        return WebApi.create().get(`materiais/${materialId}`)
    }

    static remove(material) {
        return WebApi.create().delete('materiais', { "data": material })
    }
}
