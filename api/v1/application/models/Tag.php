<?php

require_once(MODELS_DIR . 'BaseModel.php');


class Tag extends BaseModel
{
    private static $TABELA = "tag";

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

    public function get_por_curso_id($id) : array
    {
        $this->db->select('t.*');
        $this->db->from($this->get_tabela().' t');
        $this->db->join('curso cur','cur.id = t.curso_id');
        $this->db->order_by("descricao");
        $query = $this->db->get();
        return $query->result_array();
    }

    public function persistir($tag)
    {
        return  parent::persiste($tag, $this->get_tabela());
    }

    public function remover($tag)
    {
        return  parent::remove($tag['id'], 'id');
    }
}
