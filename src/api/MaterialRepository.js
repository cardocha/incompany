import { WebActions } from './WebActions';
import { Auth } from './Auth';
export class MaterialRepository {

    static all() {
        return WebActions.createRequest().get('materiais')
    }

    static save(material) {
        return WebActions.createRequest().post('materiais', material)
    }

    static interacao(materialId, usuarioId, cursoId) {
        return WebActions.createRequest().post('materiais/interacao', {
            "material_id": materialId,
            "usuario_id": usuarioId,
            "curso_id": cursoId
        })
    }

    static possuiInteracao(usuarioId, cursoId, unidadeId) {
        return WebActions.createRequest().post('materiais/possui_interacao', {
            "usuario_id": usuarioId,
            "curso_id": cursoId,
            "unidade_id": unidadeId
        })
    }

    static findByUnidadeId(unidadeId) {
        return WebActions.createRequest().get(`materiais/unidade/${unidadeId}?usuario_id=${Auth.get().id}`)
    }

    static findById(materialId) {
        return WebActions.createRequest().get(`materiais/${materialId}`)
    }

    static remove(material) {
        return WebActions.createRequest().post('materiais', { "data": material, "op": "del" })
    }
}
