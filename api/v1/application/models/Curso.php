<?php

require_once(MODELS_DIR . 'BaseModel.php');


class Curso extends BaseModel
{
    private static $TABELA = "curso";

    public function get_tabela()
    {
        return self::$TABELA;
    }

    public function get_todos($order_by) : array
    {
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->order_by($order_by);
        
        $query = $this->db->get();
        return $query->result_array();
    }

    public function persistir($curso)
    {
        return  parent::persiste($curso, $this->get_tabela());
    }

    public function remover($curso)
    {
        return  parent::remove($curso['id'], 'id');
    }
}
