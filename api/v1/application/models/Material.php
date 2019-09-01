<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Material extends BaseModel
{
    private static $TABELA = "material";

    function get_tabela(){
        return self::$TABELA;
    }

    public function get_por_unidade_id($unidade_id){
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->where('unidade_id', $unidade_id);
        $this->db->order_by('tipo, titulo');
        $query = $this->db->get();
        return $query->result();
    }

    public function persistir($material)
    {
        return  parent::persiste($material, $this->get_tabela());
    }

    public function remover($material)
    {
        return  parent::remove($material['id'], 'id');
    }

}