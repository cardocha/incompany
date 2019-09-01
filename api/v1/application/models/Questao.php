<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Questao extends BaseModel
{
    private static $TABELA = "questao";

    function get_tabela(){
        return self::$TABELA;
    }

    public function get_por_material_id($material_id){
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->where('material_id', $material_id);
        $this->db->order_by('ordem');
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