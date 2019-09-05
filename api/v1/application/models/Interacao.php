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
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->join('inscricao_dados ind', 'ind.curso_id ='.$curso_id.' and ind.usuario_id='.$usuario_id);
        $this->db->join('interacao inte', 'inte.inscricao_id = ind.inscricao_id and inte.material_id='.$material_id);
        $query = $this->db->get();
        return $query->num_rows() > 0;
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
