<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Categoria extends BaseModel
{
    private static $TABELA = "categoria";

    function get_tabela(){
        return self::$TABELA;
    }

    public function get_todos($order_by)
    { 
        $this->db->select('cat.*, count(c.id) as qtdCursos');
        $this->db->from($this->get_tabela(). " cat");
        $this->db->join(" curso c", "cat.id = c.categoria_id", "left");
        $this->db->group_by('cat.id');
        $this->db->order_by($order_by);
        
        $query = $this->db->get();
        if ($query->num_rows() > 0)
            return $query->result_array();
        else
            return false;
    }

}