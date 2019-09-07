<?php

abstract class BaseModel extends CI_Model
{
    abstract function get_tabela();

    public function persiste($dados, $tabela)
    {
        $dados = $this->sanitize_fields($dados, $this->get_tabela());

        if (isset($dados['id']) && intval($dados['id']) > 0)
            return $this->atualiza($dados);

        unset($dados['id']);

        $this->db->set($dados);
        $this->db->insert($this->get_tabela());
        return $this->db->insert_id();
    }

     public function persiste_table($dados, $tabela)
    {
        $dados = $this->sanitize_fields($dados,  $tabela);

        if (isset($dados['id']) && intval($dados['id']) > 0)
        {
            $dados = $this->sanitize_fields($dados, $tabela);
            $this->db->where('id', $dados['id']);
            return $this->db->update($tabela, $dados);
        }

        unset($dados['id']);

        $this->db->set($dados);
        $this->db->insert($tabela);
        return $this->db->insert_id();
    }

    public function insere($tabela, $dados)
    {
        $dados = $this->sanitize_fields($dados, $this->get_tabela());
        $this->db->set($dados);
        $this->db->insert($this->get_tabela());
        return $this->db->insert_id();
    }

    public function atualiza($dados)
    {
        $dados = $this->sanitize_fields($dados, $this->get_tabela());
        $this->db->where('id', $dados['id']);
        return $this->db->update($this->get_tabela(), $dados);
    }

    public function remove($id, $campo)
    {
        return $this->db->delete($this->get_tabela(), array($campo => $id));
    }

    public function remove_todos($id, $campo, $tabela)
    {
        return $this->db->delete($tabela, array($campo => $id));
    }

    public function sanitize_fields($dados, $tabela)
    {
        $table_fields = $this->db->list_fields($tabela);
        $posted_fields = array_keys($dados);
        foreach ($posted_fields as $posted_field) {
            if (!in_array($posted_field, $table_fields))
                unset($dados[$posted_field]);
        }
        return $dados;
    }

    public function get_ultimo_registro_inserido($id_name)
    {
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->limit(1);
        $this->db->order_by($id_name, 'desc');
        $query = $this->db->get();
        return $query->result()[0];
    }

    public function get_lista_por_campo_valor($campo, $valor)
    {
        $this->db->select('id');
        $this->db->from($this->get_tabela());
        $this->db->where($campo, $valor);
        $query = $this->db->get();
        if ($query->num_rows() > 0)
            return $query->result_array();
        else
            return false;
    }

    public function get_registro_por_campo_valor_table($campo, $valor, $table)
    {
        $this->db->select('*');
        $this->db->from($table);
        $this->db->where($campo, $valor);
        $query = $this->db->get();
        if ($query->num_rows() > 0)
            return $query->result()[0];
        else
            return false;
    }

    public function get_todos($order_by)
    { 
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->order_by($order_by);
        $query = $this->db->get();
        if ($query->num_rows() > 0)
            return $query->result_array();
        else
            return false;
    }

    public function get_registro_por_id($id)
    {
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->where('id', $id);
        $query = $this->db->get();
        if ($query->num_rows() > 0)
            return $query->result_array()[0];
        else
            return false;
    }

}