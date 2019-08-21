<?php

require_once(MODELS_DIR . 'BaseModel.php');


class Categoria extends BaseModel
{
    private static $TABELA = "categoria";

    public function get_tabela()
    {
        return self::$TABELA;
    }

    public function get_todos($order_by) : array
    {
        $this->db->select('cat.*, count(c.id) as qtdCursos');
        $this->db->from($this->get_tabela(). " cat");
        $this->db->join(" curso c", "cat.id = c.categoria_id", "left");
        $this->db->group_by('cat.id');
        $this->db->order_by($order_by);
        
        $query = $this->db->get();
        return $query->result_array();
    }

    public function possui_cursos_vinculados($id)
    {
        $this->db->select('count(cat.id)');
        $this->db->from($this->get_tabela(). " cat");
        $this->db->join("curso c", "cat.id = c.categoria_id");
        $this->db->where('cat.id', $id);
        $this->db->group_by('cat.id');
        
        $query = $this->db->get();
        return boolval(count($query->result_array()) > 0);
    }

    public function persistir($categoria)
    {
        return  parent::persiste($categoria, $this->get_tabela());
    }

    public function remover($categoria)
    {
        return  parent::remove($categoria['id'], 'id');
    }
}
