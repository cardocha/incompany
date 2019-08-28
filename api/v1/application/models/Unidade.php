<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Unidade extends BaseModel
{
    private static $TABELA = "unidade";

    function get_tabela(){
        return self::$TABELA;
    }

    public function get_por_curso_id($curso_id){
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->where('curso_id', $curso_id);
        $query = $this->db->get();
        return $query->result_array();
    }

    public function persistir($usuario)
    {
        return  parent::persiste($usuario, $this->get_tabela());
    }

    public function remover($usuario)
    {
        return  parent::remove($usuario['id'], 'id');
    }

}