<?php

require_once(MODELS_DIR . 'BaseModel.php');


class Interacao extends BaseModel
{
    private static $TABELA = "interacao";

    public function get_tabela()
    {
        return self::$TABELA;
    }
    
    public function get_por_material_usuario($material_id, $usuario_id, $curso_id)
    {
        $query = $this->db->query('select inte.* from interacao inte
            join inscricao_dados inc on inc.usuario_id = '.$usuario_id.' and inc.curso_id = '.$curso_id.'
            join inscricao incr on incr.id = inc.inscricao_id
            where inte.material_id = '.$material_id.';');
        if (count($query->result_array()) > 0)
            return $query->result_array()[0]['percentual'];
        else
            return false;
    }

    public function get_registro_por_material_usuario($material_id, $usuario_id, $curso_id)
    {
        $query = $this->db->query('select inte.* from interacao inte
            join inscricao_dados inc on inc.usuario_id = '.$usuario_id.' and inc.curso_id = '.$curso_id.'
            join inscricao incr on incr.id = inc.inscricao_id
            where inte.material_id = '.$material_id.';');
        if (count($query->result_array()) > 0)
            return $query->result()[0];
        else
            return false;
    }

    public function persistir($interacao)
    {
        return  parent::persiste($interacao, $this->get_tabela());
    }

    public function remover($interacao)
    {
        return  parent::remove($interacao['id'], 'id');
    }
}
